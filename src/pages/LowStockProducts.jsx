import { fetchLowStockProducts } from "../features/products/productSlice";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import LoadingSpinner from "../components/LoaderSpinner";
import ProductItem from "../components/ProducItem";
import EditProductForm from "../components/EditProductForm";
import { useNavigate } from 'react-router-dom';

const LowStockProducts = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchLowStockProducts({ page: 1, limit: 20 }));
  }, [dispatch]);

  const handleEditClick = (product) => {
    let productId = product._id;
    navigate(`/edit-product/${productId}`);
  };

  const handleCloseEditForm = () => {
    setSelectedProduct(null);
  };

  if (loading === 'loading') {
    return <LoadingSpinner />;
  }

  if (loading === 'failed') {
    return <ErrorMessage>Error: {error}</ErrorMessage>;
  }

  return (
    <Container>
      <Title>Productos con Bajo Stock</Title>
      <ProductListWrapper>
        {products.length === 0 ? (
          <NoProductsMessage>No hay productos con bajo stock.</NoProductsMessage>
        ) : (
          <ProductList>
            {products.map((product) => (
              <li key={product._id}>
                <ProductItem
                  product={product}
                  onEdit={() => handleEditClick(product)}
                />
              </li>
            ))}
          </ProductList>
        )}
      </ProductListWrapper>

      {selectedProduct && (
        <EditProductContainer>
          <h2>Editar Producto</h2>
          <EditProductForm
            product={selectedProduct}
            onClose={handleCloseEditForm}
          />
        </EditProductContainer>
      )}
    </Container>
  );
};

export default LowStockProducts;

// Styled Components

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const ProductListWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 15px;
  width: 100%;
  max-width: 1200px;
`;

const ProductList = styled.ul`
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 100%;
`;

const NoProductsMessage = styled.p`
  color: #6c757d;
  font-size: 18px;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 18px;
`;

const EditProductContainer = styled.div`
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;
`;
