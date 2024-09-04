import styled from "styled-components";

export const PaginationWrapper = styled.div`
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