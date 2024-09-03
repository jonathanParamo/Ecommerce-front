import styled from 'styled-components';

const ProductItem = ({ product }) => (
  <ProductCard>
    {product.images.length > 0 && <img src={product.images[0]} alt={product.name} />}
    <h2>{product.name}</h2>
    <p>Price: ${product.discountedPrice}</p>
    <p>Category: {product.subcategory}</p>
  </ProductCard>
);

export default ProductItem;

// Styled Components
const ProductCard = styled.div`
  border: 1px solid #ccc;
  padding: 5px;
  width: 200px;
  text-align: center;

  img {
    width: 100%;
    height: auto;
  }
`;
