import { Grid, Button } from "@material-ui/core";
import { Field, Formik, Form } from "formik";

import { TextField, SelectField, EntryTypeOption } from "../components/FormField";
import { EntryFormFields, EntryType, HealthCheckRating } from "../types";
import { useStateValue } from "../state";
import { DiagnosisSelection, HealthCheckRatingOption } from "../components/FormField";
  
interface Props {
  onSubmit: (values: EntryFormFields) => void;
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

const initialValues: EntryFormFields = {
  type: EntryType.HealthCheck,
  description: "",
  date: "",
  specialist: "",
  diagnosisCodes: [],
  healthCheckRating: HealthCheckRating.Healthy,
  discharge: {
    date: '',
    criteria: ''
  },
  employerName: '',
  sickLeave: {
    startDate: '',
    endDate: ''
  }
};

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      initialValues={initialValues}
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
        if (values.type === EntryType.HealthCheck && !values.healthCheckRating) {
          errors.healthCheckRating = requiredError;
        }
        if (values.type === EntryType.OccupationalHealthcare && !values.employerName) {
          errors.employerName = requiredError;
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

          {values.type === EntryType.OccupationalHealthcare && (
            <Field label="Employer Name" placeholder="Employer Name" name="employerName" component={TextField} />
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