import calculateTimeDifference from "../../../helper/calculateTimeDiff";
import { convertSizeToMB } from "../../../helper/transformedValue";
import { TBlockInfo } from "../../../types";
import "../style.css";

export default function DisplayBlock({
  block,
  handleClickEvent,
  index,
}: {
  handleClickEvent: (blockId: number) => void;
  block: TBlockInfo;
  index?: number;
}) {
  return (
    <div className="block">
      <p
        style={{
          margin: 0,
          padding: 0,
          marginBlockStart: "15px",
          textAlign: "center",
          marginBlockEnd: "15px",
          color:
            block.id === undefined
              ? "var(--bgColor-secondary)"
              : "var(--color-secondary)",
        }}
      >
        {block.id === undefined ? "" : block.id}
      </p>
      <div
        className={
          block.addedToNetwork
            ? "top addtoNetworkTop"
            : "top notAddtoNetworkTop"
        }
        style={{ top: block.addedToNetwork ? "55px" : "21px" }}
      ></div>
      <div
        className={
          block.addedToNetwork
            ? "front addtoNetworkFront"
            : "front notAddtoNetworkFront"
        }
        onClick={() => handleClickEvent(block.id as number)}
        style={{
          pointerEvents: block.addedToNetwork === false ? "none" : "all",
          background:
            block.addedToNetwork === false
              ? index !== 3
                ? "#645b16"
                : ""
              : "",
        }}
      >
        <p>{`~ ${block.fees} sat/vB`}</p>
        <p
          style={{
            fontSize: ".9rem",
            color: block.addedToNetwork ? "rgb(245, 114, 7)" : "yellow",
          }}
        >{`${block.feesRange} sat/vB`}</p>
        <p
          style={{ fontSize: "1.1rem", fontWeight: "bold" }}
        >{`${convertSizeToMB(block.size)} MB`}</p>
        <p style={{ fontSize: ".8rem" }}>
          {block.noOfTransactions.toLocaleString("en-US")}{" "}
          {block.noOfTransactions > 1 ? "transactions" : "transaction"}
        </p>
        <p>{calculateTimeDifference(block.timestamp)}</p>
      </div>
      <div
        className={
          block.addedToNetwork
            ? "left addtoNetworkLeft"
            : "left notAddtoNetworkLeft"
        }
        style={{
          top: block.addedToNetwork ? "67px" : "33px",
          left: block.addedToNetwork ? "1px" : "0px",
          width: block.addedToNetwork ? "29px" : "30px",
        }}
      ></div>
    </div>
  );
}
