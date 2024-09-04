import CreateProductForm from '../components/CreateProductForm';
import styled from 'styled-components';

function ProductManager() {
  return (
    <Container>
      <h1 style={{marginBottom: '15px', marginTop: '5px'}}>Crear Producto</h1>
      <CreateProductForm />
    </Container>
  );
}

export default ProductManager;

const Container = styled.div`
  padding: 20px;
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${({ theme }) => theme.navbartext};
`;
