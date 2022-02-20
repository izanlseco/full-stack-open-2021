import { Diagnosis, Discharge, EntryType, Gender, HealthCheckRating, NewBaseEntry, NewEntry, NewPatient, SickLeave } from './types'

/**
 * Helper function for exhaustive type checking
 */
export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown, entries: unknown }

export const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation}: Fields): NewPatient => {
  const newPatient: NewPatient = {
    name: parseToString(name, "name"),
    dateOfBirth: parseToDate(dateOfBirth, "date of birth"),
    ssn: parseToString(ssn, "ssn"),
    gender: parseGender(gender),
    occupation: parseToString(occupation, "occupation"),
  }
  return newPatient
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewBaseEntry = (object: any): NewBaseEntry => {
  const newBaseEntry: NewBaseEntry = {
    type: parseEntryType(object.type),
    description: parseToString(object.description, "description"),
    date: parseToDate(object.date, "date"),
    specialist: parseToString(object.specialist, "specialist")
  }

  if (object.diagnosisCodes) {
    newBaseEntry.diagnosisCodes = parseDiagnosesCodes(object.diagnosisCodes);
  }

  return newBaseEntry
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewEntry = (object: any): NewEntry => {
  const newBaseEntry = toNewBaseEntry(object) as NewEntry

  switch (newBaseEntry.type) {
    case EntryType.Hospital:
      return {
        ...newBaseEntry,
        discharge: parseDischarge(object.discharge)
      }
    case EntryType.OccupationalHealthCare:
      const newEntry = {
        ...newBaseEntry,
        employerName: parseToString(object.employerName, "employer name"),
      }
      if (object.sickLeave) {
        newEntry.sickLeave = parseSickLeave(object.sickLeave)
      }

      return newEntry
    case EntryType.HealthCheck:
      return {
        ...newBaseEntry,
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
      }
    default: 
      return assertNever(newBaseEntry)
  }
}

const parseToString = (param: unknown, paramName: string ): string => {
  if (!param || !isString(param)) {
    throw new Error(`Incorrect or missing ${paramName}: ${param}`)
  }
  return param
}

const parseToDate = (date: unknown, dateName: string): string => {
  if (!date || !isString(date)) {
    throw new Error(`Incorrect or missing ${dateName}: ${date}`)
  }
  return date
}

const parseGender = (gender: any): Gender => {
  if (!gender || !isString(gender) || !isGender(gender.toLowerCase())) {
    throw new Error(`Incorrect or missing gender: ${gender || ""}`);
  }
  return gender.toLowerCase() as Gender;
};

const parseEntryType = (type: unknown): EntryType => {
  if (!type || !isString(type) || !isEntryType(type)) {
    throw new Error(`Incorrect or missing type: ${type}`)
  }
  return type
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseDischarge = (object: any): Discharge => {
  if (!object) {
    throw new Error(`Incorrect or missing discharge: ${object}`)
  }
  return {
    date: parseToDate(object.date, "discharge date"),
    criteria: parseToString(object.criteria, "discharge criteria")
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseSickLeave = (object: any): SickLeave => {
  if (!object) {
    throw new Error(`Incorrect or missing sick leave: ${object}`)
  }
  return {
    startDate: parseToDate(object.startDate, "sick leave start date"),
    endDate: parseToDate(object.endDate, "sick leave end date")
  }
}

const parseHealthCheckRating = (healthCheckRating: any): HealthCheckRating => {
  if (!healthCheckRating || !isHealthCheckRating(healthCheckRating)) {
    throw new Error(`Incorrect or missing health check rating: ${healthCheckRating}`)
  }
  return healthCheckRating
}

const parseDiagnosesCodes = (diagnosisCodes: any): Array<Diagnosis["code"]> => {
  if (!Array.isArray(diagnosisCodes) || !isArrayOfStrings(diagnosisCodes)) {
    throw new Error("Incorrect or missing diagnoses");
  }

  return diagnosisCodes;
};

const isString = (text: unknown): text is string => {
  
  return typeof text === 'string' || text instanceof String
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param)
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEntryType = (param: any): param is EntryType => {
  return Object.values(EntryType).includes(param)
}

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param)
}

const isArrayOfStrings = (param: any[]): param is string[] => {
  const hasNonString = param.some((item) => {
    return !isString(item);
  });

  return !hasNonString;
};