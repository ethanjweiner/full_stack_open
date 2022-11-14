// Exercise calculator

type Rating = 1 | 2 | 3;

interface FullRating {
  rating: Rating;
  ratingDescription: string;
}

interface ExerciseData {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: Rating;
  ratingDescription: string;
  target: number;
  average: number;
}

function calculateExercises(
  dailyHours: Array<number>,
  target: number
): ExerciseData {
  const average =
    dailyHours.reduce((sum, hours) => sum + hours, 0) / dailyHours.length;

  const { rating, ratingDescription } = computeRating(average, target);

  return {
    periodLength: dailyHours.length,
    trainingDays: dailyHours.filter((hours) => hours > 0).length,
    success: average >= target,
    rating,
    ratingDescription,
    target,
    average,
  };
}

function computeRating(average: number, target: number): FullRating {
  const percentDifference = ((average - target) / target) * 100;
  if (percentDifference < -25) {
    return {
      rating: 1,
      ratingDescription: 'Bad',
    };
  } else if (percentDifference > 25) {
    return {
      rating: 3,
      ratingDescription: 'Excellent',
    };
  } else {
    return {
      rating: 2,
      ratingDescription: 'Good',
    };
  }
}

// Executing

interface CalculatorArgs {
  dailyHours: Array<number>;
  target: number;
}

const parseArguments = (args: Array<string>): CalculatorArgs => {
  if (args.length < 2) {
    throw new Error('Must supply at least two arguments');
  }

  const numberArgs = args.map((arg) => Number(arg));

  if (numberArgs.some((arg) => Number.isNaN(arg))) {
    throw new Error('Some arguments were not valid numbers');
  }

  const [target, ...dailyHours] = numberArgs;

  return {
    dailyHours,
    target,
  };
};

try {
  const args = process.argv.slice(2);
  const { dailyHours, target } = parseArguments(args);
  console.log(calculateExercises(dailyHours, target));
} catch (error: unknown) {
  if (error instanceof Error) {
    console.log('Error: ', error.message);
  }
}
