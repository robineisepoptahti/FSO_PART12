import express from "express";
import { Response, Request } from "express";
import service from "../services/patientService";
import type {
  NonSensitivePatient,
  NewPatient,
  Patient,
  NewEntry,
  Entry,
  Diagnosis,
} from "../types";
import { toNewPatient, toNewEntry, parseDiagnosisCodes } from "../utils";
import * as z from "zod";

const router = express.Router();

router.get("/", (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(service.getFilteredEntries());
});

router.post("/", (req, res) => {
  try {
    const NewPatient: NewPatient = toNewPatient(req.body);
    const addedPatient: Patient = service.addPatient(NewPatient);
    console.log(addedPatient);
    res.send(addedPatient);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: "unknown error" });
    }
  }
});

router.get("/:id", (req, res) => {
  res.send(service.getOne(req.params.id));
});

router.post(
  "/:id/entries",
  (req: Request<{ id: string }, Entry, NewEntry>, res) => {
    const codesParsed: Array<Diagnosis["code"]> = parseDiagnosisCodes(
      req.body.diagnosisCodes
    );
    const entry: NewEntry = toNewEntry({
      diagnosisCodes: codesParsed,
      ...req.body,
    });
    res.send(service.addEntry(entry, req.params.id));
  }
);

export default router;
