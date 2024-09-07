import { useState, useEffect } from 'react';
import { FormContainer, InputContainer, DescriptionContainer, ContainerButton } from '../utils/createProductForm';
import Button from './Button';
import ImagePreview from './ImagePreview';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from '../features/products/productSlice';
import { fetchCategories } from '../features/categories/categoriesSlice';

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
    formData.append('priceCOP', parseFloat(priceCOP)); // Convertir a número
    formData.append('categoryId', categoryId);
    formData.append('subcategory', subcategory);
    formData.append('description', description);
    formData.append('quantity', parseInt(quantity, 10)); // Convertir a entero
    formData.append('sizes', sizes);
    formData.append('colors', colors);
    formData.append('discount', JSON.stringify({
      value: parseFloat(discount), // Convertir a número
      startDate: new Date(discountStartDate).toISOString(),
      endDate: new Date(discountEndDate).toISOString()
    }));
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
    <FormContainer onSubmit={handleSubmit}>
      <InputContainer>
        <label>Nombre:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </InputContainer>

      <InputContainer>
        <label>Precio:</label>
        <input
          type="number"
          value={priceCOP}
          onChange={(e) => setPriceCOP(e.target.value)}
          required
        />
      </InputContainer>

      <InputContainer>
        <label>Categoría:</label>
        <select
          value={categoryId}
          onChange={(e) => {
            setCategoryId(e.target.value);
            setSubcategory('');
          }}
          required
        >
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </InputContainer>

      <InputContainer>
        <label>Subcategoría:</label>
        <select
          value={subcategory}
          onChange={(e) => setSubcategory(e.target.value)}
          required
        >
          <option value="">Seleccione una subcategoría</option>
          {categoryId && categories.find((cat) => cat._id === categoryId)?.subcategories.map((subcat) => (
            <option key={subcat} value={subcat}>
              {subcat}
            </option>
          ))}
        </select>
      </InputContainer>

      <InputContainer>
        <label>Cantidad:</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
      </InputContainer>

      <InputContainer>
        <label>Colores (separados por coma):</label>
        <input
          type="text"
          value={colors.join(',')}
          onChange={(e) => setColors(e.target.value.split(','))}
        />
      </InputContainer>

      <InputContainer>
        <label>Tamaños (separados por coma):</label>
        <input
          type="text"
          value={sizes.join(',')}
          onChange={(e) => setSizes(e.target.value.split(','))}
        />
      </InputContainer>

      <InputContainer>
        <label>Descuento:</label>
        <input
          type="number"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
          max="50"
          placeholder="0-50%"
        />
      </InputContainer>

      <InputContainer>
        <label>Fecha de inicio del descuento:</label>
        <input
          type="date"
          value={discountStartDate}
          onChange={(e) => setDiscountStartDate(e.target.value)}
        />
      </InputContainer>

      <InputContainer>
        <label>Fecha de fin del descuento:</label>
        <input
          type="date"
          value={discountEndDate}
          onChange={(e) => setDiscountEndDate(e.target.value)}
        />
      </InputContainer>

      <DescriptionContainer>
        <label>Descripción:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </DescriptionContainer>

      <DescriptionContainer>
        <label>Imágenes:</label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          required
        />

        <ImagePreview images={images.map(img => URL.createObjectURL(img))} setImages={setImages} />
      </DescriptionContainer>

      <ContainerButton>
        <Button $variant="secondary" type="submit">
          Crear Producto
        </Button>
      </ContainerButton>
    </FormContainer>
  );
}

export default CreateProductForm;
