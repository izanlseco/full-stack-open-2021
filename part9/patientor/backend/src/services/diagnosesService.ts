import { Diagnosis } from '../types'
import diagnoses from '../../data/diagnoses'

const getEntries = () : Diagnosis[] => {
  return diagnoses
}

export default {
  getEntries,
}