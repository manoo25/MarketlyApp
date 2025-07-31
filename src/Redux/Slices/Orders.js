import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserId } from "./GetUserData";
import { supabase } from "../Supabase";

export const getOrders = createAsyncThunk(
  "orders/getOrders",
  async (_, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("orders")
        .select(
          `*,
           user_id (*),
           trader_id (name)`
        )
        .eq("user_id", UserId)
        .order("created_at", { ascending: false }); 
      if (error) throw error;
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const getDelegatorOrders = createAsyncThunk(
  "orders/getDelegatorOrders",
  async (_, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("orders")
        .select(
          `*,
           user_id (*),
           trader_id (name)
           `
        )
        .eq("delegator", UserId)
        .order("created_at", { ascending: false }); 
      if (error) throw error;
        console.log('DelOrders'+data);
      return data;
    
      
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


// ✅ Get Done Orders (Status = 'done')
export const getDoneOrders = createAsyncThunk(
  "orders/getDoneOrders",
  async (_, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("orders")
         .select(`*,
           user_id (*),
            trader_id (name)`)
        .eq("user_id", UserId)
        .eq("status", "done");

      if (error) throw error;
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ✅ Add New Order
export const addOrder = createAsyncThunk(
  "orders/addOrder",
  async (newOrderData, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("orders")
        .insert([newOrderData])
        .select(`*,
           user_id (*),
            trader_id (name)`)

      if (error) {
      
        throw error;
        
      }
      return data[0];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ✅ Edit Existing Order
export const editOrder = createAsyncThunk(
  "orders/editOrder",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("orders")
        .update(updatedData)
        .eq("id", id)
        .select(`*,
           user_id (*),
            trader_id (name)`)
        .single();

      if (error) throw error;
  
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ✅ Delete Order
export const deleteOrder = createAsyncThunk(
  "orders/deleteOrder",
  async (orderId, { rejectWithValue }) => {
    try {
      const { error } = await supabase
        .from("orders")
        .delete()
        .eq("id", orderId);

      if (error) throw error;
      return orderId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ✅ Update Order Status
export const updateOrderStatus = createAsyncThunk(
  "orders/updateOrderStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const { error } = await supabase
        .from("orders")
        .update({ status })
        .eq("id", id);

      if (error) throw error;
      return { id, status };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ✅ Slice
const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    delegatesOrders: [],
    doneOrders: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      // Get Orders
      .addCase(getOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
    
      .addCase(getOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

        .addCase(getDelegatorOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.delegatesOrders = action.payload;
      })
       .addCase(getDelegatorOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // Get Done Orders
      .addCase(getDoneOrders.fulfilled, (state, action) => {
        state.doneOrders = action.payload;
      })

      // Add Order
      .addCase(addOrder.fulfilled, (state, action) => {
        state.orders.unshift(action.payload); // add to top
      })

      // Edit Order
      .addCase(editOrder.fulfilled, (state, action) => {
        const index = state.orders.findIndex((o) => o.id === action.payload.id);
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
      })

      // Delete Order
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.orders = state.orders.filter((order) => order.id !== action.payload);
      })

      // Update Order Status
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const index = state.orders.findIndex((o) => o.id === action.payload.id);
        if (index !== -1) {
          state.orders[index].status = action.payload.status;
        }
      });
  },
});

export default ordersSlice;
