import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../Supabase"; // غير المسار حسب مشروعك
import { v5 as uuidv5 } from "uuid";

const NAMESPACE = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";
const SUPPORT_ADMIN_ID = "a157b1db-54c3-46e3-968c-b3e0be6f6392";
const SUPPORT_ADMIN_ROLE = "admin";

export function buildConversationId(id1, id2) {
  const sorted = [id1, id2].sort();
  return uuidv5(`${sorted[0]}-${sorted[1]}`, NAMESPACE);
}

// export const sendMessage = createAsyncThunk(
//   "messages/sendMessage",
//   async ({ receiverIds, content, receiverRole }, thunkAPI) => {
//     try {
//       const state = thunkAPI.getState();
//       const senderId = state.Token.token;
//       const UserRole = state.Token.UserRole;

//       if (!senderId || !UserRole)
//         throw new Error("❌ لا يوجد مستخدم مسجل دخول");

//       const isAdmin = UserRole === "admin";
//       const logicalSenderId = isAdmin ? "admin" : senderId;
//       const physicalSenderId = isAdmin ? SUPPORT_ADMIN_ID : senderId;
//       const physicalSenderRole = isAdmin ? SUPPORT_ADMIN_ROLE : UserRole;

//       const inserts = receiverIds.map((rid) => {
//         let actualReceiverRole = receiverRole;
//         if (!actualReceiverRole) {
//           const receiver = state.Users.users.find((u) => u.id === rid);
//           actualReceiverRole = receiver?.role || "user";
//         }

//         const receiverLogical = actualReceiverRole === "admin" ? "admin" : rid;
//         const conversation_id = buildConversationId(
//           logicalSenderId,
//           receiverLogical
//         );

//         return {
//           conversation_id,
//           sender_id: physicalSenderId,
//           receiver_id: rid,
//           content,
//           sender_role: physicalSenderRole,
//           receiver_role: actualReceiverRole,
//           actual_sender_id: physicalSenderId,
//         };
//       });

//       const { error } = await supabase.from("UsersMessage").insert(inserts);
//       if (error) throw error;

//       return inserts.length;
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.message);
//     }
//   }
// );

