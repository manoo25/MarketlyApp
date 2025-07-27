// src/Redux/Slices/Categories.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "../Supabase";


// جلب الأقسام من Supabase
export const fetchcategories = createAsyncThunk(
  "categories/fetchcategories",
  async (_, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase.from("categories").select("*");
      if (error) throw error;
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const CategoriesSlice = createSlice({
  name: "Categories",
  initialState: {
    categories: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchcategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchcategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchcategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default CategoriesSlice;
