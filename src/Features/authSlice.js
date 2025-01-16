import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { toastService } from "../toastify";
import axios from "axios";
export const adminLogin = createAsyncThunk(
  "/login",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post("https://fakestoreapi.com/auth/login", payload);
      localStorage.setItem("adminToken", JSON.stringify(response?.data));
      toastService.success(response?.data?.message);
      return response.data;
    } catch (error) {
      toastService.error(error?.response?.data?.message);
      rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: { token: null },
  extraReducers:(builder)=>{
    builder
     .addCase(adminLogin.pending, (state, action) => {
        state.loading = true;
      })
     .addCase(adminLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.adminData = action.payload;
      })
     .addCase(adminLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});


export default authSlice.reducer;