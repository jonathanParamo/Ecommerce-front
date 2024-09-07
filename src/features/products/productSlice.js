import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Acción asíncrona para obtener productos
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (params) => {
    const { page = 1, limit = 20, category, subcategory } = params;

    // Construye la URL con los parámetros de consulta
    const url = new URL('http://localhost:4000/products/get-products');
    url.searchParams.append('page', page);
    url.searchParams.append('limit', limit);
    if (category) {
      url.searchParams.append('category', category);
    }

    if (subcategory) {
      url.searchParams.append('subcategory', subcategory);
    }

    // Realiza la solicitud a la API
    const response = await fetch(url);

    // Manejo de errores si la respuesta no es exitosa
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    // Retorna los datos JSON de la respuesta
    return response.json();
  }
);

// Acción asíncrona para crear un producto
export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:4000/products/create-product', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Error al crear el producto');
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ productId, formData }, { rejectWithValue }) => {

    try {
      const response = await fetch(`http://localhost:4000/products/update-product/${productId}`, {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Error al actualizar el producto');
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchLowStockProducts = createAsyncThunk(
  'products/fetchProducts',
  async (params) => {
    const { page = 1, limit = 20, category, subcategory } = params;

    // Construye la URL con los parámetros de consulta
    const url = new URL('http://localhost:4000/products/low-stock');
    url.searchParams.append('limit', limit);
    url.searchParams.append('page', page);
    if (category) {
      url.searchParams.append('category', category);
    }

    if (subcategory) {
      url.searchParams.append('subcategory', subcategory);
    }

    // Realiza la solicitud a la API
    const response = await fetch(url);

    // Manejo de errores si la respuesta no es exitosa
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    // Convierte la respuesta a JSON
    const data = await response.json();
    return data;
  }
);




const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    status: 'idle',
    error: null,
    total: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Manejo de la acción fetchProducts
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload.products;
        state.total = action.payload.total;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Manejo de la acción createProduct
      .addCase(createProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Añadir el nuevo producto al array de productos
        state.products.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default productsSlice.reducer;
