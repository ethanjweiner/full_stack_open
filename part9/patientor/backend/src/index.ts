import express = require('express');
import cors from 'cors';
import DiagnosesRouter from './routes/diagnoses';
import PatientsRouter from './routes/patients';

const app = express();

app.use(express.json());
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());

app.use('/api/diagnoses', DiagnosesRouter);
app.use('/api/patients', PatientsRouter);

const PORT = 3001;
app.listen(PORT);
