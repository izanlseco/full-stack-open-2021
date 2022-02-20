export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export type Diagnosis = {
  code: string
  name: string
  latin?: string
}

export enum EntryType {
  HealthCheck = "HealthCheck",
  OccupationalHealthCare = "OccupationalHealthcare",
  Hospital = "Hospital",
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

interface BaseEntry {
  id: string;
  type: EntryType
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

interface HospitalEntry extends BaseEntry {
  type: EntryType.Hospital
  discharge: Discharge;
}

export interface Discharge {
  date: string
  criteria: string
}

interface OccupationalHealthcare extends BaseEntry {
  type: EntryType.OccupationalHealthCare
  employerName: string;
  sickLeave?: SickLeave;
}

export interface SickLeave {
  startDate: string
  endDate: string
}

interface HealthCheckEntry extends BaseEntry {
  type: EntryType.HealthCheck
  healthCheckRating: HealthCheckRating;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcare
  | HealthCheckEntry

export interface Patient {
  id: string
  name: string
  dateOfBirth: string
  ssn: string
  gender: Gender
  occupation: string
  entries?: Entry[]
}

export type NonSensitivePatient = Omit<Patient, 'ssn'>
export type NewPatient = Omit<Patient, 'id' | "entries">
export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DistributiveOmit<T, K extends keyof any> = T extends any
  ? Omit<T, K>
  : never;
export type NewEntry = DistributiveOmit<Entry, "id">
export type NewBaseEntry = Omit <BaseEntry, "id">