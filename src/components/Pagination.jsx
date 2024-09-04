import { PaginationWrapper } from "../utils/paginationWrapper";

const Pagination = ({ currentPage, totalPages, onPageChange }) => (
  <PaginationWrapper>
    <button
      disabled={currentPage === 1}
      onClick={() => onPageChange(currentPage - 1)}
    >
      Previous
    </button>
    <span>Page {currentPage} of {totalPages}</span>
    <button
      disabled={currentPage === totalPages}
      onClick={() => onPageChange(currentPage + 1)}
    >
      Next
    </button>
  </PaginationWrapper>
);

export default Pagination;


