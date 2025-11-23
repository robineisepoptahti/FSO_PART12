import service from "../services/patients";
import { useParams } from "react-router-dom";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";
import type { Patient, Entry } from "../types";
import { useState, useEffect } from "react";
import Hospital from "./Entries/Hospital";
import HealthCheck from "./Entries/HealthCheck";
import OccupationalHealthcare from "./Entries/OccupationalHealthcare";

const genderIcon = (gender: string) => {
  switch (gender) {
    case "male":
      return <MaleIcon />;
    case "female":
      return <FemaleIcon />;
    case "other":
      return <TransgenderIcon />;
    default:
      return null;
  }
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "Hospital": {
      return <Hospital entry={entry}></Hospital>;
    }
    case "OccupationalHealthcare": {
      return <OccupationalHealthcare entry={entry}></OccupationalHealthcare>;
    }
    case "HealthCheck": {
      return <HealthCheck entry={entry}></HealthCheck>;
    }
    default: {
      return assertNever(entry);
    }
  }
};

const PatientPage = () => {
  const id = useParams().id;
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const getPatient = async () => {
      if (id) {
        const foundPatient = await service.getOne(id);
        setPatient(foundPatient);
      }
    };
    void getPatient();
  }, [id]);
  if (patient) {
    return (
      <div>
        <h2>
          {patient.name}
          {genderIcon(patient.gender)}
        </h2>
        <p>ssn: {patient.ssn}</p>
        <p>occupation: {patient.occupation}</p>
        <br />
        {patient.entries.length > 0 && (
          <div>
            <h3>entries</h3>
            {patient.entries.map((entry: Entry) => (
              <div
                style={{
                  border: "1px solid black",
                  padding: "10px",
                }}
              >
                <EntryDetails entry={entry} />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
};

const assertNever = (entry: never): never => {
  throw new Error(`Unhandled discriminated union member: ${entry}`);
};

export default PatientPage;
