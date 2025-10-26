type Rating = 1 | 2 | 3;
type RatingDescription = 'not bad but could be better' | 'very good' | 'excellent';

interface RateExercise {
  periodLength: number,
  trainingDays: number,
  target: number,
  average: number,
  success: boolean,
  rating: Rating,
  ratingDescription: RatingDescription
}

const calculateExercises = (periodLength: Array<number>, target: number): RateExercise => {
  const average = periodLength.reduce((sum, time) => sum + time , 0) / periodLength.length;
  const trainingDays = periodLength.filter(hours => hours > 0);
  let rating: Rating;
  let ratingDescription: RatingDescription;
  
  if (average < target) {
    rating = 1;
    ratingDescription = 'not bad but could be better';
  } else if (average === target) {
    rating = 2;
    ratingDescription = 'very good';
  } else {
    rating = 3;
    ratingDescription = 'excellent';
  }

  return {
    periodLength:periodLength.length,
    trainingDays: trainingDays.length,
    target,
    average,
    success: average >= target,
    rating,
    ratingDescription,
  };
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));