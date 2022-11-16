import express = require('express');
import patientsService from '../services/patients';

const PatientsRouter = express.Router();

PatientsRouter.get('/', (_req, res) => {
  res.send(patientsService.getAll());
});

export default PatientsRouter;
