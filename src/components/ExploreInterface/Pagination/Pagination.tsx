import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from "react-icons/md";
import { usePagination, DOTS } from "../../../hooks/usePagination";
import "../style.css";

const Pagination = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize = 3,
}: {
  onPageChange: (page: number) => void;
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  pageSize?: number;
}) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  }) as (string | number)[];

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    currentPage + 1 > (lastPage as number)
      ? onPageChange(currentPage)
      : onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    currentPage - 1 <= 0
      ? onPageChange(currentPage)
      : onPageChange(currentPage - 1);
  };

  const goToBeginning = () => {
    onPageChange(1);
  };

  const goToEnd = () => {
    onPageChange(lastPage as number);
  };

  const lastPage = paginationRange[paginationRange.length - 1];

  return (
    <ul className="pagination-container">
      <li
        className={
          currentPage === 1 ? "pagination-item disabled" : "pagination-item"
        }
        onClick={goToBeginning}
        style={{ pointerEvents: currentPage === 1 ? "none" : "inherit" }}
      >
        <MdKeyboardDoubleArrowLeft />
      </li>
      <li
        className={
          currentPage === 1 ? "pagination-item disabled" : "pagination-item"
        }
        onClick={onPrevious}
        style={{ pointerEvents: currentPage === 1 ? "none" : "inherit" }}
      >
        <MdKeyboardArrowLeft />
      </li>
      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return (
            <li className="pagination-item dots" key={index}>
              &#8230;
            </li>
          );
        }

        return (
          <li
            key={index}
            className="pagination-item"
            style={{
              backgroundColor:
                pageNumber === currentPage ? "purple" : "inherit",
              color:
                pageNumber === currentPage ? "var(--color-primary)" : "inherit",
            }}
            onClick={() => onPageChange(pageNumber as number)}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        className={
          currentPage === lastPage
            ? "pagination-item disabled"
            : "pagination-item"
        }
        onClick={onNext}
        style={{ pointerEvents: currentPage === lastPage ? "none" : "inherit" }}
      >
        <MdKeyboardArrowRight />
      </li>
      <li
        className={
          currentPage === lastPage
            ? "pagination-item disabled"
            : "pagination-item"
        }
        onClick={goToEnd}
        style={{ pointerEvents: currentPage === lastPage ? "none" : "inherit" }}
      >
        <MdKeyboardDoubleArrowRight />
      </li>
    </ul>
  );
};

export default Pagination;
