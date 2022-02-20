interface bmiValues {
  value1: number,
  value2: number
}

const parseArguments = (args: Array<string>): bmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments')
  if (args.length > 4) throw new Error('Too many arguments')

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

const bmiCalculator = (a: number, b: number) : string => {
  const cmInMeter = a/100
  const result = b / (cmInMeter * cmInMeter)
  
  if (result < 15) {
    return "Very severely underweight"
  } else if (result > 15 && result < 16) {
    return "Severely underweight"
  } else if (result >= 16 && result < 18.5) {
    return "Underweight"
  } else if (result >= 18.5 && result < 25) {
    return "Normal (healthy weight)"
  } else if (result >= 25 && result < 30) {
    return "Overweight"
  } else if (result >= 30 && result < 35) {
    return "Obese Class I (Moderately obese)"
  } else if (result >= 35 && result < 40) {
    return "Obese Class II (Severely obese)"
  } else if (result >= 40) {
    return "Obese Class III (Very severely obese)"
  }
  
}

try {
  const { value1, value2} = parseArguments(process.argv)
  console.log(bmiCalculator(value1, value2))
} catch (e) {
  console.log('Error, something bad happened, message: ', e.message)
}