import CreateProductForm from '../components/CreateProductForm';

function ProductManager() {
  return (
    <div className="p-5 w-9/12 mx-auto flex flex-col items-center text-gray-800">
      <h1 className="text-2xl font-bold mb-4 mt-1">Crear Producto</h1>
      <CreateProductForm />
    </div>
  );
}

export default ProductManager;
