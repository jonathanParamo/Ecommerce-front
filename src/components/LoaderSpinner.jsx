import styled, { keyframes, useTheme } from 'styled-components';

const LoadingSpinner = () => {
  const theme = useTheme();
  
  return (
    <SpinnerWrapper>
      <Spinner>
        <Dot delay="0s" color={theme.spinnerDot1} />
        <Dot delay="0.1s" color={theme.spinnerDot2} />
        <Dot delay="0.2s" color={theme.spinnerDot1} />
      </Spinner>
    </SpinnerWrapper>
  );
};

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
  background-color: ${({ theme }) => theme.background}; /* Color de fondo del tema */
  height: 100vh;
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
  background-color: ${({ color }) => color};
  border-radius: 50%;
  animation: ${bounce} 1.2s infinite ease-in-out;
  animation-delay: ${({ delay }) => delay};
`;
