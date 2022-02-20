interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

export const calculateExercises = (a: [number, number, number, number, number, number, number], b: number): Result => {
  
  const periodLength = a.length
  const trainingDays = a.filter(n => n > 0).length
  const average = a.reduce((a, b) => a + b) /a.length
  const success = average >= b
  let ratingDescription: string
  let rating: number

  if (success) {
    ratingDescription = "The training was great!"
  } else {
    ratingDescription = "Not too bad but could be better"
  }

  if (average >= b) {
    rating = 3
  } else if (average < b/2) {
    rating = 1
  } else {
    rating = 2
  }

  return {
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    target: b,
    average: average
  }
}
