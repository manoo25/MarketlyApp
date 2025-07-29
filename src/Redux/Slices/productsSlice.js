import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "../Supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";

// ✅ Fetch all products (with role check)
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const UserData = JSON.parse(await AsyncStorage.getItem("userData"));
      
      // You need to actually execute the query with .select()
      const { data, error } = await supabase
        .from("products")
        .select(`
          *,
          category:category_id (name),
          trader:trader_id (routes),
          company:company_id (name)
        `);

      if (error) throw error;
const filterPro = data.filter(
  x =>
    
    x.publish === true &&
    x.state === true &&
    x.trader.routes
      ?.split(',')
      .map(r => r.trim())
      .includes(UserData.governorate)
);


      return filterPro;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
// ✅ Fetch all products (with role check)
export const fetchSpecificProducts = createAsyncThunk(
  "products/fetchSpecificProducts",
  async (ProductId, { rejectWithValue }) => {
    try {
      const UserData = JSON.parse(await AsyncStorage.getItem("userData"));
      
      // You need to actually execute the query with .select()
      const { data, error } = await supabase
        .from("products")
        .select(`
          *,
          category:category_id (name),
          trader:trader_id (routes),
          company:company_id (name)
        `);

      if (error) throw error;
const filterPro = data.filter(
  x =>
     x.id === ProductId &&
    x.publish === true &&
    x.state === true &&
    x.trader.routes
      ?.split(',')
      .map(r => r.trim())
      .includes(UserData.governorate)
);

console.log('filterPro'+filterPro);

      return filterPro;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ✅ Slice
const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    specificProduct: [],
    loading: false,
    error: null,
  },
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
       .addCase(fetchSpecificProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.specificProduct = action.payload;
      });
  },
});

export default productsSlice;
