import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from '../features/products/productSlice';
import { fetchCategories } from '../features/categories/categoriesSlice';
import ImagePreview from './ImagePreview';

function CreateProductForm() {
  const [name, setName] = useState('');
  const [priceCOP, setPriceCOP] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [discountStartDate, setDiscountStartDate] = useState('');
  const [discountEndDate, setDiscountEndDate] = useState('');
  const [images, setImages] = useState([]);
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('priceCOP', parseFloat(priceCOP));
    formData.append('categoryId', categoryId);
    formData.append('subcategory', subcategory);
    formData.append('description', description);
    formData.append('quantity', parseInt(quantity, 10));
    formData.append('sizes', sizes);
    formData.append('colors', colors);
    formData.append('role', 'admin');

    if (discount > 0) {
      formData.append('discount', JSON.stringify({
        value: parseFloat(discount), // Convertir a número
        startDate: new Date(discountStartDate).toISOString(),
        endDate: new Date(discountEndDate).toISOString()
      }));
    }
    images.forEach((image) => {
      formData.append('images', image);
    });

    try {
      await dispatch(createProduct(formData)).unwrap();

      setName('');
      setDescription('');
      setPriceCOP('');
      setCategoryId('');
      setSubcategory('');
      setQuantity('');
      setSizes([]);
      setColors([]);
      setDiscount(0);
      setDiscountStartDate('');
      setDiscountEndDate('');
      setImages([]);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex flex-col items-center my-8 w-full">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-[#f5f5f515] font-roboto p-8 rounded-lg shadow-lg w-3/4 border-2
        border-purple-400 dark:border-slate-300"
      >
        {/* Nombre y Precio */}
        <div className="flex flex-wrap gap-4 mb-4 w-full flex justify-around">
          <div className="w-full md:w-2/5">
            <label className="block font-bold mb-2 dark:text-gray-200">Nombre:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-black dark:border-gray-600 rounded-md bg-white dark:bg-transparent dark:text-white focus:outline-none"
              required
            />
          </div>
          <div className="w-full md:w-2/5">
            <label className="block font-bold mb-2 dark:text-gray-200">Precio:</label>
            <input
              type="number"
              value={priceCOP}
              onChange={(e) => setPriceCOP(e.target.value)}
              className="w-full px-3 py-2 border border-black dark:border-gray-600 rounded-md bg-white dark:bg-transparent dark:text-white focus:outline-none"
              required
            />
          </div>
        </div>

        {/* Categoría y Subcategoría */}
        <div className="flex flex-wrap gap-4 mb-4 w-full flex justify-around">
          <div className="w-full md:w-2/5">
            <label className="block font-bold mb-2 dark:text-gray-200">Categoría:</label>
            <select
              value={categoryId}
              onChange={(e) => {
                setCategoryId(e.target.value);
                setSubcategory('');
              }}
              className="w-full px-3 py-2 border border-black dark:border-gray-600 rounded-md bg-white dark:bg-[#141414] dark:text-white focus:outline-none"
              required
            >
              <option>Seleccione una categoria</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full md:w-2/5">
            <label className="block font-bold mb-2 dark:text-gray-200">Subcategoría:</label>
            <select
              value={subcategory}
              onChange={(e) => setSubcategory(e.target.value)}
              className="w-full px-3 py-2 border border-black dark:border-gray-600 rounded-md bg-white dark:bg-[#141414] dark:text-white focus:outline-none"
              required
            >
              <option value="">Seleccione una subcategoría</option>
              {categoryId &&
                categories.find((cat) => cat._id === categoryId)?.subcategories.map((subcat) => (
                  <option key={subcat} value={subcat}>
                    {subcat}
                  </option>
                ))}
            </select>
          </div>
        </div>

        {/* Cantidad y Colores */}
        <div className="flex flex-wrap gap-4 mb-4 w-full flex justify-around">
          <div className="w-full md:w-2/5">
            <label className="block font-bold mb-2 dark:text-gray-200">Cantidad:</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full px-3 py-2 border border-black dark:border-gray-600 rounded-md bg-white dark:bg-transparent dark:text-white focus:outline-none"
              required
            />
          </div>
          <div className="w-full md:w-2/5">
            <label className="block font-bold mb-2 dark:text-gray-200">Colores (separados por coma):</label>
            <input
              type="text"
              value={colors.join(',')}
              onChange={(e) => setColors(e.target.value.split(','))}
              className="w-full px-3 py-2 border border-black dark:border-gray-600 rounded-md bg-white dark:bg-transparent dark:text-white focus:outline-none"
            />
          </div>
        </div>

        {/* Tamaños y Descuento */}
        <div className="flex flex-wrap gap-4 mb-4 w-full flex justify-around">
          <div className="w-full md:w-2/5">
            <label className="block font-bold mb-2 dark:text-gray-200">Tamaños (separados por coma):</label>
            <input
              type="text"
              value={sizes.join(',')}
              onChange={(e) => setSizes(e.target.value.split(','))}
              className="w-full px-3 py-2 border border-black dark:border-gray-600 rounded-md bg-white dark:bg-transparent dark:text-white focus:outline-none"
            />
          </div>
          <div className="w-full md:w-2/5">
            <label className="block font-bold mb-2 dark:text-gray-200">Descuento:</label>
            <input
              type="number"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              max="50"
              placeholder="0-50%"
              className="w-full px-3 py-2 border border-black dark:border-gray-600 rounded-md bg-white dark:bg-transparent dark:text-white focus:outline-none"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mb-4 w-full flex justify-around">
          <div className="w-full md:w-2/5">
            <label className="block font-bold mb-2">Fecha de inicio del descuento:</label>
            <input
              type="date"
              value={discountStartDate}
              onChange={(e) => setDiscountStartDate(e.target.value)}
              className="w-full px-3 py-2 border border-black dark:border-gray-600 rounded-md bg-white dark:bg-transparent dark:text-white focus:outline-none"
            />
          </div>
          <div className="w-full md:w-2/5">
            <label className="block font-bold mb-2">Fecha de fin del descuento:</label>
            <input
              type="date"
              value={discountEndDate}
              onChange={(e) => setDiscountEndDate(e.target.value)}
              className="w-full px-3 py-2 border border-black dark:border-gray-600 rounded-md bg-white dark:bg-transparent dark:text-white focus:outline-none"
            />
          </div>
        </div>


        <div className="flex flex-wrap gap-4 mb-4 w-full flex justify-around">
          {/* Descripción */}
          <div className="mb-4 w-full md:w-2/5">
            <label className="block font-bold mb-2 dark:text-gray-200">Descripción:</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border font-roboto border-black dark:border-gray-600 rounded-md bg-white dark:bg-transparent dark:text-white focus:outline-none"
              required
            />
          </div>

          {/* Imágenes */}
          <div className="mb-4 w-full md:w-2/5">
            <label className="block font-bold mb-2">Imágenes:</label>
            <label
              htmlFor="file-upload"
              className="cursor-pointer w-full inline-block px-4 py-2 bg-purple-600 dark:bg-transparent dark:border dark:border-cyan-500 dark:hover:border-cyan-600 text-white font-bold rounded-md hover:bg-purple-700 focus:outline-none transition duration-300"
            >
              Subir Imágenes
            </label>
            <input
              id="file-upload"
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              required
            />
            <p className="mt-2 text-gray-500">Selecciona múltiples imágenes para subir</p>
          </div>
        </div>
        <ImagePreview images={images.map((img) => URL.createObjectURL(img))} setImages={setImages} />

        {/* Botón Crear Producto */}
        <div className="flex justify-center mt-4 w-full">
          <button
            type="submit"
            className="w-3/5 cursor-pointer w-full inline-block px-4 py-2 bg-purple-600 dark:bg-transparent
            dark:border dark:border-cyan-500 dark:hover:border-cyan-600 text-white font-bold
            rounded-md hover:bg-purple-700 focus:outline-none transition duration-300"
          >
            Crear Producto
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateProductForm;
