import styled from 'styled-components';

export const FormContainer = styled.form`
  background-color: ${({ theme }) => theme.cardBackground};
  color: ${({ theme }) => theme.cardText};
  display: flex;
  flex-wrap: wrap;
  width: 90%;
  padding: 30px;
  border-radius: 10px;
  justify-content: space-between;

  @media (max-width: 768px) {
    justify-content: center;
    flex-direction: column;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 45%;
  margin-bottom: 10px;

  label {
    margin-bottom: 5px;
    font-weight: bold;
  }

  input, select, option {
    padding: 7px;
    font-size: 16px;
    border: 1px solid ${({ theme }) => theme.borderColor || '#ccc'};
    border-radius: 5px;
    width: 100%;
    background-color: ${({ theme }) => theme.cardBackground || '#f5f5f520'};
    box-sizing: border-box;
    color: ${({ theme }) => theme.cardText || '#f5f5f5'};
    font-style: italic;
    outline: none;
  }

  input[type="date"] {
    background-color: #f5f5f590;
  }

  @media (max-width: 768px) {
    width: 100%;
    margin-right: 0;
  }
`;


export const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 10px;

  label {
    margin-bottom: 5px;
    font-weight: bold;
  }

  input {
    padding: 7px;
    font-size: 16px;
    border: 1px solid ${({ theme }) => theme.borderColor || '#ccc'};
    border-radius: 5px;
    width: 99%;
    background-color: ${({ theme }) => theme.cardBackground || '#f5f5f520'};
    color: ${({ theme }) => theme.cardText || '#f5f5f5'};
    font-style: italic;
  }
`;

export const Button = styled.button`
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.buttonBackground || '#007BFF'};
  color: ${({ theme }) => theme.buttonText || '#FFFFFF'};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  margin-top: 10px;

  &:hover {
    background-color: ${({ theme }) => theme.buttonHover || '#0056b3'};
  }
`;

export const ContainerButton = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
`
