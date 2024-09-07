import { useState } from 'react';
import Modal from 'react-modal';
import { ProductCard, EditButton, modalStyles, ModalContent, ImageCarousel,
  ModalImage, ArrowButton, ProductDetails, CloseButton } from '../utils/productItem';

const ProductItem = ({ product, onEdit }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const handleNextImage = () => {
    if (product.images.length > 0) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.images.length);
    }
  };

  const handlePreviousImage = () => {
    if (product.images.length > 0) {
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + product.images.length) % product.images.length);
    }
  };

  // Obtén el valor del descuento y las fechas
  const discount = product.discount?.value || 0;
  const discountStartDate = product.discount?.startDate || 'N/A';
  const discountEndDate = product.discount?.endDate || 'N/A';

  return (
    <>
      <ProductCard>
        {product.images.length > 0 && (
          <img src={product.images[0]} alt={product.name} onClick={openModal} />
        )}
        <h2>{product.name}</h2>
        <p>Price: ${product.discountedPrice}</p>
        {discount > 0 && <p>Discount: {discount}%</p>}
        <p>Category: {product.subcategory}</p>
          <EditButton onClick={onEdit}>Edit</EditButton>
      </ProductCard>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Product Details Modal"
        style={modalStyles}
      >
        <ModalContent>
          {product.images.length > 0 && (
            <ImageCarousel>
              <ArrowButton onClick={handlePreviousImage}>←</ArrowButton>
              <ModalImage src={product.images[currentImageIndex]} alt={product.name} />
              <ArrowButton onClick={handleNextImage}>→</ArrowButton>
            </ImageCarousel>
          )}
          <ProductDetails>
            <h2>{product.name}</h2>
            <p><strong>Price:</strong> ${product.priceCOP}</p>
            <p><strong>Discount:</strong> {product.discountedPrice > 0 ? `${product.discountedPrice}` : 'No Discount'}</p>
            <p><strong>Discount Start Date:</strong> {discountStartDate}</p>
            <p><strong>Discount End Date:</strong> {discountEndDate}</p>
            <p><strong>Category:</strong> {product.categoryId}</p>
            <p><strong>Subcategory:</strong> {product.subcategory}</p>
            <p><strong>Description:</strong> {product.description}</p>
            <p><strong>Quantity:</strong> {product.quantity}</p>
            <p><strong>Sizes:</strong> {product.sizes.join(', ')}</p>
            <p><strong>Colors:</strong> {product.colors.join(', ')}</p>
          </ProductDetails>
        </ModalContent>
        <CloseButton onClick={closeModal}>Close</CloseButton>
      </Modal>
    </>
  );
};

export default ProductItem;
