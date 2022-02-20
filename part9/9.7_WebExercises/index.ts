/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { calculateExercises } from './exerciseCalculator'
import express from 'express'

const app = express()
app.use(express.json())

app.post('/exercise', (req, res) => {
  const { daily_exercises, target } = req.body
  if (isNaN(Number(daily_exercises[0])) || isNaN(Number(daily_exercises[1]))
  || isNaN(Number(daily_exercises[2])) || isNaN(Number(daily_exercises[3]))
  || isNaN(Number(daily_exercises[4])) || isNaN(Number(daily_exercises[5]))
  || isNaN(Number(daily_exercises[6])) || isNaN(Number(target))) {
    res.status(400).json({
      error: "Malformatted parameters."
    })
  }
  if (daily_exercises.length === 7) {
    const result = calculateExercises(daily_exercises, Number(target))
    res.json(result)
  } else {
    res.status(400).json({
      error: "Parameters missing."
    })
  }
})

const PORT = 3003

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})