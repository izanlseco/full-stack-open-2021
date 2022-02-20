/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Entry, NewEntry, NewPatient, NonSensitivePatient, Patient } from '../types'

import patients from '../../data/patients'
import { v4 as uuidv4 } from 'uuid'

let savedPatients = [...patients]

const getPatients = () : NonSensitivePatient[] => {
  return savedPatients.map(({ id, name, dateOfBirth, gender, occupation, entries}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }))
}

const getPatientById = (id: string) : Patient | undefined => {
  return savedPatients.find(p => p.id === id)
}

const createPatient = (entry: NewPatient) : NewPatient => {
  const newPatient = {
    id: uuidv4(),
    ...entry,
    entries: [] as Entry[]
  }
  savedPatients = savedPatients.concat(newPatient)
  return newPatient
}

const addEntry = (patient: Patient, newEntry: NewEntry) : Patient => {
  const entry: Entry = { ...newEntry, id: uuidv4()}
  
  const savedPatient = { ...patient, entries: patient.entries?.concat(entry) }
  savedPatients = savedPatients.map((p) => p.id === savedPatient.id ? savedPatient : p)
  return savedPatient
}

export default {
  getPatients,
  getPatientById,
  createPatient,
  addEntry
}