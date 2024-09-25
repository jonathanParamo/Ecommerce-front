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
      <div className="flex flex-col justify-between border border-gray-200 rounded-lg
        p-4 w-56 min-h-[300px] text-center shadow-md bg-gray-100 m-2 dark:bg-[#f5f5f515] dark:border-transparent
        dark:hover:border-cyan-400 transition-all duration-500 ease-out hover:border-purple-800">
        {product.images.length > 0 && (
          <img
            src={product.images[0]}
            alt={product.name}
            onClick={openModal}
            className="w-full h-36 object-cover rounded-lg cursor-pointer"
          />
        )}
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white font-roboto mt-2 mb-1 truncate">{product.name}</h2>
        <p className="text-gray-700 dark:text-white font-nunito">Precio: ${product.discountedPrice}</p>
        {discount > 0 && <p className="text-gray-700 dark:text-white font-openSands">Descuento: {discount}%</p>}
        <p className="text-gray-600 dark:text-white font-openSands pt-1 pb-2">Categoria: {product.subcategory}</p>
        <button
          onClick={onEdit}
          className="w-full mt-auto py-2 px-4 border-2 border-transparent rounded-md text-white bg-purple-600 cursor-pointer
            dark:bg-purple-600 dark:bg-transparent dark:border-cyan-950 hover:bg-purple-700 dark:hover:border-cyan-500
            transition-all duration-500 ease-out"
        >
          Editar
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
            margin: '8%',
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
            <p><strong>Precio:</strong> ${product.priceCOP}</p>
            <p><strong>Descuento:</strong> {product.discountedPrice > 0 ? `${product.discountedPrice}` : 'Sin descuento'}</p>
            <p><strong>Inicio del descuento:</strong> {discountStartDate.split('T')[0]}</p>
            <p><strong>Fin del descuento:</strong> {discountEndDate.split('T')[0]}</p>
            <p><strong>Categoría:</strong> {product.categoryId}</p>
            <p><strong>Subcategoría:</strong> {product.subcategory}</p>
            <p><strong>Descripción:</strong> {product.description}</p>
            <p><strong>Unidades disponibles:</strong> {product.quantity}</p>
            <p><strong>Tamaños:</strong> {product.sizes.join(', ')}</p>
            <p><strong>Colores:</strong> {product.colors.join(', ')}</p>
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