export const sendMessage = createAsyncThunk(
  "messages/sendMessage",
  async (
    { senderId, senderRole, receiverIds, content, receiverRole },
    thunkAPI
  ) => {
    // console.log("🔥 sendMessage started:", {
    //   senderId,
    //   senderRole,
    //   receiverIds,
    //   content,
    //   receiverRole,
    // });

    try {
      if (!senderId || !senderRole) {
        throw new Error("❌ Sender info is missing from props");
      }

    //   const inserts = receiverIds.map((receiverId) => ({
    //     conversation_id: buildConversationId(senderId, receiverId),
    //     sender_id: senderId,
    //     sender_role: senderRole,
    //     receiver_id: receiverId,
    //     receiver_role: receiverRole,
    //     actual_sender_id:senderId,
    //     content,
    //   }));

        const inserts = receiverIds.map((receiverId) => {
          const logicalSenderId = senderRole === "admin" ? "admin" : senderId;
          const logicalReceiverId =
            receiverRole === "admin" ? "admin" : receiverId;

          return {
            conversation_id: buildConversationId(
              logicalSenderId,
              logicalReceiverId
            ),
            sender_id: senderId,
            sender_role: senderRole,
            receiver_id: receiverId,
            receiver_role: receiverRole,
            actual_sender_id: senderId,
            content,
          };
        });

      const { data, error } = await supabase
        .from("UsersMessage")
        .insert(inserts);

      if (error) {
        console.log("❌ Supabase insert error:", error);
        return thunkAPI.rejectWithValue(error.message);
      }

    //   console.log("✅ Message inserted:", data);
      return data;
    } catch (err) {
      console.log("❌ Catch error:", err.message);
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);


// export const fetchMessages = createAsyncThunk(
//   "messages/fetchMessages",
//   async ({ userId: otherUserId, otherUserRole }, thunkAPI) => {
//     try {
//       const state = thunkAPI.getState();
//       const myUserId = state.Token.token;
//       const myRole = state.Token.UserRole;

//       if (!myUserId || !myRole) throw new Error("❌ لا يوجد مستخدم مسجل دخول");

//       const myLogicalId = myRole === "admin" ? "admin" : myUserId;
//       let finalOtherLogicalId =
//         otherUserRole === "admin" ? "admin" : otherUserId;

//       if (otherUserRole === "admin") {
//         const { data: adminUser, error: adminError } = await supabase
//           .from("users")
//           .select("id")
//           .eq("role", "admin")
//           .single();

//         if (adminError || !adminUser)
//           throw new Error("❌ لم يتم العثور على مستخدم الأدمن");

//         finalOtherLogicalId = adminUser.id;
//       }

//       const conversation_id = buildConversationId(
//         myLogicalId,
//         finalOtherLogicalId
//       );

//       const { data, error } = await supabase
//         .from("UsersMessage")
//         .select("*")
//         .eq("conversation_id", conversation_id)
//         .order("created_at", { ascending: true });

//       if (error) throw error;

//       const unreadMessages = data.filter(
//         (msg) =>
//           msg.receiver_id === myUserId &&
//           !msg.read_at &&
//           msg.sender_role === otherUserRole
//       );

//       if (unreadMessages.length > 0) {
//         const unreadMessageIds = unreadMessages.map((msg) => msg.id);
//         await supabase
//           .from("UsersMessage")
//           .update({ read_at: new Date().toISOString() })
//           .in("id", unreadMessageIds);
//       }

//       return data;
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.message);
//     }
//   }
// );


export const fetchMessages = createAsyncThunk(
  "messages/fetchMessages",
  async (
    {
      myUserId, // المستخدم الحالي الحقيقي (uuid)
      myRole, // "admin" أو "trader"
      otherUserId, // الطرف الآخر
      otherUserRole, // "admin" أو "trader"
    },
    thunkAPI
  ) => {
    try {
      if (!myUserId || !myRole) {
        throw new Error("❌ لا يوجد مستخدم مسجل دخول");
      }

      const myLogicalId = myRole === "admin" ? "admin" : myUserId;
      const finalOtherLogicalId =
        otherUserRole === "admin" ? "admin" : otherUserId;

      const conversation_id = buildConversationId(
        SUPPORT_ADMIN_ROLE,
        myLogicalId
      );
    //   console.log("🔑 Final conversation_id used in query:", conversation_id);

    //   console.log("💬 fetching for conversation_id:", conversation_id);
    //   console.log("🧠 Params:", {
    //     myUserId,
    //     myRole,
    //     otherUserId,
    //     otherUserRole,
    //   });
      const { data, error } = await supabase
        .from("UsersMessage")
        .select("*")
        .eq("conversation_id", conversation_id)
        .order("created_at", { ascending: true });
    //   console.log("📦 Messages fetched:", data);
      if (error) throw error;

      const finalOtherId =
        otherUserRole === "admin" ? SUPPORT_ADMIN_ID : otherUserId;

      const unreadMessages = data.filter(
        (msg) =>
          msg.receiver_id === myUserId &&
          !msg.read_at &&
          msg.sender_role === otherUserRole &&
          msg.sender_id === finalOtherId
      );

      if (unreadMessages.length > 0) {
        const unreadMessageIds = unreadMessages.map((msg) => msg.id);
        await supabase
          .from("UsersMessage")
          .update({ read_at: new Date().toISOString() })
          .in("id", unreadMessageIds);
      }

      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const messagesSlice = createSlice({
  name: "messages",
  initialState: {
    loading: false,
    error: null,
    success: false,
    messages: [],
  },
  reducers: {
    resetStatus: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetStatus, addMessage } = messagesSlice.actions;
export default messagesSlice;
