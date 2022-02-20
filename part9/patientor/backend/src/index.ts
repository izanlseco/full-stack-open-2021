import cors from 'cors'
import diagnosesRouter from './routes/diagnoses'
import express from 'express'
import patientsRouter from './routes/patients'

const app = express()

app.use(express.json())
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors())

app.get('/api/ping', (_req, res) => {
  res.send("Patty está buenísima")
})

app.use('/api/diagnoses', diagnosesRouter)
app.use('/api/patients', patientsRouter)

const PORT = 3001

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})