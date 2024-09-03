import styled, { keyframes } from 'styled-components';

const LoadingSpinner = () => (
  <SpinnerWrapper>
    <Spinner>
      <Dot delay="0s" />
      <Dot delay="0.1s" />
      <Dot delay="0.2s" />
    </Spinner>
  </SpinnerWrapper>
);

export default LoadingSpinner;

// Keyframes para la animación de los puntos
const bounce = keyframes`
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
`;

// Wrapper del Spinner para centrarlo en la pantalla
const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5; /* Color de fondo */
`;

// Estilo del Spinner
const Spinner = styled.div`
  display: flex;
  justify-content: space-between;
  width: 70px;
`;

// Estilo de cada punto del Spinner
const Dot = styled.div`
  width: 16px;
  height: 16px;
  background-color: ${({ delay }) => (parseFloat(delay) % 0.2 === 0 ? '#8A2BE2' : '#FA198B' )};
  border-radius: 50%;
  animation: ${bounce} 1.2s infinite ease-in-out;
  animation-delay: ${({ delay }) => delay};
`;