import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import ImagePreview from './ImagePreview';
import FormField from './FormField';
import { updateProduct } from '../features/products/productSlice';

function EditProductForm() {
  const { productId } = useParams();
  const product = useSelector(state =>
    state.products.products.find(product => product._id === productId)
  );

  const [name, setName] = useState('');
  const [priceCOP, setPriceCOP] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [discount, setDiscount] = useState('');
  const [discountStartDate, setDiscountStartDate] = useState('');
  const [discountEndDate, setDiscountEndDate] = useState('');
  const [images, setImages] = useState([]);
  const [originalImages, setOriginalImages] = useState([]);

  const { categories } = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPriceCOP(product.priceCOP);
      setCategoryId(product.categoryId);
      setSubcategory(product.subcategory);
      setDescription(product.description);
      setQuantity(product.quantity);
      setSizes(product.sizes || []);
      setColors(product.colors || []);
      setDiscount(product.discount || '');
      setDiscountStartDate(product.discountStartDate || '');
      setDiscountEndDate(product.discountEndDate || '');
      setImages([]); // reset images state
      setOriginalImages(product.images || []);
    }
  }, [product]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('priceCOP', priceCOP);
    formData.append('categoryId', categoryId);
    formData.append('subcategory', subcategory);
    formData.append('description', description);
    formData.append('quantity', quantity);
    formData.append('sizes', sizes.join(', '));
    formData.append('colors', colors.join(', '));
    formData.append('discount', JSON.stringify({
      value: discount,
      startDate: discountStartDate,
      endDate: discountEndDate
    }));

    if (images.length > 0) {
      images.forEach((image) => {
        formData.append('images', image);
      });
    }

    try {
      await dispatch(updateProduct({ productId: product._id, formData })).unwrap();
      navigate('/product-list');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (!product) {
    return <div>No product selected</div>;
  }

  return (
    <div className="w-full h-auto flex flex-col justify-center items-center pt-12 pb-12 dark:bg-black">
      <h2 className="text-black dark:text-white text-lg md:text-3xl font-poppins mb-3">Editar Producto</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-[#f5f5f515] font-roboto p-8 rounded-lg shadow-lg w-3/4 border-2
        border-purple-400 dark:border-slate-300"
      >
        <div className="flex flex-wrap gap-4 mb-4 w-full flex justify-around">
          <FormField
            label="Nombre:"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <FormField
            label="Precio:"
            type="number"
            value={priceCOP}
            onChange={(e) => setPriceCOP(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-wrap gap-4 mb-4 w-full flex justify-around">
          <FormField
            label="Categoría:"
            type="select"
            value={categoryId}
            onChange={(e) => {
              setCategoryId(e.target.value);
              setSubcategory('');
            }}
            options={categories.map(cat => ({ value: cat._id, label: cat.name }))}
            required
          />

          <FormField
            label="Subcategoría:"
            type="select"
            value={subcategory}
            onChange={(e) => setSubcategory(e.target.value)}
            options={[
              { value: '', label: 'Seleccione una subcategoría' },
              ...(categoryId && categories.find(cat => cat._id === categoryId)?.subcategories || []).map(subcat => ({ value: subcat, label: subcat }))
            ]}
            required
          />
        </div>

        <div className="flex flex-wrap gap-4 mb-4 w-full flex justify-around">
          <FormField
            label="Cantidad:"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />

          <FormField
            label="Colores (separados por coma):"
            type="text"
            value={colors.join(',')}
            onChange={(e) => setColors(e.target.value.split(','))}
          />
        </div>

        <div className="flex flex-wrap gap-4 mb-4 w-full flex justify-around">
          <FormField
            label="Tamaños (separados por coma):"
            type="text"
            value={sizes.toString()}
            onChange={(e) => setSizes(e.target.value.split(','))}
          />

          <FormField
            label="Descuento:"
            type="number"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            max="50"
            placeholder="0-50%"
            required
          />
        </div>

        <div className="flex flex-wrap gap-4 mb-4 w-full flex justify-around">
          <FormField
            label="Fecha de inicio del descuento:"
            type="date"
            value={discountStartDate}
            onChange={(e) => setDiscountStartDate(e.target.value)}
          />

          <FormField
            label="Fecha de fin del descuento:"
            type="date"
            value={discountEndDate}
            onChange={(e) => setDiscountEndDate(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-4 mb-4 w-full flex justify-around">
          <FormField
            label="Descripción:"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <div className="mb-4 w-full md:w-2/5">
            <label className="block font-bold mb-2 dark:text-white">Imágenes:</label>
            <label
              htmlFor="file-upload"
              className="cursor-pointer w-full inline-block px-4 py-2 bg-purple-600 dark:bg-transparent dark:border
              dark:border-cyan-500 dark:hover:border-cyan-600 text-white font-bold rounded-md hover:bg-purple-700
              focus:outline-none transition duration-300"
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
            />
            <p className="mt-2 text-gray-500">Selecciona múltiples imágenes para subir</p>
          </div>
        </div>


        <div className="w-full flex flex-col mb-4">
          <ImagePreview images={images.length > 0 ? images : originalImages} setImages={setImages} />
        </div>

        <div className="w-full flex justify-center items-center mt-4">
          <button
             className='w-2/5 bg-gray-500 dark:bg-transparent dark:border-2 dark:border-gray-400 hover:dark:border-gray-500
             hover:bg-gray-600 dark:hover:bg-transparent rounded p-2 text-white m-2'
             onClick={() => navigate('/product-list')}
          >
            Atras
          </button>
          <button
            type="submit"
            className='w-2/5 bg-purple-700 dark:bg-transparent dark:border-2 dark:border-blue-400 hover:dark:border-blue-500
            hover:purple-800 dark:hover:bg-transparent rounded p-2 text-white m-2'
          >
            Actualizar
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProductForm;
