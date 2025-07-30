import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "../Supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Alert } from "react-native";

// ✅ Fetch cart items
export const fetchCartItems = createAsyncThunk(
  "cart_items/fetchCartItems",
  async (_, { rejectWithValue }) => {
    try {
      const userData = JSON.parse(await AsyncStorage.getItem("userData"));

      const { data, error } = await supabase
        .from("cart_items")
        .select(`
          *,
          product:product_id (name, image, endPrice, trader_id)
        `)
        .eq("user_id", userData.id);

      if (error) throw error;

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const fetchSpecificCartItems = createAsyncThunk(
  "cart_items/fetchSpecificCartItems",
  async (id, { rejectWithValue }) => {
    try {
      const userData = JSON.parse(await AsyncStorage.getItem("userData"));

      const { data, error } = await supabase
        .from("cart_items")
        .select(`
          *,
          product:product_id (name, image, endPrice, trader_id)
        `)
        .eq("user_id", userData.id)
        .eq("product_id", id);

      if (error) throw error;

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


// ✅ Create new cart item
export const createCartItem = createAsyncThunk(
  "cart_items/createCartItem",
  async ({ product_id, quantity }, { rejectWithValue }) => {
    try {
      const userData = JSON.parse(await AsyncStorage.getItem("userData"));

      const { data, error } = await supabase
        .from("cart_items")
        .insert([
          {
            product_id,
            quantity,
            user_id: userData.id,
          },
        ])
        .select(`*, product:product_id (name, image, endPrice, trader_id)`);

      if (error) throw error;
// console.log('newItem',data[0]);

      return data[0];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


// ✅ Update existing cart item
export const updateCartItem = createAsyncThunk(
  "cart_items/updateCartItem",
  async ({ id, quantity }, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("cart_items")
        .update({ quantity })
        .eq("id", id)
        .select(`*, product:product_id (name, image, endPrice, trader_id)`);

      if (error) throw error;

      return data[0];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


// ✅ Delete cart item
export const deleteCartItem = createAsyncThunk(
  "cart_items/deleteCartItem",
  async (id, { rejectWithValue }) => {
    try {
      const { error } = await supabase
        .from("cart_items")
        .delete()
        .eq("id", id);

      if (error) throw error;

      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);



export const addOrUpdateCartItem = createAsyncThunk(
  "cart_items/addOrUpdateCartItem",
  async ({ product_id, traderID, quantity, navigate }, { dispatch, getState, rejectWithValue }) => {
    const userData = JSON.parse(await AsyncStorage.getItem("userData"));
    const existingItems = getState().CartItems.cartItems;
    const existingItem = existingItems.find(
      (item) => item.product_id === product_id && item.user_id === userData.id
    );

    if (existingItems.length > 0 && existingItems[0].product.trader_id !== traderID) {
      Alert.alert(
        "تنبيه",
        "لا يمكنك إضافة منتجات من تاجر آخر في نفس السلة",
        [
          {
            text: "تصفح منتجات التاجر",
            onPress: () => {
             navigate("TraderProducts", { TraderID: existingItems[0].product.trader_id });
            },
            style: "default",
          },
          {
            text: "اكمال الطلب",
            onPress: () => {
             navigate("CartScreen");
            },
            style: "default",
          },
        ],
        { cancelable: true }
      );
      return;
    }

    if (existingItem) {
      const newQuantity = existingItem.quantity + quantity;
      return await dispatch(
        updateCartItem({ id: existingItem.id, quantity: newQuantity })
      ).unwrap();
    } else {
      return await dispatch(
        createCartItem({ product_id, quantity })
      ).unwrap();
    }
  }
);


export const deleteCartItemsByUserId = createAsyncThunk(
  "cart/deleteByUserId",
  async (userId, { rejectWithValue }) => {
    try {
      const { error } = await supabase
        .from("cart_items")
        .delete()
        .eq("user_id", userId);
      if (error) throw error;
      return userId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ✅ Slice
const cartItemsSlice = createSlice({
  name: "cartItems",
  initialState: {
    cartItems: [],
    specificCartItem: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchCartItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

        .addCase(fetchSpecificCartItems.fulfilled, (state, action) => {
        state.specificCartItem = action.payload;
      })

      // Create
      .addCase(createCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems.push(action.payload);
      })
      .addCase(createCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update
      .addCase(updateCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.cartItems.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.cartItems[index] = action.payload;
        }
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete
      .addCase(deleteCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
       .addCase(deleteCartItemsByUserId.fulfilled, (state, action) => {
        state.cartItems = [];
      });
  },
});

export default cartItemsSlice;

