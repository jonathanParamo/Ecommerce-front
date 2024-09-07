import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/products/productSlice';
import ProductItem from './ProducItem';
import Pagination from './Pagination';
import EditProductForm from './EditProductForm';
import styled from 'styled-components';
import LoadingSpinner from './LoaderSpinner';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, status, error, total } = useSelector((state) => state.products);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const productsPerPage = 20;
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProducts({ page: currentPage, limit: productsPerPage }));
  }, [dispatch, currentPage, productsPerPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleEditClick = (product) => {
    let productId = product._id;
    navigate(`/edit-product/${productId}`);
  };

  const handleCloseEditForm = () => {
    setSelectedProduct(null);
  };

  if (status === 'loading') {
    return <LoadingSpinner />;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  const totalPages = Math.ceil(total / productsPerPage);

  return (
    <Container>
      <h1>Product List</h1>
      <ProductListWrapper>
        {products.map(product => (
          <ProductItem
            key={product._id}
            product={product}
            onEdit={() => handleEditClick(product)}
          />
        ))}
      </ProductListWrapper>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

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

export default ProductList;

// Styled Components
const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProductListWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  color: #4F1271;
`;

const EditProductContainer = styled.div`
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;
`;
