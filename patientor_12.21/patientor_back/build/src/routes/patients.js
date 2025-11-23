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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const utils_1 = require("../utils");
const z = __importStar(require("zod"));
const router = express_1.default.Router();
router.get("/", (_req, res) => {
    res.send(patientService_1.default.getFilteredEntries());
});
router.post("/", (req, res) => {
    try {
        const NewPatient = (0, utils_1.toNewPatient)(req.body);
        const addedPatient = patientService_1.default.addPatient(NewPatient);
        console.log(addedPatient);
        res.send(addedPatient);
    }
    catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).send({ error: error.issues });
        }
        else {
            res.status(400).send({ error: "unknown error" });
        }
    }
});
router.get("/:id", (req, res) => {
    res.send(patientService_1.default.getOne(req.params.id));
});
router.post("/:id/entries", (req, res) => {
    const codesParsed = (0, utils_1.parseDiagnosisCodes)(req.body.diagnosisCodes);
    const entry = (0, utils_1.toNewEntry)(Object.assign({ diagnosisCodes: codesParsed }, req.body));
    res.send(patientService_1.default.addEntry(entry, req.params.id));
});
exports.default = router;
