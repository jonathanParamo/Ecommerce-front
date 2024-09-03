import styled from 'styled-components';

export const Slider = styled.div`
  width: 28px;
  height: 28px;
  background-color: ${props => props.theme.text};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.background};
  transition: transform 0.3s ease-in-out;
  transform: ${props => (props.isDarkMode ? 'translateX(30px)' : 'translateX(0)')};
`;