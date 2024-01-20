import { useEffect, useState } from "react";
import { convertTimestampToDateString } from "../../../helper/transformedValue";
import { Transaction } from "./Transaction";
import { ITransaction } from "../../../types";
import "../style.css";

const getTransformedHash = ({
  windowWidth,
  hash,
}: {
  windowWidth: number;
  hash: string;
}) => {
  let noOfCharsToDisplay: number | undefined = undefined;
  if (windowWidth < 300) noOfCharsToDisplay = 7;
  else if (windowWidth < 860) noOfCharsToDisplay = 15;

  if (noOfCharsToDisplay)
    return hash
      .substring(0, noOfCharsToDisplay)
      .concat("...")
      .concat(hash.slice(-noOfCharsToDisplay));
  else return hash;
};

export default function TransactionList({
  transaction,
  loading,
}: {
  transaction: ITransaction;
  loading: boolean;
}) {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [hashValue, setHashValue] = useState<string>(transaction.hash);

  useEffect(() => {
    const transformedHashValue = getTransformedHash({
      windowWidth,
      hash: transaction.hash,
    });
    setHashValue(transformedHashValue);

    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [transaction.hash, windowWidth]);

  return (
    <>
      <div
        className="transaction-id"
        style={{
          backgroundColor:
            loading === true
              ? "var(--bgColor-loading)"
              : "var(--bgColor-primary)",
        }}
      >
        {loading === false && (
          <>
            <div className="hash">{hashValue}</div>
            <div className="timestamp">
              {convertTimestampToDateString(transaction.timestamp)
                .split(" ")
                .slice(0, 2)
                .join(" ")}
            </div>
          </>
        )}
      </div>
      <div
        className="details"
        style={{
          backgroundColor:
            loading === true
              ? "var(--bgColor-loading)"
              : "var(--bgColor-primary)",
        }}
      >
        {loading === false && (
          <Transaction
            processing={transaction.processing}
            history={transaction.history}
          />
        )}
      </div>
    </>
  );
}
