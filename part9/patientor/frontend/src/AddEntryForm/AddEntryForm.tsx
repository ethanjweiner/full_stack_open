import { Grid, Button } from "@material-ui/core";
import { Field, Formik, Form } from "formik";

import { TextField, SelectField, EntryTypeOption } from "../components/FormField";
import { Entry, EntryType, HealthCheckRating } from "../types";
import { useStateValue } from "../state";
import { DiagnosisSelection, HealthCheckRatingOption } from "../components/FormField";
import { useState } from "react";

type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;
  
export type EntryFormValues = UnionOmit<Entry, 'id'>;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const healthCheckRatingOptions: HealthCheckRatingOption[] = [
  { value: HealthCheckRating.Healthy, label: "Healthy" },
  { value: HealthCheckRating.CriticalRisk, label: "CriticalRisk" },
  { value: HealthCheckRating.HighRisk, label: "HighRisk" },
  { value: HealthCheckRating.LowRisk, label: "LowRisk" },
];

const entryTypeOptions: EntryTypeOption[] = [
  { value: EntryType.HealthCheck, label: EntryType.HealthCheck },
  { value: EntryType.Hospital, label: EntryType.Hospital }, // Test
  { value: EntryType.OccupationalHealthcare, label: EntryType.OccupationalHealthcare },
];

const initialValues = (entryType: EntryType): EntryFormValues => {
  const baseValues = {
    description: "",
    date: "",
    specialist: "",
    diagnosisCodes: [],
  };

  switch (entryType) {
    case EntryType.HealthCheck:
      return {
        ...baseValues,
        type: EntryType.HealthCheck,
        healthCheckRating: HealthCheckRating.Healthy,
      };
    default:
      throw new Error('Invalid entry type in entry form');
  }
};

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();

  // Improvement
  // - Need to define some initialValues
  // - initialValues are conditional to the current entry type
  // - Options:
  // 1. Separate forms per entry type
  // 2. Same form, but conditionally re-render when new entry type is selected (use extranl entry type control)
  // 2. Create a separate type for initial values (problem: then initival values wouldn't be in line w/ form returned values)
  // 3. Create an accomodating form that excepts the union of ALL Entry types to be submitted, and filter out unneedeed fields in top-level `onSubmit`
  const [entryType] = useState(EntryType.HealthCheck);

  return (
    <Formik
      initialValues={initialValues(entryType)}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!Object.values(EntryType).includes(values.type)) {
          errors.type = 'Invalid entry type provided';
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        return errors;
      }}
    >
    {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {

      return (
        <Form className="form ui">
          <SelectField label="Type" name="type" options={entryTypeOptions}/>
          <Field label="Description" placeholder="Description" name="description" component={TextField} />
          <Field label="Date" placeholder="Date" name="date" component={TextField} />
          <Field label="Specialist" placeholder="Specialist" name="specialist" component={TextField} />
          

          <DiagnosisSelection
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
            diagnoses={Object.values(diagnoses)}
          />

          {values.type === EntryType.HealthCheck && <SelectField label="Health Check Rating" name="healthCheckRating" options={healthCheckRatingOptions}/>}
          {values.type === EntryType.Hospital && (
            <div>
              <Field label="Discharge date" placeholder="Discharge date" name="discharge.date" component={TextField} />    
              <Field label="Discharge criteria" placeholder="Discharge criteria" name="discharge.criteria" component={TextField} />    
            </div>
          )}
          
          <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
        </Form>
      );
    }}
  </Formik>
  );
};

export default AddEntryForm;