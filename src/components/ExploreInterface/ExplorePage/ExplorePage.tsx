/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdCancel } from "react-icons/md";
import BlockDetails from "../BlockDetails/BlockDetails";
import DisplayBlock from "../DisplayBlock/DisplayBlock";
import Pagination from "../Pagination/Pagination";
import TransactionList from "../TransactionList/TransactionList";
import { IBlock, ITransaction, TModalHeader } from "../../../types";
import wait from "../../../helper/wait";
import "../style.css";
import getDetailBlockInfo from "../../../helper/getDetailBlockInfo";

interface ITransactionInfo {
  info: ITransaction[] | null;
  loading: boolean;
}

export default function ExplorePage() {
  const [modalData, setModalData] = useState<TModalHeader | null>(null);
  const [closeModal, setCloseModal] = useState<boolean>(false);
  const [transactionInfo, setTransactionInfo] = useState<ITransactionInfo>({
    info: null,
    loading: false,
  });
  const [blocksInfo, setBlocksInfo] = useState<IBlock[] | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    (async function () {
      try {
        const blockInfo = await import("../../../data/blocks.json");
        setBlocksInfo(blockInfo.default);
      } catch (error: any) {
        console.error(error.message);
      }
    })();
  }, []);

  useEffect(() => {
    if (modalData === null) return;
    (async function () {
      try {
        const transactionInfo = await import("../../../data/transaction.json");
        setTransactionInfo({
          info: transactionInfo.default as ITransaction[],
          loading: false,
        });
      } catch (error: any) {
        console.error(error.message);
      }
    })();
  }, [modalData]);

  const handleClickEvent = (blockId: number) => {
    const matchingObj = blocksInfo?.find(
      (block) => block.id === blockId && block.addedToNetwork === true
    );
    if (matchingObj === undefined) return;
    const {
      fees,
      feesRange,
      addedToNetwork,
      id,
      noOfPages,
      noOfTransactions,
      ...modalObj
    } = matchingObj;
    const detailBlockInfo = getDetailBlockInfo(modalObj);
    setModalData({
      id,
      noOfPages,
      noOfTransactions,
      blockInfo: detailBlockInfo,
    });
    setCloseModal(false);
  };

  const handleCloseEvent = () => {
    setCloseModal(true);
  };

  const handlePageChangeEvent = async (page: number) => {
    setCurrentPage(page);
    setTransactionInfo((prevState) => ({ ...prevState, loading: true }));
    await wait(400);
    setTransactionInfo((prevState) => ({ ...prevState, loading: false }));
  };

  return (
    <div className="container">
      <div className="blocks">
        {blocksInfo?.map(
          (block, index: number) =>
            block.addedToNetwork === false && (
              <DisplayBlock
                key={index}
                handleClickEvent={handleClickEvent}
                block={block}
              />
            )
        )}
        <div className="border"></div>
        {blocksInfo?.map(
          (block, index: number) =>
            block.addedToNetwork === true && (
              <DisplayBlock
                key={index}
                handleClickEvent={handleClickEvent}
                block={block}
              />
            )
        )}
      </div>
      <div className="divider"></div>
      {modalData && closeModal === false && (
        <div className="modal">
          <div className="modal-header">
            <div>
              Block <span>{modalData.id}</span>
            </div>
            <button onClick={handleCloseEvent}>
              <MdCancel />
            </button>
          </div>
          <BlockDetails details={modalData.blockInfo} />
          <div className="transaction-details">
            <div>
              {`${modalData.noOfTransactions.toLocaleString(
                "en-US"
              )} Transactions`}
            </div>
            <div className="pagination">
              <Pagination
                totalCount={modalData.noOfPages}
                currentPage={currentPage}
                onPageChange={handlePageChangeEvent}
              />
            </div>
          </div>
          {transactionInfo.info?.map((transaction, index) => {
            return (
              <TransactionList
                key={index}
                transaction={transaction}
                loading={transactionInfo.loading}
              />
            );
          })}
        </div>
      )}
      <div className="link">
        <Link
          to={"/"}
          style={{
            color: "var(--color-secondary)",
            textDecorationLine: "none",
            fontSize: "var(--font-size-normal)",
          }}
        >
          🔙 Go back to home page
        </Link>
      </div>
    </div>
  );
}
