import express from 'express';
import calculateExercises from './exercise_calculator';
// import calculateExercises from './exercise_calculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  const daily_exercises: Array<number> = req.body.daily_exercises.map(Number);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const target = Number(req.body.target);

  if (!daily_exercises || !target) {
    return res.status(400).send({ error: 'parameters missing' });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  if (daily_exercises.some(isNaN) || isNaN(target)) {
    return res.status(400).send({ error: 'malformatted parameters' });
  }

  const result = calculateExercises(daily_exercises, target);

  return res.status(200).json(result);
});

const PORT = 3003;

app.listen(PORT);
