import patientsData from "../../data/patients";
import {
  Patient,
  NonSensitivePatient,
  NewPatient,
  NewEntry,
  Entry,
} from "../types";
import { v1 as uuid } from "uuid";

const getEntries = (): Patient[] => {
  return patientsData;
};

const getFilteredEntries = (): NonSensitivePatient[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getOne = (id: string): Patient | undefined => {
  return patientsData.find((e) => e.id === id);
};

const addPatient = (object: NewPatient) => {
  const id: string = uuid();
  const newPatient: Patient = { id: id, entries: [], ...object };
  patientsData.push(newPatient);
  return newPatient;
};

const addEntry = (object: NewEntry, patientId: string) => {
  const id: string = uuid();
  const { diagnosisCodes, ...rest } = object;
  const newEntry: Entry = {
    id: id,
    ...(diagnosisCodes && diagnosisCodes.length > 0 ? { diagnosisCodes } : {}),
    ...rest,
  };

  const patient = patientsData.find((i) => patientId === i.id);

  if (patient) patient.entries.push(newEntry);
  return newEntry;
};

export default {
  getEntries,
  getFilteredEntries,
  addPatient,
  getOne,
  addEntry,
};
