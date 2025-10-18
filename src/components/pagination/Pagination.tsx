import {
  FaArrowAltCircleLeft,
  FaArrowAltCircleRight,
  FaFastBackward,
  FaFastForward,
} from "react-icons/fa";
import "./pagination.css";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (value: number) => void;
};

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  if (totalPages <= 1) {
    return null;
  }
  return (
    <div className="pagination">
      <ul className="pagination justify-content-center">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button onClick={() => onPageChange(1)} className="page-link">
            <FaFastBackward />
          </button>
        </li>
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            className="page-link"
          >
            <FaArrowAltCircleLeft />
          </button>
        </li>
        {Array.from({ length: totalPages }, (_, index) => (
          <li
            key={index + 1}
            className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
          >
            <button
              onClick={() => onPageChange(index + 1)}
              className="page-link"
            >
              {index + 1}
            </button>
          </li>
        ))}
        <li
          className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
        >
          <button
            onClick={() => onPageChange(currentPage + 1)}
            className="page-link"
          >
            <FaArrowAltCircleRight />
          </button>
        </li>
        <li
          className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
        >
          <button
            onClick={() => onPageChange(totalPages)}
            className="page-link"
          >
            <FaFastForward />
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
