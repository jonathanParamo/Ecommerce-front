import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, createCategory, updateCategory, deleteCategory } from '../features/categories/categoriesSlice';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import LoadingSpinner from '../components/LoaderSpinner';
import ReactModal from 'react-modal';

const CategoriesManager = () => {
  const dispatch = useDispatch();
  const { categories, status } = useSelector((state) => state.categories);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [subcategories, setSubcategories] = useState('');
  const [needsUpdate, setNeedsUpdate] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [categoryId, setCategoryId] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
      dispatch(fetchCategories());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const categoryData = {
      name,
      subcategories: subcategories.split(',').map(subcat => subcat.trim()),
    };

    try {
      if (editMode && categoryId) {
        await dispatch(updateCategory({ id: categoryId, ...categoryData })).unwrap();
        toast("¡Categoría actualizada con éxito!");
      } else {
        // Crear una nueva categoría
        await dispatch(createCategory(categoryData)).unwrap();
        toast("¡Categoría creada con éxito!");
      }

      setNeedsUpdate(true);
      setShowModal(false);
      resetForm();
    } catch (error) {
      toast.error("¡Algo salió mal!", error);
    }
  };

  const handleEdit = (category) => {
    setEditMode(true);
    setCategoryId(category._id);
    setName(category.name);
    setSubcategories(category.subcategories.join(', '));
    setShowModal(true);
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteCategory(categoryId)).unwrap();
      toast("¡Categoría eliminada con éxito!");
      setNeedsUpdate(true);
      setShowConfirmModal(false);
    } catch (error) {
      toast.error("¡Algo salió mal al eliminar la categoría!", error);
    }
  };

  const resetForm = () => {
    setName('');
    setSubcategories('');
    setEditMode(false);
    setCategoryId(null);
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center p-4 bg-white dark:bg-black">
      <h1 className="text-4xl font-bold font-roboto mb-6 text-black dark:text-white">Categorías</h1>
      {status === 'loading' && <LoadingSpinner />}
      {status === 'failed' && <p className="text-red-600 dark:text-red-400">Error al cargar las categorías</p>}
      {status === 'succeeded' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full p-2">
          {categories.map((cat) => (
            <div
              key={cat._id}
              className="bg-white dark:bg-[#141414] p-6 rounded-lg shadow-lg shadow-purple-200 dark:shadow-none flex flex-col justify-between"
            >
              <div>
                <h2 className="w-full text-center font-nunito text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  {cat.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-100 mb-4 font-nunito">Subcategorías:</p>
                <p className="text-black dark:text-white ">{cat.subcategories.join(', ')}</p>
              </div>
              <div className='w-full flex justify-between'>
                <button
                  onClick={() => handleEdit(cat)}
                  className="w-1/3 p-2 text-white bg-purple-800 rounded mt-3 dark:bg-transparent dark:border
                  dark:border-cyan-500 dark:hover:border-cyan-600 transition duration-500 ease-in-out transform"
                >
                  Editar
                </button>
                <button
                  onClick={() => {
                    setCategoryId(cat._id);
                    setShowConfirmModal(true);
                  }}
                  className="w-1/3 p-2 text-white bg-zinc-800 hover:bg-zinc-950 rounded mt-3 dark:bg-transparent 
                  dark:bg-red-500 dark:hover:bg-red-600 transition duration-500 ease-in-out transform"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-11/12 md:w-1/3">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              {editMode ? 'Editar Categoría' : 'Crear Nueva Categoría'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2 font-poppins">
                  Nombre de la Categoría:
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border dark:border-gray-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2 font-poppins">
                  Subcategorías (separadas por coma):
                </label>
                <input
                  type="text"
                  value={subcategories}
                  onChange={(e) => setSubcategories(e.target.value)}
                  className="w-full border dark:border-gray-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300"
                />
              </div>
              <div className="flex justify-between mt-4">
                <button
                  type="submit"
                  className="w-2/5 px-4 p-2 text-white bg-purple-800 rounded dark:bg-transparent dark:border
                  dark:border-cyan-500 dark:hover:border-cyan-600 transition duration-500 ease-in-out transform"
                >
                  {editMode ? 'Actualizar' : 'Crear'}
                </button>
                <button
                  type="button"
                  onClick={() => { setShowModal(false); resetForm(); }}
                  className="w-2/5 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showConfirmModal && (
        <ReactModal
          isOpen={showConfirmModal}
          onRequestClose={() => setShowConfirmModal(false)}
          contentLabel="Confirmar Eliminación"
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50"
          portalClassName="modal-portal"
        >
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-11/12 md:w-1/3">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Confirmar Eliminación
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              La categoría solo se eliminará si ningún producto está asociado a esta categoría o subcategoría.
            </p>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => handleDelete(categoryId)}
                className="w-1/3 px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700"
              >
                Eliminar
              </button>
              <button
                onClick={() => setShowConfirmModal(false)}
                className="w-1/3 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                Cancelar
              </button>
            </div>
          </div>
        </ReactModal>
      )}
      <div className="w-full flex justify-center mt-6 px-4">
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500"
        >
          Crear Categoría
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CategoriesManager;
