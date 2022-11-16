import { Gender, PatientEntry } from './types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
export const toPatientEntry = (data: any): PatientEntry => {
  const patientEntry: PatientEntry = {
    name: parseString(data.name),
    dateOfBirth: parseDateOfBirth(data.dateOfBirth),
    ssn: parseString(data.ssn),
    gender: parseGender(data.gender),
    occupation: parseString(data.occupation),
  };

  return patientEntry;
};

const parseString = (text: unknown): string => {
  if (!text || !isString(text)) {
    throw new Error('Validation error');
  }

  return text;
};

const parseDateOfBirth = (dob: unknown): string => {
  if (!dob || !isString(dob) || !isDate(dob)) {
    throw new Error('Validation error');
  }

  return dob;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Validation error');
  }

  return gender;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const isString = (param: unknown): param is string => {
  return typeof param === 'string' || param instanceof String;
};

const isDate = (param: string): boolean => {
  return Boolean(Date.parse(param));
};
