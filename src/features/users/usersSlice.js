import { createSlice, createAsyncThunk } from"@reduxjs/toolkit";

const API_URL = import.meta.env.VITE_URL_SERVER || 'http://localhost:4000/api/v1/'

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async () => {
    const response = await fetch(`${API_URL}users`)
    return response.json();
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    status: "idle",
    error: null,
  },
  reducers: {
    addUsers: (state, action) => {
      state.users.push(action.payload);
    },
    removeUsers: (state, action) => {
      state.users = state.users.filter(user => user.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  }
});

export const { addUsers, removeUsers } = usersSlice.actions;
export default usersSlice.reducer;
