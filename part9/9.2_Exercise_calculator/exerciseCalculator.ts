interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

interface CalculatorValues {
  value1: number,
  value2: number
  value3: number
  value4: number
  value5: number
  value6: number
  value7: number
  value8: number
}

const parseArguments = (args: Array<string>): CalculatorValues => {
  if (args.length < 10) throw new Error('Not enough arguments')
  if (args.length > 10) throw new Error('Too many arguments')
  
  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3])) && !isNaN(Number(args[4]))
      && !isNaN(Number(args[5])) && !isNaN(Number(args[6])) && !isNaN(Number(args[7]))
      && !isNaN(Number(args[8])) && !isNaN(Number(args[9]))) {
    return { 
      value1: Number(args[2]),
      value2: Number(args[3]),
      value3: Number(args[4]),
      value4: Number(args[5]),
      value5: Number(args[6]),
      value6: Number(args[7]),
      value7: Number(args[8]),
      value8: Number(args[9])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

const calculateExercises = (a: [number, number, number, number, number, number, number], b: number): Result => {
  
  let periodLength = a.length
  let trainingDays = a.filter(n => n > 0).length
  let average = a.reduce((a, b) => a + b) /a.length
  let success = average >= b
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

try {
  const { value1, value2, value3, value4, value5, value6, value7, value8} = parseArguments(process.argv)
  console.log(calculateExercises([value1, value2, value3, value4, value5, value6, value7], value8))
} catch (e) {
  console.log('Error, something bad happened, message: ', e.message)
}
