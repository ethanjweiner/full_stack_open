import diagnosesData from '../data/diagnoses.json';
import { Diagnosis } from '../types';

const diagnoses: Array<Diagnosis> = diagnosesData as Array<Diagnosis>;

function getAll(): Array<Diagnosis> {
  return diagnoses;
}

export default { getAll };
