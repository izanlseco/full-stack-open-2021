"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../../data/patients"));
const uuid_1 = require("uuid");
let savedPatients = [...patients_1.default];
const getPatients = () => {
    return savedPatients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries
    }));
};
const getPatientById = (id) => {
    return savedPatients.find(p => p.id === id);
};
const createPatient = (entry) => {
    const newPatient = Object.assign(Object.assign({ id: uuid_1.v4() }, entry), { entries: [] });
    savedPatients = savedPatients.concat(newPatient);
    return newPatient;
};
const addEntry = (patient, newEntry) => {
    var _a;
    const entry = Object.assign(Object.assign({}, newEntry), { id: uuid_1.v4() });
    const savedPatient = Object.assign(Object.assign({}, patient), { entries: (_a = patient.entries) === null || _a === void 0 ? void 0 : _a.concat(entry) });
    savedPatients = savedPatients.map((p) => p.id === savedPatient.id ? savedPatient : p);
    return savedPatient;
};
exports.default = {
    getPatients,
    getPatientById,
    createPatient,
    addEntry
};
