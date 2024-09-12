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

    const discountObject = {
      value: parseFloat(discount),
      startDate: new Date(discountStartDate).toISOString(),
      endDate: new Date(discountEndDate).toISOString()
    };

    const formData = new FormData();
    formData.append('name', name);
    formData.append('priceCOP', parseFloat(priceCOP));
    formData.append('categoryId', categoryId);
    formData.append('subcategory', subcategory);
    formData.append('description', description);
    formData.append('quantity', parseInt(quantity, 10));
    formData.append('sizes', sizes);
    formData.append('colors', colors);
    formData.append('discount', JSON.stringify(discountObject));
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
    <div className="flex flex-col items-center my-8">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-3xl">
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="w-full md:w-1/2">
            <label className="block font-bold mb-2">Nombre:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="w-full md:w-1/2">
            <label className="block font-bold mb-2">Precio:</label>
            <input
              type="number"
              value={priceCOP}
              onChange={(e) => setPriceCOP(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block font-bold mb-2">Categoría:</label>
          <select
            value={categoryId}
            onChange={(e) => {
              setCategoryId(e.target.value);
              setSubcategory('');
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          >
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block font-bold mb-2">Subcategoría:</label>
          <select
            value={subcategory}
            onChange={(e) => setSubcategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
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

        <div className="flex flex-wrap gap-4 mb-4">
          <div className="w-full md:w-1/2">
            <label className="block font-bold mb-2">Cantidad:</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="w-full md:w-1/2">
            <label className="block font-bold mb-2">Colores (separados por coma):</label>
            <input
              type="text"
              value={colors.join(',')}
              onChange={(e) => setColors(e.target.value.split(','))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mb-4">
          <div className="w-full md:w-1/2">
            <label className="block font-bold mb-2">Tamaños (separados por coma):</label>
            <input
              type="text"
              value={sizes.join(',')}
              onChange={(e) => setSizes(e.target.value.split(','))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="w-full md:w-1/2">
            <label className="block font-bold mb-2">Descuento:</label>
            <input
              type="number"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              max="50"
              placeholder="0-50%"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mb-4">
          <div className="w-full md:w-1/2">
            <label className="block font-bold mb-2">Fecha de inicio del descuento:</label>
            <input
              type="date"
              value={discountStartDate}
              onChange={(e) => setDiscountStartDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="w-full md:w-1/2">
            <label className="block font-bold mb-2">Fecha de fin del descuento:</label>
            <input
              type="date"
              value={discountEndDate}
              onChange={(e) => setDiscountEndDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block font-bold mb-2">Descripción:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-bold mb-2">Imágenes:</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
          <ImagePreview images={images.map(img => URL.createObjectURL(img))} setImages={setImages} />
        </div>

        <div className="flex justify-center mt-4">
          <button type="submit">
            Crear Producto
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateProductForm;
