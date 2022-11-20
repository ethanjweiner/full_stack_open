import { Button } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddEntryForm, { EntryFormValues } from "../AddEntryForm/AddEntryForm";
import EntryComponent from "../components/Entry";
import { apiBaseUrl } from "../constants";
import { addEntry, setPatient, useStateValue } from "../state";
import { Entry, Patient } from "../types";

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
  const [entryFormVisible, setEntryFormVisible] = useState(false);
  const [, dispatch] = useStateValue();

  const toggleEntryFormVisible = () => {
    setEntryFormVisible(!entryFormVisible); 
  };
  
  if (!id) {
    throw new Error('No id given');
  }
  
  const patient = usePatient(id);

  if (patient === null) {
    return null;
  }

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${patient.id}/entries`,
        values
      );
      dispatch(addEntry(patient.id, newEntry));
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
      } else {
        console.error("Unknown error", e);
      }
    }
  };
  
  return (
    <div>
      <h2>{patient.name}</h2>
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
      <h3>entries</h3>
      {patient.entries.map(entry => (
        <EntryComponent key={entry.id} entry={entry} />
      ))}
      <Button variant="contained" onClick={toggleEntryFormVisible}>
        Add New Entry
      </Button>
      {entryFormVisible && <AddEntryForm onSubmit={submitNewEntry} onCancel={toggleEntryFormVisible}/>}
    </div>
  );
};
export default PatientPage;