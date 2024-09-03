import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Acción asíncrona para obtener productos
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (params) => {
    const { page = 1, limit = 20, category, subcategory } = params; // Valores predeterminados

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

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    status: 'idle',
    error: null,
    total: 0
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
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
      });
  },
});

export default productsSlice.reducer;
