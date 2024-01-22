import Placeholder from "./Placeholder";
import {
  capitalizeKey,
  transformedValue,
} from "../../../helper/transformedValue";
import "../style.css";
import { TBlockDetail } from "../../../types";

export default function BlockDetails({
  details,
}: {
  details: Map<keyof TBlockDetail, number | string | undefined>;
}) {
  return (
    <div className="block-details-box">
      <div>
        {Array.from(details)
          .slice(0, 4)
          .map(([key, value], index) => {
            return (
              <Placeholder
                key={key}
                index={index}
                Key={capitalizeKey(key)}
                value={transformedValue(key, value as string | number)}
              />
            );
          })}
      </div>
      <div>
        {Array.from(details)
          .slice(4)
          .map(([key, value], index) => {
            return (
              <Placeholder
                key={key}
                Key={capitalizeKey(key)}
                index={index}
                value={transformedValue(key, value as string | number)}
              />
            );
          })}
      </div>
    </div>
  );
}
