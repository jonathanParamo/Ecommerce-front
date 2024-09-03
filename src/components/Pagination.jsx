import styled from 'styled-components';

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

// Styled Components
const PaginationWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  button {
    width: 120px;
    padding: 10px 20px;
    border: none;
    background-color: #4F1271;
    color: white;
    cursor: pointer;
    text-align: center;

    &:disabled {
      background-color: #C8C6D7;
      cursor: not-allowed;
    }
  }
`;
