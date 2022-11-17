import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import EntryComponent from "../components/Entry";
import { apiBaseUrl } from "../constants";
import { setPatient, useStateValue } from "../state";
import { Patient } from "../types";

const getPatient = async (id: string): Promise<Patient> => {
  const response = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
  return response.data;
};

const usePatient = (id: string) => {
  const [{ selectedPatient }, dispatch] = useStateValue();

  useEffect(() => {
    // Don't fetch patient if already selected
    if (selectedPatient && selectedPatient.id === id) {
      return;
    }

    getPatient(id).then(patient => {
      dispatch(setPatient(patient));
    }).catch(err => {
      console.error(err);
    });    
  }, []);

  return selectedPatient;
};

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  
  if (!id) {
    throw new Error('No id given');
  }
  
  const patient = usePatient(id);

  if (patient === null) {
    return null;
  }
  
  return (
    <div>
      <h2>{patient.name}</h2>
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
      <h3>entries</h3>
      {patient.entries.map(entry => (
        <EntryComponent key={entry.id} entry={entry} />
      ))}
    </div>
  );
};
export default PatientPage;