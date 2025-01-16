import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from './axiosInstance';

export const addProduct = createAsyncThunk(
    "/addProduct",
    async (payload, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.post("/products", payload);
        console.log(response.data,".......9.....")
        return response.data;
      } catch (error) {
      
        rejectWithValue(error);
      }
    }
  );

export const getProduct = createAsyncThunk(
  "products/getProduct",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/products");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


export const updateProductDetail = createAsyncThunk(
    "products/updateProductDetail",
    async ({ productId, productDetails }, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.put(`/products/${productId}`, productDetails);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
      }
    }
  );
  


export const deleteProductDetail = createAsyncThunk(
  "products/deleteProductDetail",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/products/${productId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    addProduct:[],
    selectedProduct: null,
    loading: false,
    error: null,
    deleteSuccess: false,
  },
  extraReducers: (builder) => {
    builder
    // add products
    .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.addProduct = action.payload;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get all products
      .addCase(getProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get product details
      .addCase(updateProductDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProductDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(updateProductDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete a product
      .addCase(deleteProductDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.deleteSuccess = false;
      })
      .addCase(deleteProductDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.deleteSuccess = true;
        state.products = state.products.filter(
          (product) => product.id !== action.meta.arg
        );
      })
      .addCase(deleteProductDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.deleteSuccess = false;
      });
  },
});

export default productSlice.reducer;
