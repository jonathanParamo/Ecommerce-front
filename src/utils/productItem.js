import styled from 'styled-components';

export const ProductCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid ${({ theme }) => theme.cardBackground};
  border-radius: 8px;
  padding: 15px;
  width: 220px;
  min-height: 300px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: ${({ theme }) => theme.navbarBackground};
  margin: 10px;

  img {
    width: 100%;
    height: 50%;
    border-radius: 8px;
    cursor: pointer;
  }

  h2 {
    font-size: 1.2em;
    margin: 10px 0;
    color: #f5f5f5;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  p {
    margin: 5px 0;
    font-size: 0.9em;
    color: ${({ theme }) => theme.cardText};
  }
`;

export const EditButton = styled.button`
  width: 100%;
  margin-top: auto;
  padding: 10px;
  border: none;
  border-radius: 4px;
  font-size: 0.9em;
  cursor: pointer;
  transition: background-color 0.3s ease;
  color: ${({ theme }) => theme.secondText};
  background-color: ${({ theme }) => theme.bg};

  &:hover {
    color: ${({ theme }) => theme.secondText};
    background-color: ${({ theme }) => theme.bg2};
  }
`;

export const modalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)'
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    padding: '0',
    border: 'none'
  }
};

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 80vw;
  height: 80vh;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  border-radius: 8px;
  overflow: hidden;
`;

export const ImageCarousel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  height: 60%;
`;

export const ModalImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;

export const ArrowButton = styled.button`
  background: linear-gradient(145deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7));
  border: none;
  color: white;
  padding: 12px 18px;
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.8em;
  z-index: 100;
  border-radius: 50%;  /* Botón redondeado */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);  /* Sombra */
  transition: all 0.3s ease;

  &:first-of-type {
    left: 10px;
  }

  &:last-of-type {
    right: 10px;
  }

  &:hover {
    background: linear-gradient(145deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9));
    transform: translateY(-50%) scale(1.1);  /* Efecto de escala al hacer hover */
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);  /* Más sombra al hacer hover */
  }

  &:active {
    transform: translateY(-50%) scale(0.95);  /* Efecto de presión */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }
`;

export const ProductDetails = styled.div`
  padding: 20px;
  text-align: left;
  width: 100%;
  height: 40%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  margin-top: 10px;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  font-size: 0.9em;
  cursor: pointer;
  transition: background-color 0.3s ease;
  color: ${({ theme }) => theme.secondTextA};
  background-color: ${({ theme }) => theme.bg2A};
  &:hover {
    background-color: ${({ theme }) => theme.bgA};
  }
`;
