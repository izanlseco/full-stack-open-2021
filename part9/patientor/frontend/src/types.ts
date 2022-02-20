export interface ParamTypes {
  id: string
}

export interface Diagnosis {
  code: string
  name: string
  latin?: string
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export enum EntryType {
  HealthCheck = "HealthCheck",
  OccupationalHealthCare = "OccupationalHealthcare",
  Hospital = "Hospital",
}

export interface Patient {
  id: string
  name: string
  occupation: string
  gender: Gender
  ssn?: string
  dateOfBirth?: string
  entries?: Entry[]
}

interface BaseEntry {
  id?: string
  type: EntryType
  description: string
  date: string
  specialist: string
  diagnosisCodes?: Array<Diagnosis['code']>
}

export interface Hospital extends BaseEntry {
  type: EntryType.Hospital
  discharge: Discharge
}

interface Discharge {
  date: string
  criteria: string
}

export interface OccupationalHealthcare extends BaseEntry {
  type: EntryType.OccupationalHealthCare
  employerName: string
  sickLeave?: SickLeave
}

interface SickLeave {
  startDate: string
  endDate: string
}

export interface HealthCheck extends BaseEntry {
  type: EntryType.HealthCheck
  healthCheckRating: HealthCheckRating
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export type Entry =
  | Hospital
  | OccupationalHealthcare
  | HealthCheck;

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
type DistributiveOmit<T, K extends keyof any> = T extends any
  ? Omit<T, K>
  : never;

export type NewEntry = DistributiveOmit<Entry, "id">;