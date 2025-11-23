import type { HealthCheckEntry } from "../../types";
import { HealthCheckRating } from "../../types";
import CommonEntry from "./CommonEntry";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";

const HeartIcon: React.FC<{ rating: HealthCheckRating }> = ({ rating }) => {
  switch (rating) {
    case HealthCheckRating.Healthy:
      return <FavoriteIcon style={{ color: "green" }} />;
    case HealthCheckRating.LowRisk:
      return <FavoriteIcon style={{ color: "yellow" }} />;
    case HealthCheckRating.HighRisk:
      return <FavoriteIcon style={{ color: "orange" }} />;
    case HealthCheckRating.CriticalRisk:
      return <FavoriteIcon style={{ color: "red" }} />;
    default:
      return assertNever(rating);
  }
};

export interface HealthCheckEntryProp {
  entry: HealthCheckEntry;
}

const HealthCheck = (prop: HealthCheckEntryProp) => {
  const { entry } = prop;
  return (
    <div>
      <div>
        <p>
          {entry.date}
          <MedicalServicesIcon />{" "}
        </p>
        <i>{entry.description}</i>
        <CommonEntry entry={entry}></CommonEntry>
      </div>
      <HeartIcon rating={entry.healthCheckRating}></HeartIcon>
      <p>Diagnosed by: {entry.specialist}</p>
    </div>
  );
};

const assertNever = (rating: never): never => {
  throw new Error(`Unhandled discriminated union member: ${rating}`);
};

export default HealthCheck;
