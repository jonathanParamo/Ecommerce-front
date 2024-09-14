import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/products/productSlice';
import ProductItem from './ProducItem';
import Pagination from './Pagination';
import EditProductForm from './EditProductForm';
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
    <div className="p-5 flex flex-col items-center bg-white dark:bg-black">
      <h1 className="text-xl md:text-3xl font-poppins mb-5">
        Lista de Productos
      </h1>
      <div className="flex justify-center flex-wrap gap-4 text-[#4F1271]">
        {products.map(product => (
          <ProductItem
            key={product._id}
            product={product}
            onEdit={() => handleEditClick(product)}
          />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      {selectedProduct && (
        <div className="mt-5 p-5 border border-gray-300 rounded bg-gray-50">
          <h2 className="text-xl font-semibold mb-3">Editar Producto</h2>
          <EditProductForm
            product={selectedProduct}
            onClose={handleCloseEditForm}
          />
        </div>
      )}
    </div>
  );
};

export default ProductList;
