/* eslint-disable no-case-declarations */
import { BsClipboard2Fill } from "react-icons/bs";
import "../style.css";
import {
  convertBTCtoDollar,
  getTransformedHashValue,
} from "../../../helper/transformedValue";
import { useEffect, useState } from "react";
import { DETAIL_BLOCK_INFO_KEYS } from "../../../constants/constants";

const getSpanElement = (key: string, value: string) => {
  key = key.toLowerCase();
  switch (key) {
    case DETAIL_BLOCK_INFO_KEYS.TOTAL_FEES:
    case DETAIL_BLOCK_INFO_KEYS.SUBSIDY_WITH_FEES:
      const btc = Number(value.split(" ").slice(0, 1));
      return (
        <span style={{ color: "green", fontWeight: "bold" }}>
          {`( $${convertBTCtoDollar(btc)} )`}
        </span>
      );
    case DETAIL_BLOCK_INFO_KEYS.TIMESTAMP:
      const timestamp = value;
      return (
        <span style={{ fontStyle: "italic" }}>
          {`( ${timestamp.split(" ").slice(-3).join(" ")} )`}
        </span>
      );
    default:
      return null;
  }
};

export default function Placeholder({
  Key,
  value,
  index,
}: {
  Key: string;
  value: string;
  index: number;
}) {
  const [spanElementStyling, setSpanElementStyling] = useState<
    Record<string, string>
  >({});
  const [stylingForValueDivElement, setStylingForDiv] = useState<
    Record<string, string>
  >({});

  useEffect(() => {
    if (Key.toLowerCase() === DETAIL_BLOCK_INFO_KEYS.MINER)
      setSpanElementStyling({
        backgroundColor: "blue",
        display: "inline-block",
        padding: "4px",
        borderRadius: "3px",
      });
    else if (Key.toLowerCase() === DETAIL_BLOCK_INFO_KEYS.HASH)
      setStylingForDiv({
        color: "var(--color-secondary)",
      });
  }, [Key]);

  const transformedValue = getTransformedHashValue(Key, value);

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(value)
      .then(() => {
        alert("Hash value copied to clipbaord!");
      })
      .catch((error: Error) => console.error(error.message));
  };

  return (
    <div
      className="placeholder"
      style={{
        backgroundColor:
          index % 2 === 0
            ? "var(--bgColor-secondary)"
            : "var(--bgColor-primary)",
      }}
    >
      <div>{Key}</div>
      <div style={{ ...stylingForValueDivElement }}>
        <p style={{ ...spanElementStyling }}>
          {Key.toLowerCase() === DETAIL_BLOCK_INFO_KEYS.TIMESTAMP
            ? transformedValue.split(" ").slice(0, 2).join(" ")
            : transformedValue}{" "}
          {Key.toLowerCase() === DETAIL_BLOCK_INFO_KEYS.HASH ? (
            <BsClipboard2Fill
              style={{ color: "white", cursor: "pointer" }}
              onClick={copyToClipboard}
            />
          ) : null}
          {getSpanElement(Key, transformedValue)}
        </p>
      </div>
    </div>
  );
}
