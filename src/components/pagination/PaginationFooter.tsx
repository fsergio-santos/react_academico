import Pagination from "./Pagination";
import PaginationInfo from "./PaginationInfo";

interface PaginationFooterProps {
  currentPage: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  onPageChange: (value: number) => void;
}

const PaginationFooter = ({
  currentPage,
  pageSize,
  totalElements,
  totalPages,
  onPageChange,
}: PaginationFooterProps) => {
  return (
    <>
      <div className="pagination-container">
        {/* Lado Esquerdo */}
        <div>
          <PaginationInfo
            page={currentPage}
            pageSize={pageSize}
            totalElements={totalElements}
            totalPages={totalPages}
          />
        </div>

        {/* Lado Direito */}
        <div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      </div>
    </>
  );
};

export default PaginationFooter;
