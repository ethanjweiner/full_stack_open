import express = require('express');
import diagnosesService from '../services/diagnoses';

const DiagnosesRouter = express.Router();

DiagnosesRouter.get('/', (_req, res) => {
  res.send(diagnosesService.getAll());
});

export default DiagnosesRouter;
