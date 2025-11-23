import type { HospitalEntry } from "../../types";
import CommonEntry from "./CommonEntry";
import MedicationLiquidIcon from "@mui/icons-material/MedicationLiquid";
export interface HospitalEntryProp {
  entry: HospitalEntry;
}

const Hospital = (prop: HospitalEntryProp) => {
  const { entry } = prop;
  return (
    <div>
      <div>
        <p>
          {entry.date}
          <MedicationLiquidIcon />
        </p>
        <i>{entry.description}</i>
        <CommonEntry entry={entry}></CommonEntry>
        <p>Discharge time: {entry.discharge.date}</p>
        <p>Discharge criteria: {entry.discharge.criteria}</p>
      </div>
      <p>Diagnosed by: {entry.specialist}</p>
    </div>
  );
};

export default Hospital;
