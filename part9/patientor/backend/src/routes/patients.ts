import { toNewEntry, toNewPatient } from '../utils'

import express from 'express'
import patientsService from '../services/patientsService'

const route = express.Router()

route.get('/', (_req, res) => {
  res.send(patientsService.getPatients())
})

route.get('/:id', (req, res) => {
  res.send(patientsService.getPatientById(req.params.id))
})

route.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatient(req.body)
    const addedPatient = patientsService.createPatient(newPatientEntry)
    res.json(addedPatient)
  } catch (e) {
    res.status(400).send(e.message)
  }
  
})

route.post('/:id/entries', (req, res) => {
  const patient = patientsService.getPatientById(req.params.id)

  if (patient) {
    try {
      const newEntry = toNewEntry(req.body)
      const updatedPatient = patientsService.addEntry(patient, newEntry)
      res.json(updatedPatient)
    } catch (e) {
      res.status(400).send(e.message)
    }
  } else {
    res.status(404).send({ error: `The patient with id "${req.params.id}" does not exists.` })
  }
  
})

export default route