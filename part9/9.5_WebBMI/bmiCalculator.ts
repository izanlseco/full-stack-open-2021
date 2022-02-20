export const bmiCalculator = (a: number, b: number) : string => {
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
  } else {
    return "Obese Class III (Very severely obese)"
  }
}