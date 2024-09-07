import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.h1`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.titleColor};

  // Efecto de sombra solo para el tema oscuro
  ${({ theme }) => theme.mode === 'dark' && `
    text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
  `}

  // Ajustes de animación o transición
  transition: color 0.3s ease;
`;


export const Table = styled.table`
  width: 90%;
  border-collapse: collapse;
  background-color: ${({ theme }) => theme.CardBackground};
  color: ${({ theme }) => theme.cardText};
`;

export const Th = styled.th`
  border: 2px solid ${({ theme }) => theme.secondText || '#ddd'};
  color: ${({ theme }) => theme.cardText};
  background-color: ${({ theme }) => theme.cardBackground};
  padding: 8px;
`;

export const Td = styled.td`
  border: 2px solid ${({ theme}) => theme.secondText || '#ddd'};
  padding: 8px;
  color: ${({ theme }) => theme.secondText};
`;

export const ContainerButton = styled.div`
  width: 100%;
  height: 60px;
  margin-top: 20px;
  display: flex;
  justify-content: end;
  padding-right: 10%;
`

export const Button = styled.button`
  width: 30%;
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.buttonBackground1 || '#007BFF'};
  color: ${({ theme }) => theme.buttonText || '#fff'};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.buttonHover || '#0056b3'};
  }
`;

export const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

export const Modal = styled.div`
  background: ${({ theme }) => theme.navbarBackground};
  padding: 30px;
  border-radius: 10px;
  width: 70%;
  max-width: 500px;
  color: ${({ theme }) => theme.cardText};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Input = styled.input`
  margin-bottom: 10px;
  width: 100%;
  padding: 12px 15px;
  border: 1px solid ${({ theme }) => theme.borderColor || '#ddd'};
  background-color: ${({ theme }) => theme.cardBackground || '#f5f5f520'};
  color: ${({ theme }) => theme.cardText || '#000'};
  border-radius: 5px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.borderColorFocus || '#007BFF'};
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 15px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  label {
    margin-bottom: 5px;
    font-weight: bold;
    color: ${({ theme }) => theme.cardText || '#000'};
  }

  input, select, option {
    border: 1px solid ${({ theme }) => theme.borderColor || '#ccc'};
    border-radius: 5px;
    background-color: ${({ theme }) => theme.cardBackground || '#f5f5f520'};
    color: ${({ theme }) => theme.cardText || '#000'};
    font-style: italic;
    outline: none;
    box-sizing: border-box;
    width: 100%;
  }
`;

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`