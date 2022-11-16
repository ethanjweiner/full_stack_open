import patientsData from '../data/patients.json';
import { Patient, PatientEntry, PatientPublic } from '../types';
import { v1 as uuid } from 'uuid';

const patients: Array<Patient> = patientsData as Array<Patient>;

function getAll(): Array<PatientPublic> {
  return patients.map((patient) => ({
    id: patient.id,
    name: patient.name,
    dateOfBirth: patient.dateOfBirth,
    gender: patient.gender,
    occupation: patient.occupation,
  }));
}

function add(patient: PatientEntry) {
  const id: string = uuid();

  const newPatient = {
    id,
    ...patient,
  };

  patients.push(newPatient);
  return newPatient;
}

export default { getAll, add };
