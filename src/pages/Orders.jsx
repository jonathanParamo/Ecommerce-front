import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders, deleteOrder, updateOrderStatus } from '../features/order/orderSlice';
import LoadingSpinner from '../components/LoaderSpinner';

const OrdersComponent = () => {
  const dispatch = useDispatch();
  const { orders, totalPages } = useSelector((state) => state.orders);
  const { status, error, } = useSelector((state) => state.orders);

  const [selectedStatus, setSelectedStatus] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchOrders({ status: selectedStatus, page }));
  }, [selectedStatus, page, dispatch]);

  const handleStatusChange = (orderId, newStatus) => {
    dispatch(updateOrderStatus({ orderId, newStatus }));
  };

  const handleFilterChange = (e) => {
    setSelectedStatus(e.target.value);
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleDeleteOrder = (orderId) => {
    dispatch(deleteOrder(orderId));
  };

  return (
    <div className="p-6 h-[calc(100vh-72px)] mx-auto bg-white dark:bg-black flex flex-col items-center overflow-x-hidden overflow-y-auto">

      <h1 className="text-3xl font-bold mb-6 text-black dark:text-white">Pedidos</h1>

      {/* Filtro de estado */}
      <div className="mb-4 w-full flex justify-between items-center px-3">
      <label
        htmlFor="filter-status"
        className="block text-base md:text-2xl font-medium text-gray-900 dark:text-gray-100 mb-2">
        Filtrar por estado:
      </label>
      <select
        id="filter-status"
        value={selectedStatus}
        onChange={handleFilterChange}
        className="p-2 border-2 border-purple-500 dark:border-gray-600 rounded-lg bg-white dark:bg-[#141414]
                  text-black dark:text-white focus:outline-none bg-purple-50
                  transition-colors duration-300 ease-in-out"
      >
        <option value="">Todos</option>
        <option value="pending">Pendiente</option>
        <option value="in-progress">En progreso</option>
        <option value="shipped">Enviado</option>
        <option value="delivered">Entregado</option>
        <option value="canceled">Cancelado</option>
      </select>
    </div>


      {status === 'loading' && <LoadingSpinner />}
      {status === 'failed' && <p className="text-red-600 dark:text-red-400">{error}</p>}
      {status === 'succeeded' && (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders.map((order) => (
              <div key={order._id} className="bg-white dark:bg-[#141414] border border-gray-200 dark:border-gray-700 rounded-lg shadow-md dark:shadow-none p-6">
                <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Order ID: {order._id}</h2>
                <p className="text-gray-700 dark:text-gray-400 mb-2">
                  Status:
                  <span className={`font-bold ${order.status === 'pending' ? 'text-yellow-500' :
                  order.status === 'shipped' ? 'text-blue-500' :
                  order.status === 'delivered' ? 'text-green-500' :
                  order.status === 'canceled' ? 'text-red-500' : ''}`}>
                    {order.status}
                  </span>
                </p>
                <p className="text-gray-700 dark:text-gray-400 mb-2">Total Amount: ${order.totalAmount.toLocaleString()}</p>
                <p className="text-gray-700 dark:text-gray-400 mb-4">Created At: {new Date(order.createdAt).toLocaleDateString()}</p>

                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Products:</h3>
                  <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
                    {order.products.map((product, index) => (
                      <li key={index}>
                        {product.productId ? (
                          <>
                            <p>Nombre del producto: {product.productId.name}</p>
                            <p>Precio: ${product.price}</p>
                            <p>Cantidad: {product.quantity}</p>
                          </>
                        ) : (
                          <p>Producto no disponible</p>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>

                <label htmlFor={`status-${order._id}`} className="block text-gray-700 dark:text-gray-300 mb-2">Actualizar estado:</label>
                <div className="mt-4 flex w-full justify-around">
                  <div>
                    <select
                      id={`status-${order._id}`}
                      value={order.status}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      className="p-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="pending">Pendiente</option>
                      <option value="in-progress">En progreso</option>
                      <option value="shipped">Enviado</option>
                      <option value="delivered">Entregado</option>
                      <option value="canceled">Cancelado</option>
                    </select>
                  </div>
                  <button
                    className="ml-4 bg-red-600 text-white font-bold py-2 px-2 rounded hover:bg-red-700 focus:outline-none
                    focus:ring-2 focus:ring-red-500 w-2/5"
                    onClick={() => handleDeleteOrder(order._id)}
                  >
                    Delete
                  </button>
                </div>

              </div>
            ))}
          </div>

          {/* Paginación */}
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-black dark:text-white rounded mr-2"
            >
              Anterior
            </button>
            <span className="text-gray-700 dark:text-gray-300">Página {page} de {totalPages}</span>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-black dark:text-white rounded ml-2"
            >
              Siguiente
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersComponent;
