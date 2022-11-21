import { Button } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddEntryForm from "../AddEntryForm/AddEntryForm";
import EntryComponent from "../components/Entry";
import { apiBaseUrl } from "../constants";
import { addEntry, setPatient, useStateValue } from "../state";
import { Entry, EntryFormFields, EntryType, Patient } from "../types";

type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;

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

  const cleanEntry = (values: EntryFormFields): UnionOmit<Entry, 'id'> => {
    const entry = {
      description: values.description,
      date: values.date,
      specialist: values.specialist,
      diagnosisCodes: values.diagnosisCodes
    };

    switch (values.type) {
      case EntryType.HealthCheck:
        return { ...entry, type: EntryType.HealthCheck, healthCheckRating: values.healthCheckRating };
      case EntryType.OccupationalHealthcare:
        return { ...entry, type: EntryType.OccupationalHealthcare, employerName: values.employerName, sickLeave: values.sickLeave };
      case EntryType.Hospital:
        return { ...entry, type: EntryType.Hospital, discharge: values.discharge };
      default: 
        throw new Error('Invalid entry type');
    }
  };

  const submitNewEntry = async (values: EntryFormFields) => {
    try {
      const { data: entry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${patient.id}/entries`,
        cleanEntry(values)
      );
      dispatch(addEntry(patient.id, entry));
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