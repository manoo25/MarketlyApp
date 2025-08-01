import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../Supabase";

// ✅ Get all order items by order ID
export const fetchOrderItems = createAsyncThunk(
  "order_items/fetchOrderItems",
  async (OrderId, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("order_items")
        .select(`
          *,
          product: product_id (name, image, endPrice,unit)
  
        `)
        .eq("order_id", OrderId);

      if (error) throw error;
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ✅ Add new order items
export const addOrderItems = createAsyncThunk(
  "order_items/addOrderItems",
  async (itemsArray, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("order_items")
        .insert(itemsArray)
        .select(`
          *,
          product:product_id (
            id,
            name,
            image,
            endPrice,
            unit
          )
        `); // بيرجع array

      if (error) {
       
        throw error;
      }

      // تحقق إن كل عنصر فيه منتج
      const filteredData = data.filter(item => item.product);
    
      return filteredData;
    } catch (error) {
     
      return rejectWithValue(error.message);
    }
  }
);


export const updateOrderItem = createAsyncThunk(
  "order_items/updateOrderItem",
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      console.log('Data to Update:', updates);
      console.log('Item ID:', id);
      
      const { data, error } = await supabase
        .from("order_items")
        .update(updates)  // هنا نمرر كائن التحديثات مباشرة
        .eq("id", id)
        .select(`
          *,
          product:product_id (name, image, endPrice, unit)
        `)
        .single();

      if (error) throw error;
      console.log('Updated Data:', data);
      
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ✅ Delete order item
export const deleteOrderItem = createAsyncThunk(
  "order_items/deleteOrderItem",
  async (id, { rejectWithValue }) => {
    try {
      const { error } = await supabase.from("order_items").delete().eq("id", id);
      if (error) throw error;
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const addOrUpdateOrderItem = createAsyncThunk(
  "order_items/addOrUpdateOrderItem",
  async ({ product_id, order_id,price, quantity = 1 }, { dispatch, getState, rejectWithValue }) => {
    try {
      const { orderItems } = getState().OrderItems;
      const existingItem = orderItems.find(
        (item) => item.product_id === product_id && item.order_id === order_id
      );

      if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;

        const updatedItem = await dispatch(
          updateOrderItem({ id: existingItem.id, updates: { quantity: newQuantity } })
        ).unwrap();

        return updatedItem;
      }
       else {
        const newItem = await dispatch(
          addOrderItems([
            {
              product_id,
              order_id,
              quantity,
              price
            },
          ])
        ).unwrap();
// console.log('newItem'+JSON.stringify(newItem[0]));

        return newItem[0]; // لأن `addOrderItems` بيرجع array
      }
    } catch (error) {
      return rejectWithValue(error.message || "Failed to add or update order item");
    }
  }
);











// ✅ Initial state
const initialState = {
  orderItems: [],
  loading: false,
  error: null,
};

// ✅ Slice
const orderItemsSlice = createSlice({
  name: "order_items",
  initialState: {
    orderItems: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearOrderItems: (state) => {
      state.orderItems = [];
      state.error = null;
      state.loading = false;
    },
  },
extraReducers: (builder) => {
  builder
    .addCase(fetchOrderItems.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchOrderItems.fulfilled, (state, action) => {
      state.loading = false;
      state.orderItems = action.payload;
    })
    .addCase(fetchOrderItems.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // ✅ Add
    .addCase(addOrderItems.fulfilled, (state, action) => {
      state.orderItems.push(action.payload);
    })

    // ✅ Update
    .addCase(updateOrderItem.fulfilled, (state, action) => {
      const index = state.orderItems.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.orderItems[index] = action.payload;
      }
    })

        // ✅ Add or Update
    .addCase(addOrUpdateOrderItem.fulfilled, (state, action) => {
      const index = state.orderItems.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.orderItems[index] = action.payload;
      } else {
        state.orderItems.push(action.payload);
      }
    })


    // ✅ Delete
    .addCase(deleteOrderItem.fulfilled, (state, action) => {
      state.orderItems = state.orderItems.filter(item => item.id !== action.payload);
    });
}

});

export const { clearOrderItems } = orderItemsSlice.actions;
export default orderItemsSlice;
