import { Grid, Button } from "@material-ui/core";
import { Field, Formik, Form } from "formik";

import { TextField, SelectField } from "../components/FormField";
import { Entry, EntryType, HealthCheckRating } from "../types";
import { useStateValue } from "../state";
import { DiagnosisSelection, HealthCheckRatingOption } from "../components/FormField";

type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;
// Define Entry without the 'id' property
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

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        type: EntryType.HealthCheck,
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        healthCheckRating: HealthCheckRating.Healthy
      }}
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
    {({ isValid, dirty, setFieldValue, setFieldTouched }) => {

      return (
        <Form className="form ui">
          <Field label="Type" placeholder="Type" name="type" component={TextField} />
          <Field label="Description" placeholder="Description" name="description" component={TextField} />
          <Field label="Date" placeholder="Date" name="date" component={TextField} />
          <Field label="Specialist" placeholder="Specialist" name="specialist" component={TextField} />
          

          <DiagnosisSelection
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
            diagnoses={Object.values(diagnoses)}
          />

          <SelectField label="Health Check Rating" name="healthCheckRating" options={healthCheckRatingOptions}/>
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