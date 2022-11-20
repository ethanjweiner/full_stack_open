import patientsData from '../../data/patients';
import { Entry, EntryInput } from '../types';
import { v1 as uuid } from 'uuid';

function add(entryData: EntryInput, patientId: string): Entry {
  const patientToUpdate = patientsData.find(
    (patient) => patient.id === patientId
  );

  if (!patientToUpdate) {
    throw new Error("Couldn't find patient for whcih to update entry");
  }

  const entry: Entry = {
    id: uuid(),
    ...entryData,
  };

  patientToUpdate.entries.push(entry);

  return entry;
}

export default { add };
