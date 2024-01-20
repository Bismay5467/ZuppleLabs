import { TbArrowBigRightFilled } from "react-icons/tb";
import "../style.css";
import { ITransactionHistory, ITransactionProcessing } from "../../../types";

export function Transaction({
  processing,
  history,
}: {
  processing: ITransactionProcessing;
  history: ITransactionHistory[];
}) {
  const calculateTotalBTC = () => {
    return history.reduce((sum, entry) => sum + entry.amount, 0);
  };

  return (
    <>
      <div>
        <div className="div-wrapper">
          <span
            style={{
              color: processing.hash
                ? "var(--color-secondary)"
                : "var(--color-primary)",
            }}
          >
            <TbArrowBigRightFilled
              style={{
                marginInlineEnd: "10px",
                color:
                  processing.status === "success"
                    ? "green"
                    : processing.status === "failed"
                    ? "orangered"
                    : "grey",
                position: "relative",
                top: "3px",
              }}
            />
            {processing.hash
              ? processing.hash
                  .substring(0, 15)
                  .concat("...")
                  .concat(processing.hash.slice(-15))
              : processing.heading}
          </span>
          {processing.amount && (
            <span>{`${processing.amount.toFixed(8)} BTC`}</span>
          )}
        </div>
        {processing.fee && (
          <div className="fee">
            {processing.fee.split(" ").slice(0, 5).join(" ")} (
            <span>{processing.fee.split(" ")[6]}</span>)
          </div>
        )}
        {processing.message && <div className="fee">{processing.message}</div>}
      </div>
      <div>
        {history.map((data, index: number) => {
          return (
            <div className="div-wrapper" key={index}>
              <span
                style={{
                  color: data.hash
                    ? "var(--color-secondary)"
                    : "var(--color-primary)",
                }}
              >
                {data.hash
                  ? data.hash
                      .substring(0, 15)
                      .concat("...")
                      .concat(data.hash.slice(-15))
                  : data.message}
              </span>
              <span>
                {`${data.amount.toFixed(8)} BTC`}
                <TbArrowBigRightFilled
                  style={{
                    marginInlineStart: "10px",
                    color:
                      data.status === "success"
                        ? "green"
                        : data.status === "failed"
                        ? "orangered"
                        : "grey",
                    position: "relative",
                    top: "3px",
                  }}
                />
              </span>
            </div>
          );
        })}
        <span className="totalBTC">{`${calculateTotalBTC().toFixed(
          8
        )} BTC`}</span>
      </div>
    </>
  );
}
