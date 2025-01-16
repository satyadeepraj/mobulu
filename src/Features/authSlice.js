import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toastService } from "../toastify";
import axios from "axios";

export const adminLogin = createAsyncThunk(
  "/login",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post("https://fakestoreapi.com/auth/login", payload);

      if (response?.data?.token) {
        localStorage.setItem("adminToken", JSON.stringify(response?.data));
        toastService.success("Login successful!");
        return response.data; 
      } else {
        throw new Error("Invalid response format"); 
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.message || "Login failed. Please try again.";
      toastService.error(errorMessage);
      return rejectWithValue(errorMessage); 
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    adminData: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminLogin.pending, (state) => {
        state.loading = true;
        state.error = null; 
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token; 
        state.adminData = action.payload; 
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      });
  },
});

export default authSlice.reducer;
