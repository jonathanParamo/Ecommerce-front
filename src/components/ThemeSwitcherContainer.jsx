import styled from 'styled-components';

export const ThemeSwitcherContainer = styled.div`
  width: 60px;
  height: 30px;
  background-color: ${props => props.background};
  border-radius: 30px;
  display: flex;
  align-items: center;
  padding: 5px;
  cursor: pointer;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease-in-out;
`;