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

export default calculateExercises;
