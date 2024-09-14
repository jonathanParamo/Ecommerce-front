import { fetchLowStockProducts } from "../features/products/productSlice";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingSpinner from "../components/LoaderSpinner";
import ProductItem from "../components/ProducItem";
import EditProductForm from "../components/EditProductForm";
import { useNavigate } from 'react-router-dom';
import Pagination from "../components/Pagination";

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
    return <div className="text-red-600 text-lg">Error: {error}</div>;
  }

  return (
    <div className="p-5 flex flex-col items-center bg-white dark:bg-black h-screen overflow-hidden
      text-black dark:text-white
    ">
      <h1 className="text-xl md:text-3xl font-poppins mb-5">Productos agotados o por agotarse</h1>
      <div className="flex justify-center flex-wrap gap-4 w-full max-w-5xl">
        {products.length === 0 ? (
          <p className="text-gray-600 text-lg">No hay productos con bajo stock.</p>
        ) : (
          <ul className="list-none p-0 flex flex-wrap justify-around w-full">
            {products.map((product) => (
              <li key={product._id} className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 mb-4">
                <ProductItem
                  product={product}
                  onEdit={() => handleEditClick(product)}
                />
              </li>
            ))}
          </ul>
        )}
      </div>

      <Pagination />

      {selectedProduct && (
        <div className="mt-5 p-5 border border-gray-300 rounded bg-gray-100">
          <h2 className="text-xl font-semibold mb-4">Editar Producto</h2>
          <EditProductForm
            product={selectedProduct}
            onClose={handleCloseEditForm}
          />
        </div>
      )}
    </div>
  );
};

export default LowStockProducts;
