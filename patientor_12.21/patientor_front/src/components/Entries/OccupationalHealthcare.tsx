import CommonEntry from "./CommonEntry";
import type { OccupationalHealthcareEntry } from "../../types";
import WorkIcon from "@mui/icons-material/Work";

export interface OccupationalHealthcareEntryProp {
  entry: OccupationalHealthcareEntry;
}

const OccupationalHealthcare = (prop: OccupationalHealthcareEntryProp) => {
  const { entry } = prop;
  return (
    <div>
      <div>
        <p>
          {entry.date} <WorkIcon />
        </p>
        <i>{entry.description}</i>
        <i>{entry.employerName}</i>
        <CommonEntry entry={entry}></CommonEntry>
        <p>Employer name: {entry.employerName}</p>
        {entry.sickLeave && (
          <p>
            Sickleave: {entry.sickLeave.startDate} to {entry.sickLeave.endDate}{" "}
          </p>
        )}
      </div>
      <p>Diagnosed by: {entry.specialist}</p>
    </div>
  );
};

export default OccupationalHealthcare;
