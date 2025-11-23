import type { EntryProp, Diagnosis } from "../../types";
import service from "../../services/diagnosis";
import { useEffect, useState } from "react";

const CommonEntry = (props: EntryProp) => {
  const { entry } = props;
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const dias: Diagnosis[] = await service.getAll();
      setDiagnoses(dias);
    };
    fetchDiagnoses();
  }, []);

  return (
    <div>
      <div key={entry.id}>
        {entry.diagnosisCodes && (
          <ul>
            {entry.diagnosisCodes.map((d: string) => {
              {
                const diagnosis = diagnoses.find(
                  (i: Diagnosis) => d === i.code
                );
                if (diagnosis) {
                  return (
                    <li key={d}>
                      {d} {diagnosis.name}
                    </li>
                  );
                }
              }
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CommonEntry;
