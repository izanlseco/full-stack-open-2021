import express from 'express'
import { bmiCalculator } from './bmiCalculator'

const app = express()

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query

  if (!height) {
    res.status(400).json({
      error: "You must insert the height!"
    })
  }
  if (!weight) {
    res.status(400).json({
      error: "You must insert the weight!"
    })
  }
  if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
    const bmi = bmiCalculator(Number(height), Number(weight))
    res.json({
      height: Number(height),
      weight: Number(weight),
      bmi: bmi
    })
  } else {
    res.status(400).json({
      error: "Provided values were not numbers."
    })
  }
})

const PORT = 3002

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})