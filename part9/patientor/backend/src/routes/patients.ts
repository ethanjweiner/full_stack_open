import express = require('express');
import patientsService from '../services/patients';
import entriesService from '../services/entries';
import { EntryInput } from '../types';
import { toPatientEntry } from '../utils';

const PatientsRouter = express.Router();

PatientsRouter.get('/', (_req, res) => {
  res.send(patientsService.getAll());
});

PatientsRouter.get('/:id', (req, res) => {
  const id = req.params.id;
  const patient = patientsService.getById(id);
  if (!patient) {
    return res.status(404).send({ error: 'Could not find patient' });
  }

  return res.json(patient);
});

PatientsRouter.post('/', (req, res) => {
  try {
    const patient = toPatientEntry(req.body);
    const newPatient = patientsService.add(patient);
    return res.json(newPatient);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(400).send({ error: error.message });
    }

    return res.status(400).send({ error: 'Generic error' });
  }
});

PatientsRouter.post('/:id/entries', (req, res) => {
  try {
    // Parse later
    const entryInput = req.body as EntryInput;
    const newEntry = entriesService.add(entryInput, req.params.id);
    return res.json(newEntry);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(400).send({ error: error.message });
    }

    return res.status(400).send({ error: 'Generic error' });
  }
});

export default PatientsRouter;
