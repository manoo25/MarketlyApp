import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "../Supabase";



// ✅ تسجيل شكوى جديدة
export const createComplaint = createAsyncThunk(
    "complaints/createComplaint",
    async ({ userId, complaint }, { rejectWithValue }) => {
        try {
        const { data, error } = await supabase
            .from("complaints")
            .insert([{ user_id: userId, complaint }])
            .select()
            .single();
    
        if (error) throw error;
    
        return data;
        } catch (error) {
        return rejectWithValue(error.message);
        }
    }
    );



// ✅ جلب الشكاوى للمستخدم
export const fetchUserComplaints = createAsyncThunk(
    "complaints/fetchUserComplaints",
    async (userId, { rejectWithValue }) => {
        try {
            const { data, error } = await supabase
                .from("complaints")
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
const complaintsSlice = createSlice({
    name: "complaints",
    initialState: {
        complaints: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // إنشاء شكوى جديدة
            .addCase(createComplaint.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createComplaint.fulfilled, (state, action) => {
                state.loading = false;
                state.complaints.push(action.payload);
            })
            .addCase(createComplaint.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // جلب شكاوى المستخدم
            .addCase(fetchUserComplaints.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserComplaints.fulfilled, (state, action) => {
                state.loading = false;
                state.complaints = action.payload;
            })
            .addCase(fetchUserComplaints.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default complaintsSlice;


