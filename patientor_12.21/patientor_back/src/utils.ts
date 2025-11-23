import type { NewPatient } from "./types";
import { HealthCheckRating, NewEntry, Gender, Diagnosis } from "./types";
import * as z from "zod";

const newPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.enum(Gender),
  occupation: z.string(),
});

export const parseDiagnosisCodes = (
  object: unknown
): Array<Diagnosis["code"]> => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    return [] as Array<Diagnosis["code"]>;
  }

  return object.diagnosisCodes as Array<Diagnosis["code"]>;
};

const baseEntrySchema = z.object({
  description: z.string(),
  date: z.string(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()),
});

const hospitalEntrySchema = baseEntrySchema.extend({
  type: z.literal("Hospital"),
  discharge: z.object({
    date: z.string(),
    criteria: z.string(),
  }),
});

const healthCheckEntrySchema = baseEntrySchema.extend({
  type: z.literal("HealthCheck"),
  healthCheckRating: z.enum(HealthCheckRating),
});

const occupationalHealthcareEntrySchema = baseEntrySchema.extend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string(),
  sickLeave: z.object({ startDate: z.string(), endDate: z.string() }),
});

export const toNewPatient = (object: unknown): NewPatient => {
  return newPatientSchema.parse(object);
};

export const toNewEntry = (object: NewEntry): NewEntry => {
  switch (object.type) {
    case "Hospital":
      return hospitalEntrySchema.parse(object);

    case "OccupationalHealthcare": {
      return occupationalHealthcareEntrySchema.parse(object);
    }
    case "HealthCheck": {
      return healthCheckEntrySchema.parse(object);
    }
    default:
      return assertNever(object);
  }
};

const assertNever = (type: never): never => {
  throw new Error(`Unhandled discriminated union member: ${type}`);
};

export const entrySchema = z.union([
  hospitalEntrySchema,
  healthCheckEntrySchema,
  occupationalHealthcareEntrySchema,
]);

export default { toNewPatient, toNewEntry };
