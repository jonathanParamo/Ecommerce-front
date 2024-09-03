import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/products/productSlice';
import ProductItem from './ProducItem';
import Pagination from './Pagination';
import styled from 'styled-components';
import LoadingSpinner from './LoaderSpinner';

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, status, error, total } = useSelector((state) => state.products);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 20;

  useEffect(() => {
    dispatch(fetchProducts({ page: currentPage, limit: productsPerPage }));
  }, [dispatch, currentPage, productsPerPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (status === 'loading') {
    return <LoadingSpinner/>;
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
          <ProductItem key={product._id} product={product} />
        ))}
      </ProductListWrapper>
      <LoadingSpinner />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </Container>
  );
};

export default ProductList;

// Styled Components
const Container = styled.div`
  padding: 20px;
  `;

const ProductListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  color: #4F1271;
`;
