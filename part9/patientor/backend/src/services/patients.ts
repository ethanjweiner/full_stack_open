import patientsData from '../../data/patients';
import { Patient, PatientEntry, PublicPatient } from '../types';
import { v1 as uuid } from 'uuid';

const patients: Array<Patient> = patientsData;

function getAll(): Array<PublicPatient> {
  return patients.map((patient) => ({
    id: patient.id,
    name: patient.name,
    dateOfBirth: patient.dateOfBirth,
    gender: patient.gender,
    occupation: patient.occupation,
  }));
}

function getById(id: string): Patient | undefined {
  return patients.find((patient) => patient.id === id);
}

function add(patient: PatientEntry) {
  const id: string = uuid();

  const newPatient = {
    id,
    entries: [],
    ...patient,
  };

  patients.push(newPatient);
  return newPatient;
}

export default { getAll, getById, add };
