"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewEntry = exports.toNewPatient = exports.assertNever = void 0;
const types_1 = require("./types");
/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value) => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};
exports.assertNever = assertNever;
const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation }) => {
    const newPatient = {
        name: parseToString(name, "name"),
        dateOfBirth: parseToDate(dateOfBirth, "date of birth"),
        ssn: parseToString(ssn, "ssn"),
        gender: parseGender(gender),
        occupation: parseToString(occupation, "occupation"),
    };
    return newPatient;
};
exports.toNewPatient = toNewPatient;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewBaseEntry = (object) => {
    const newBaseEntry = {
        type: parseEntryType(object.type),
        description: parseToString(object.description, "description"),
        date: parseToDate(object.date, "date"),
        specialist: parseToString(object.specialist, "specialist")
    };
    if (object.diagnosisCodes) {
        newBaseEntry.diagnosisCodes = parseDiagnosesCodes(object.diagnosisCodes);
    }
    return newBaseEntry;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewEntry = (object) => {
    const newBaseEntry = toNewBaseEntry(object);
    switch (newBaseEntry.type) {
        case types_1.EntryType.Hospital:
            return Object.assign(Object.assign({}, newBaseEntry), { discharge: parseDischarge(object.discharge) });
        case types_1.EntryType.OccupationalHealthCare:
            const newEntry = Object.assign(Object.assign({}, newBaseEntry), { employerName: parseToString(object.employerName, "employer name") });
            if (object.sickLeave) {
                newEntry.sickLeave = parseSickLeave(object.sickLeave);
            }
            return newEntry;
        case types_1.EntryType.HealthCheck:
            return Object.assign(Object.assign({}, newBaseEntry), { healthCheckRating: parseHealthCheckRating(object.healthCheckRating) });
        default:
            return exports.assertNever(newBaseEntry);
    }
    return newBaseEntry;
};
exports.toNewEntry = toNewEntry;
const parseToString = (param, paramName) => {
    if (!param || !isString(param)) {
        throw new Error(`Incorrect or missing ${paramName}: ${param}`);
    }
    return param;
};
const parseToDate = (date, dateName) => {
    if (!date || !isString(date)) {
        throw new Error(`Incorrect or missing ${dateName}: ${date}`);
    }
    return date;
};
const parseGender = (gender) => {
    if (!gender || !isString(gender) || !isGender(gender.toLowerCase())) {
        throw new Error(`Incorrect or missing gender: ${gender || ""}`);
    }
    return gender.toLowerCase();
};
const parseEntryType = (type) => {
    if (!type || !isString(type) || !isEntryType(type)) {
        throw new Error(`Incorrect or missing type: ${type}`);
    }
    return type;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseDischarge = (object) => {
    if (!object) {
        throw new Error(`Incorrect or missing discharge: ${object}`);
    }
    return {
        date: parseToDate(object.date, "discharge date"),
        criteria: parseToString(object.criteria, "discharge criteria")
    };
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseSickLeave = (object) => {
    if (!object) {
        throw new Error(`Incorrect or missing sick leave: ${object}`);
    }
    return {
        startDate: parseToDate(object.startDate, "sick leave start date"),
        endDate: parseToDate(object.endDate, "sick leave end date")
    };
};
const parseHealthCheckRating = (healthCheckRating) => {
    if (!healthCheckRating || !isHealthCheckRating(healthCheckRating)) {
        throw new Error(`Incorrect or missing health check rating: ${healthCheckRating}`);
    }
    return healthCheckRating;
};
const parseDiagnosesCodes = (diagnosisCodes) => {
    if (!Array.isArray(diagnosisCodes) || !isArrayOfStrings(diagnosisCodes)) {
        throw new Error("Incorrect or missing diagnoses");
    }
    return diagnosisCodes;
};
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param) => {
    return Object.values(types_1.Gender).includes(param);
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEntryType = (param) => {
    return Object.values(types_1.EntryType).includes(param);
};
const isHealthCheckRating = (param) => {
    return Object.values(types_1.HealthCheckRating).includes(param);
};
const isArrayOfStrings = (param) => {
    const hasNonString = param.some((item) => {
        return !isString(item);
    });
    return !hasNonString;
};
