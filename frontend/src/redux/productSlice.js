import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const API_URL = import.meta.env.VITE_API_URL;


// fetch all products
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get(`${API_URL}/products`);
  console.log(response)
  return response.data;
});
//create new product 
export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (productData) => {
    const response = await axios.post(`${API_URL}/products`, productData);
    console.log(response)
    return response.data; // returns the newly created product
  }
);

// update product 
export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ id, productData }) => {
    const response = await axios.put(`${API_URL}/products/${id}`, productData);
    console.log(response)
    return response.data; // returns the updated product
  }
);

//delete product
export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id) => {
    await axios.delete(`${API_URL}/products/${id}`);
    return id; // returns the id of the deleted product
  }
);
// redux slice configuration
const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.items.push(action.payload); // adds the new products
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.items.findIndex(product => product.id === action.payload.id);
        if (index >= 0) {
          state.items[index] = action.payload; // updates the procuct
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter(product => product.id !== action.payload); // Removes the deleted product
      });
  },
});

export default productSlice.reducer;
