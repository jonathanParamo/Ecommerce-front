import styled from 'styled-components';

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
  background-color: ${({ theme }) => theme.background};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  overflow: auto;
`;

const ModalContent = styled.div`
  color: ${({ theme }) => theme.cardText};
  padding: 30px;
  border-radius: 8px;
  width: 90%;
`;

const ModalHeader = styled.div`
  font-size: 1em;
  margin-bottom: 10px;
`;

const ModalBody = styled.div`
  margin-bottom: 20px;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const ModalButton = styled.button`
  color: ${({ theme }) => theme.cardText};
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme, variant }) => variant === 'primary' ? theme.buttonHover : theme.buttonBackground2};
  }
`;

export { ModalContainer, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalButton };
