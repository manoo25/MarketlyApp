
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "../Supabase";

// ✅ إضافة تقييم جديد
export const createRating = createAsyncThunk(
    "ratings/createRating",
    async ({ userId, rate, feed_back }, { rejectWithValue }) => {
        try {
            const { data, error } = await supabase
                .from("testimonials")
                .insert([{ user_id: userId, rate, feed_back }])
                .select()
                .single();

            if (error) throw error;
            return data;
        } catch (error) {
            console.log('Supabase Rating Error:', error);
            return rejectWithValue(error.message);
        }
    }
);

// ✅ جلب التقييمات للمستخدم
export const fetchUserRatings = createAsyncThunk(
    "ratings/fetchUserRatings",
    async (userId, { rejectWithValue }) => {
        try {
            const { data, error } = await supabase
                .from("testimonials")
                .select("*")
                .eq("user_id", userId);

            if (error) throw error;
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// ✅ Slice
const ratingsSlice = createSlice({
    name: "ratings",
    initialState: {
        ratings: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // إضافة تقييم جديد
            .addCase(createRating.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createRating.fulfilled, (state, action) => {
                state.loading = false;
                state.ratings.push(action.payload);
            })
            .addCase(createRating.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // جلب تقييمات المستخدم
            .addCase(fetchUserRatings.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserRatings.fulfilled, (state, action) => {
                state.loading = false;
                state.ratings = action.payload;
            })
            .addCase(fetchUserRatings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default ratingsSlice;
