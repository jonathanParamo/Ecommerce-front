import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, createCategory, updateCategory } from '../features/categories/categoriesSlice';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FaTimes, FaEdit } from 'react-icons/fa';

const CategoriesManager = () => {
  const dispatch = useDispatch();
  const { categories, status } = useSelector((state) => state.categories);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [subcategories, setSubcategories] = useState('');
  const [needsUpdate, setNeedsUpdate] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [categoryId, setCategoryId] = useState(null);

  useEffect(() => {
    if (needsUpdate) {
      dispatch(fetchCategories());
      setNeedsUpdate(false);
    }
  }, [dispatch, needsUpdate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const categoryData = {
      name,
      subcategories: subcategories.split(',').map(subcat => subcat.trim()),
    };

    try {
      if (editMode && categoryId) {
        // Editar la categoría existente
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

  const resetForm = () => {
    setName('');
    setSubcategories('');
    setEditMode(false);
    setCategoryId(null);
  };

  return (
    <div className="w-full h-screen flex flex-col items-center p-4 bg-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Categorías</h1>
      {status === 'loading' && <p className="text-gray-600">Cargando...</p>}
      {status === 'failed' && <p className="text-red-600">Error al cargar las categorías</p>}
      {status === 'succeeded' && (
        <table className="w-3/4 border-collapse bg-white shadow-md">
          <thead>
            <tr>
              <th className="border-b-2 p-4 text-left">Categoría</th>
              <th className="border-b-2 p-4 text-left">Subcategorías</th>
              <th className="border-b-2 p-4 text-left">Editar</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat._id}>
                <td className="border-b p-4">{cat.name}</td>
                <td className="border-b p-4">{cat.subcategories.join(', ')}</td>
                <td className="border-b p-4 cursor-pointer text-blue-500" onClick={() => handleEdit(cat)}>Editar</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/3">
            <h2 className="text-2xl font-semibold mb-4">{editMode ? 'Editar Categoría' : 'Crear Nueva Categoría'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Nombre de la Categoría:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Subcategorías (separadas por coma):</label>
                <input
                  type="text"
                  value={subcategories}
                  onChange={(e) => setSubcategories(e.target.value)}
                  className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-between mt-4">
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                >
                  {editMode ? 'Actualizar' : 'Crear'}
                </button>
                <button
                  type="button"
                  onClick={() => { setShowModal(false); resetForm(); }}
                  className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="w-full flex justify-end mt-6 px-4">
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          Crear Categoría
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CategoriesManager;
