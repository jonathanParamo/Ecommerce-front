import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  height: 100vh;
  margin: 0;
  overflow-x: hidden;
  flex-direction: column;

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
  }
`;