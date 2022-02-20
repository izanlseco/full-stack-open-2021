"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const express_1 = __importDefault(require("express"));
const patientsService_1 = __importDefault(require("../services/patientsService"));
const route = express_1.default.Router();
route.get('/', (_req, res) => {
    res.send(patientsService_1.default.getPatients());
});
route.get('/:id', (req, res) => {
    res.send(patientsService_1.default.getPatientById(req.params.id));
});
route.post('/', (req, res) => {
    try {
        const newPatientEntry = utils_1.toNewPatient(req.body);
        const addedPatient = patientsService_1.default.createPatient(newPatientEntry);
        res.json(addedPatient);
    }
    catch (e) {
        res.status(400).send(e.message);
    }
});
route.post('/:id/entries', (req, res) => {
    const patient = patientsService_1.default.getPatientById(req.params.id);
    if (patient) {
        try {
            const newEntry = utils_1.toNewEntry(req.body);
            const updatedPatient = patientsService_1.default.addEntry(patient, newEntry);
            res.json(updatedPatient);
        }
        catch (e) {
            res.status(400).send(e.message);
        }
    }
    else {
        res.status(404).send({ error: `The patient with id "${req.params.id}" does not exists.` });
    }
});
exports.default = route;
