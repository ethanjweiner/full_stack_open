import patientsData from '../data/patients.json';
import { Patient, PatientPublic } from '../types';

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

export default { getAll };
