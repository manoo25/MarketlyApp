import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "../Supabase";
import { Alert, Linking } from "react-native";

// ✅ تسجيل دخول يدوي من جدول users
export const UserLogin = createAsyncThunk(
  "users/UserLogin",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", email)
        .eq("password", password)
        .single();

      if (error || !data) throw new Error("البريد أو كلمة المرور غير صحيحة");

      if (data.role === 'trader' || data.role === 'admin') {
        Alert.alert(
          "غير مسموح",
          "ليس لديك صلاحية للتسجيل هنا",
          [
            {
              text: "تسجيل للوحة التحكم",
              onPress: () => {
                Linking.openURL("https://trendify-umber.vercel.app/");
              },
            },
            {
              text: "إلغاء",
              style: "cancel",
            },
          ],
          { cancelable: true }
        );
        return;
      }
      else if (data.isBlocked) {
        Alert.alert('تنبيه!!!', 'لا يمكنك تسجيل الدخول لأن حسابك محظور.');
        return;
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const UserRegister = createAsyncThunk(
  "users/UserRegister",
  async (userData, { rejectWithValue }) => {
    try {
      // ✅ التحقق من البريد داخل جدول users فقط
      const { data: existingUser, error: checkError } = await supabase
        .from("users")
        .select("id")
        .eq("email", userData.email)
        .maybeSingle();

      if (checkError) throw checkError;
      if (existingUser) throw new Error("هذا البريد مسجل مسبقًا.");

      // ✅ 1. تسجيل المستخدم في Supabase Auth (signUp)
      const { user, error: signUpError } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          emailRedirectTo: '', // سيبه فاضي، علشان ما يبعتش رابط تفعيل
        },
      });

      if (signUpError) throw signUpError;

      // ✅ 2. حفظ بيانات المستخدم في جدول users
      const { data, error } = await supabase
        .from("users")
        .insert(userData)
        .select()
        .single();

      if (error) throw error;

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


// ✅ جلب المستخدمين
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase.from("users").select("*");
      if (error) throw error;
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ✅ جلب ID مستخدم بناءً على البريد الإلكتروني
export const fetchUserIdByEmail = createAsyncThunk(
  "users/fetchUserIdByEmail",
  async (email, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("id")
        .eq("email", email)
        .single(); // نتوقع مستخدم واحد فقط

      if (error) throw error;

      return data.id; // يرجع الـ ID فقط
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


// ✅ تحديث مستخدم
export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("users")
        .update(updatedData)
        .eq("id", id)
        .select();
      if (error) throw error;
      return data[0];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ✅ حذف مستخدم
export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      const { error } = await supabase.from("users").delete().eq("id", id);
      if (error) throw error;
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ✅ تغيير كلمة المرور
export const changePassword = createAsyncThunk(
  "users/changePassword",
  async ({ userId, currentPassword, newPassword }, { rejectWithValue }) => {
    try {
      // التحقق من كلمة المرور الحالية
      const { data: user, error: checkError } = await supabase
        .from("users")
        .select("password")
        .eq("id", userId)
        .single();

      if (checkError) throw new Error("خطأ في جلب بيانات المستخدم");
      if (!user) throw new Error("المستخدم غير موجود");
      if (user.password !== currentPassword) throw new Error("كلمة المرور الحالية غير صحيحة");

      // تحديث كلمة المرور الجديدة
      const { data, error } = await supabase
        .from("users")
        .update({ password: newPassword })
        .eq("id", userId)
        .select();

      if (error) throw error;
      return data[0];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ✅ Slice
const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    currentUser: null,
    loading: false,
    error: null,
  },
  reducers: {
    logoutUser(state) {
      state.currentUser = null;
    },
    updateCurrentUser(state, action) {
      state.currentUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      // 🔐 تسجيل دخول
      .addCase(UserLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UserLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(UserLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 📝 تسجيل مستخدم جديد
      .addCase(UserRegister.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UserRegister.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
        state.currentUser = action.payload;

      })
      .addCase(UserRegister.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 👥 جلب المستخدمين
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✏️ تحديث
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex((u) => u.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.payload;
      })

      // 🗑️ حذف
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((u) => u.id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.error = action.payload;
      })

      // 🔐 تغيير كلمة المرور
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logoutUser, updateCurrentUser } = usersSlice.actions;
export default usersSlice;
