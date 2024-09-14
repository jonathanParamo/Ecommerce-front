import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const typeUser = import.meta.env.VITE_TYPE_USER;


// Acción asíncrona para obtener categorías
export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async () => {
    const response = await fetch('http://localhost:4000/api/v1/categories/categories');

    if (!response.ok) {
      throw new Error('Error al obtener las categorías');
    }

    return response.json();
  }
);

export const createCategory = createAsyncThunk(
  'categories/createCategory',
  async (categoryData, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:4000/api/v1/categories/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({categoryData, role: typeUser}),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Error al crear la categoría');
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateCategory = createAsyncThunk(
  'categories/updateCategory',
  async ({ id, name, subcategories }, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:4000/api/v1/categories/categories/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, subcategories, role: typeUser }),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Error al actualizar la categoría');
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  'categories/deleteCategory',
  async ( id , { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:4000/api/v1/categories/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role: typeUser }),
        credentials: 'include',
      });

      if (!response.ok) {

        throw new Error('Error al eliminar la categoría');
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories.push(action.payload);
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        const index = state.categories.findIndex((cat) => cat._id === action.payload._id);
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
      })
      .addCase(deleteCategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const deletedCategoryId = action.meta.arg;
        state.categories = state.categories.filter(cat => cat._id !== deletedCategoryId);
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
  },
});

export default categoriesSlice.reducer;
