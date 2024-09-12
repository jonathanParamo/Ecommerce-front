import { useState } from 'react';
import Modal from 'react-modal';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

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

  const discount = product.discount?.value || 0;
  const discountStartDate = product.discount?.startDate || 'N/A';
  const discountEndDate = product.discount?.endDate || 'N/A';

  return (
    <>
      <div className="flex flex-col justify-between border border-gray-300 rounded-lg p-4 w-56 min-h-[300px] text-center shadow-md bg-gray-100 m-2">
        {product.images.length > 0 && (
          <img
            src={product.images[0]}
            alt={product.name}
            onClick={openModal}
            className="w-full h-36 object-cover rounded-lg cursor-pointer"
          />
        )}
        <h2 className="text-lg font-semibold text-gray-800 mt-2 mb-1 truncate">{product.name}</h2>
        <p className="text-gray-700">Price: ${product.discountedPrice}</p>
        {discount > 0 && <p className="text-red-600">Discount: {discount}%</p>}
        <p className="text-gray-600">Category: {product.subcategory}</p>
        <button
          onClick={onEdit}
          className="w-full mt-auto py-2 px-4 border-none rounded-md text-white bg-blue-600 cursor-pointer hover:bg-blue-700 transition-colors"
        >
          Edit
        </button>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Product Details Modal"
        className="flex items-center justify-center"
        overlayClassName="fixed inset-0 bg-black bg-opacity-75"
        style={{
          content: {
            width: '80vw',
            height: '80vh',
            margin: 'auto',
            padding: 0,
            border: 'none',
            borderRadius: '8px',
            backgroundColor: '#fff',
            color: '#000'
          }
        }}
      >
        <div className="relative flex flex-col items-center w-full h-full">
          {product.images.length > 0 && (
            <div className="flex items-center justify-center w-full h-3/5 relative">
              <button
                onClick={handlePreviousImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-700"
              >
                <FaChevronLeft size={24} />
              </button>
              <img
                src={product.images[currentImageIndex]}
                alt={product.name}
                className="max-w-full max-h-full object-contain"
              />
              <button
                onClick={handleNextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-700"
              >
                <FaChevronRight size={24} />
              </button>
            </div>
          )}
          <div className="p-4 flex-1 overflow-y-auto text-left w-full">
            <h2 className="text-xl font-bold mb-2">{product.name}</h2>
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
          </div>
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 py-2 px-4 border-none rounded-md text-white bg-red-600 cursor-pointer hover:bg-red-700 transition-colors"
          >
            Close
          </button>
        </div>
      </Modal>
    </>
  );
};

export default ProductItem;
