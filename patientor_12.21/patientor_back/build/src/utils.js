"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.entrySchema = exports.toNewEntry = exports.toNewPatient = exports.parseDiagnosisCodes = void 0;
const types_1 = require("./types");
const z = __importStar(require("zod"));
const newPatientSchema = z.object({
    name: z.string(),
    dateOfBirth: z.string().date(),
    ssn: z.string(),
    gender: z.enum(types_1.Gender),
    occupation: z.string(),
});
const parseDiagnosisCodes = (object) => {
    if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
        return [];
    }
    return object.diagnosisCodes;
};
exports.parseDiagnosisCodes = parseDiagnosisCodes;
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
    healthCheckRating: z.enum(types_1.HealthCheckRating),
});
const occupationalHealthcareEntrySchema = baseEntrySchema.extend({
    type: z.literal("OccupationalHealthcare"),
    employerName: z.string(),
    sickLeave: z.object({ startDate: z.string(), endDate: z.string() }),
});
const toNewPatient = (object) => {
    return newPatientSchema.parse(object);
};
exports.toNewPatient = toNewPatient;
const toNewEntry = (object) => {
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
exports.toNewEntry = toNewEntry;
const assertNever = (type) => {
    throw new Error(`Unhandled discriminated union member: ${type}`);
};
exports.entrySchema = z.union([
    hospitalEntrySchema,
    healthCheckEntrySchema,
    occupationalHealthcareEntrySchema,
]);
exports.default = { toNewPatient: exports.toNewPatient, toNewEntry: exports.toNewEntry };
