import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "./axiosInstance";

// Fetch user's cart
export const getcart = createAsyncThunk(
  "cart/getcart",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/carts/user/${userId}`);
     
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Update cart
export const updateCart = createAsyncThunk(
  "cart/updateCart",
  async ({ cartId, updatedCart }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/carts/${cartId}`, updatedCart);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    updatedCart: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      // Handle getcart
      .addCase(getcart.pending, (state) => {
        state.loading = true;
      })
      .addCase(getcart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
      })
      .addCase(getcart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle updateCart
      .addCase(updateCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.loading = false;
        state.updatedCart = action.payload;
        state.cartItems = action.payload;
      })
      .addCase(updateCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default cartSlice.reducer;
