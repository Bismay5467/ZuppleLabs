import Placeholder from "./Placeholder";
import {
  capitalizeKey,
  transformedValue,
} from "../../../helper/transformedValue";
import "../style.css";
import { TBlockDetail } from "../../../types";

export default function BlockDetails({ details }: { details: TBlockDetail }) {
  const entries = Object.entries(details);
  return (
    <div className="block-details-box">
      <div>
        {entries.slice(0, 4).map(([key, value], index) => {
          return (
            <Placeholder
              key={index}
              index={index}
              Key={capitalizeKey(key)}
              value={transformedValue(key, value)}
            />
          );
        })}
      </div>
      <div>
        {entries.slice(4).map(([key, value], index) => {
          return (
            <Placeholder
              key={index}
              Key={capitalizeKey(key)}
              index={index}
              value={transformedValue(key, value)}
            />
          );
        })}
      </div>
    </div>
  );
}
