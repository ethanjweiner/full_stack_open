import express = require('express');
import patientsService from '../services/patients';
import { toPatientEntry } from '../utils';

const PatientsRouter = express.Router();

PatientsRouter.get('/', (_req, res) => {
  res.send(patientsService.getAll());
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

export default PatientsRouter;
