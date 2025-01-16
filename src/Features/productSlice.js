
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axiosInstance from './axiosInstance';


export const getProduct = createAsyncThunk(
    "/getProduct",
    async (payload, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.get("/products", payload);
        return response.data;
      } catch (error) {
      
        rejectWithValue(error);
      }
    }
  );

  export const getProductDetail = createAsyncThunk(
    "/getProductDetail",
    async (payload, { rejectWithValue }) => {
      try {
        const response = await axiosInstance.get(`/products/${payload}`);
        return response.data;
      } catch (error) {
      
        rejectWithValue(error);
      }
    }
  );

const productSlice = createSlice({
  name: 'products',
  initialState: { products: [],productDetail:[] },
  extraReducers:(builder)=>{
     builder
      .addCase(getProduct.pending, (state, action) => {
         state.loading = true;
       })
      .addCase(getProduct.fulfilled, (state, action) => {
         state.loading = false;
         state.products = action.payload;
       })
      .addCase(getProduct.rejected, (state, action) => {
         state.loading = false;
         state.error = action.error.message;
       })
       .addCase(getProductDetail.pending, (state, action) => {
        state.loading = true;
      })
     .addCase(getProductDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.productDetail = action.payload;
      })
     .addCase(getProductDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
   }
});


export default productSlice.reducer;
