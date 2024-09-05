import styled from 'styled-components';

export const Slider = styled.div`
  width: 28px;
  height: 28px;
  background-color: ${({ $background }) => $background};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ $color }) => $color || '#fff'};
  transition: transform 0.3s ease-in-out;
  transform: ${({ $isDarkMode }) => ($isDarkMode ? 'translateX(30px)' : 'translateX(0)')};
`;
