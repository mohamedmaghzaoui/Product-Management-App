import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// fetch al categories
export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
  const response = await axios.get(`${API_URL}/categories`);
  console.log(response)
  return response.data;
});
//create category 
export const createCategory = createAsyncThunk(
  'categories/createCategory',
  async (categoryData) => {
    const response = await axios.post(`${API_URL}/categories`, categoryData);
    return response.data; // returns the newly created category
  }
);

// edit category
export const updateCategory = createAsyncThunk(
  'categories/updateCategory',
  async ({ id, categoryData }) => {
    const response = await axios.put(`${API_URL}/categories/${id}`, categoryData);
    return response.data; // returns the updated category
  }
);

// delete category
export const deleteCategory = createAsyncThunk(
  'categories/deleteCategory',
  async (id) => {
    await axios.delete(`${API_URL}/categories/${id}`);
    return id; // returns the id of the deleted category
  }
);



// Category Slice
const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    items: [],
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
        state.items = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.items.push(action.payload); // Adds the new category to the list
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        const index = state.items.findIndex(category => category.id === action.payload.id);
        if (index >= 0) {
          state.items[index] = action.payload; // Update the category in the list
        }
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.items = state.items.filter(category => category.id !== action.payload); // Removes the deleted category
      });
  },
});

export default categorySlice.reducer;

