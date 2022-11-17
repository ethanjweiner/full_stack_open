import { useStateValue } from "../state";
import { Diagnosis, Entry } from "../types";
import { assertNever } from "../utils";
import HealthRatingBar from "./HealthRatingBar";

const EntryComponent = ({ entry }: { entry: Entry }) => {
  const [{ diagnoses }] = useStateValue();

  const getDiagnosisName = (code: Diagnosis['code']) => {
    const diagnosis = diagnoses.find(diagnosis => diagnosis.code === code);
    return diagnosis ? diagnosis.name : null;
  };

  const entryStyle = {
    border: '3px solid black',
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px"
  };

  let entryInformation;

  switch (entry.type) {
    case "Hospital":
      entryInformation = (<div>
        <h4>Discharge</h4>
        <div>{entry.discharge.date} {entry.discharge.criteria}</div>
      </div>);
      break;
    case "HealthCheck":
      entryInformation = (<div>
        <HealthRatingBar rating={entry.healthCheckRating} showText={false}/>
      </div>);
      break;
    case "OccupationalHealthcare":
      entryInformation = <div>Employer: {entry.employerName}</div>;
      break;
    default:
      assertNever(entry);
  }

  return (
    <div key={entry.id} style={entryStyle}>
      <div>{entry.date}{" "}<strong>{entry.type}</strong></div>
      <div><i>{entry.description}</i></div>
      {entryInformation}
      <ul>
        {entry.diagnosisCodes && entry.diagnosisCodes.map(code => (
          <li key={code}>{code} {getDiagnosisName(code)}</li>
        ))}
      </ul>
      <div>diagnosed by {entry.specialist}</div>
    </div>
  );
};

export default EntryComponent;