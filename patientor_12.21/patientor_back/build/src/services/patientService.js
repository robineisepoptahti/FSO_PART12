"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../../data/patients"));
const uuid_1 = require("uuid");
const getEntries = () => {
    return patients_1.default;
};
const getFilteredEntries = () => {
    return patients_1.default.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};
const getOne = (id) => {
    return patients_1.default.find((e) => e.id === id);
};
const addPatient = (object) => {
    const id = (0, uuid_1.v1)();
    const newPatient = Object.assign({ id: id, entries: [] }, object);
    patients_1.default.push(newPatient);
    return newPatient;
};
const addEntry = (object, patientId) => {
    const id = (0, uuid_1.v1)();
    const { diagnosisCodes } = object, rest = __rest(object, ["diagnosisCodes"]);
    const newEntry = Object.assign(Object.assign({ id: id }, (diagnosisCodes && diagnosisCodes.length > 0 ? { diagnosisCodes } : {})), rest);
    const patient = patients_1.default.find((i) => patientId === i.id);
    if (patient)
        patient.entries.push(newEntry);
    return newEntry;
};
exports.default = {
    getEntries,
    getFilteredEntries,
    addPatient,
    getOne,
    addEntry,
};
