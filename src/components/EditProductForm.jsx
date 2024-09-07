import { useState, useEffect } from 'react';
import { FormContainer, DescriptionContainer, ContainerButton, MainContainer } from '../utils/createProductForm';
import Button from './Button';
import ImagePreview from './ImagePreview';
import { useDispatch, useSelector } from 'react-redux';
import { updateProduct } from '../features/products/productSlice';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import FormField from './FormField';

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

    // Add images only if there are new ones
    if (images.length > 0) {
      images.forEach((image) => {
        formData.append('images', image);
      });
    }

    try {
      await dispatch(updateProduct({ productId: product._id, formData })).unwrap();
      navigate('/list');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (!product) {
    return <div>No product selected</div>;
  }

  return (
    <MainContainer>
      <FormContainer onSubmit={handleSubmit}>
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

          <FormField
            label="Descripción:"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

        <FormField
          label="Imágenes:"
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
        />

        <DescriptionContainer>
          <ImagePreview images={images.length > 0 ? images : originalImages} setImages={setImages} />
        </DescriptionContainer>

        <ContainerButton>
          <Button $variant="secondary" type="submit">
            Actualizar Producto
          </Button>
        </ContainerButton>
      </FormContainer>
    </MainContainer>
  );
}

export default EditProductForm;
