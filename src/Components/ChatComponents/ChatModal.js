import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Modal,
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchMessages, sendMessage } from "../../Redux/Slices/messagesSlice";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "../../Redux/Supabase";
import FontAwesome from '@expo/vector-icons/FontAwesome';
const SUPPORT_ADMIN_ID = "a157b1db-54c3-46e3-968c-b3e0be6f6392";
const SUPPORT_ADMIN_ROLE = "admin";

export default function ChatModal({ visible, onClose }) {
  const dispatch = useDispatch();
  const flatListRef = useRef(null);

  const messages = useSelector((state) => state.messages.messages);
  const [newMessage, setNewMessage] = useState("");
  const [userId, setUserId] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [ready, setReady] = useState(false);

  // [1] التأثير الأول: جلب بيانات المستخدم وجلب الرسائل عند فتح المودال
  useEffect(() => {
    const fetchUserInfoAndMessages = async () => {
      if (visible) {
        // ✅ لن يعمل إلا عند فتح المودال
        setReady(false);
        try {
          const stored = await AsyncStorage.getItem("userData");
          if (stored) {
            const parsed = JSON.parse(stored);
            setUserId(parsed.id);
            setUserRole(parsed.role);

            if (parsed.id && parsed.role) {
              // جلب الرسائل الموجودة حالياً
              await dispatch(
                fetchMessages({
                  myUserId: parsed.id,
                  myRole: parsed.role,
                  otherUserId: SUPPORT_ADMIN_ID,
                  otherUserRole: SUPPORT_ADMIN_ROLE,
                })
              );
            }
          }
        } catch (error) {
          console.log("Error loading user data:", error);
        } finally {
          setReady(true);
        }
      }
    };

    fetchUserInfoAndMessages();
  }, [visible]); // ✅ يعتمد على 'visible' فقط

  // [2] التأثير الثاني: الاشتراك في رسائل Supabase الجديدة (فقط عندما يكون المودال مرئيًا)
  useEffect(() => {
    // إذا كان المودال مغلقًا أو لا يوجد مستخدم، لا تقم بالاشتراك
    if (!visible || !userId) {
      return;
    }

    const channel = supabase
      .channel(`chat-for-user-${userId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "UsersMessage",
          filter: `receiver_id=eq.${userId}`,
        },
        (payload) => {
          dispatch(
            fetchMessages({
              myUserId: userId,
              myRole: userRole,
              otherUserId: SUPPORT_ADMIN_ID,
              otherUserRole: SUPPORT_ADMIN_ROLE,
            })
          );
        }
      )
      .subscribe();

    // console.log(`✅ Subscribed to channel: chat-for-user-${userId}`);

    // دالة التنظيف: إلغاء الاشتراك عند إغلاق المودال
    return () => {
      supabase.removeChannel(channel);

    };
  }, [visible, userId, userRole]); // ✅ يعتمد على 'visible' و 'userId'

  // [3] التأثير الثالث: تحديث الرسائل كـ "مقروءة" بعد جلبها (فقط عندما يكون المودال مرئيًا)
  useEffect(() => {
    const markAdminMessagesAsRead = async () => {
      // شرط مزدوج للتأكيد
      if (!visible || !userId || messages.length === 0) {
        return;
      }

      const unreadFromAdmin = messages.filter(
        (msg) =>
          msg.sender_id === SUPPORT_ADMIN_ID &&
          msg.receiver_id === userId &&
          !msg.read_at
      );

      if (unreadFromAdmin.length > 0) {
        const messageIds = unreadFromAdmin.map((msg) => msg.id);
        // console.log(`Marking ${messageIds.length} messages as read.`);
        await supabase
          .from("UsersMessage")
          .update({ read_at: new Date().toISOString() })
          .in("id", messageIds);
      }
    };

    markAdminMessagesAsRead();
  }, [messages, visible, userId]); // ✅ يعتمد على 'messages' و 'visible'

  // التأثير الرابع: التمرير لأسفل عند وصول رسالة جديدة
  // التأثير الرابع: التمرير لأسفل عند وصول رسالة جديدة
  //   useEffect(() => {
  //     if (ready && flatListRef.current) {
  //       // ✅ إضافة تأخير بسيط لإعطاء الـ FlatList فرصة كاملة للرسم
  //       setTimeout(() => {
  //         flatListRef.current?.scrollToEnd({ animated: true });
  //       }, 100); // 100 ميلي ثانية كافية جدًا
  //     }
  //   }, [messages, ready]);

  const handleSend = async () => {
    if (newMessage.trim() === "" || !userId || !userRole) return;
    await dispatch(
      sendMessage({
        senderId: userId,
        senderRole: userRole,
        receiverIds: [SUPPORT_ADMIN_ID],
        receiverRole: SUPPORT_ADMIN_ROLE,
        content: newMessage,
      })
    );
    dispatch(
      fetchMessages({
        myUserId: userId,
        myRole: userRole,
        otherUserId: SUPPORT_ADMIN_ID,
        otherUserRole: SUPPORT_ADMIN_ROLE,
      })
    );
    setNewMessage("");
  };

  const formatMessageTime = (timeStr) => {
    const date = new Date(timeStr);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const renderItem = ({ item }) => {
    const isUser = item.sender_id === userId;
    const isRead = !!item.read_at;

    return (
      <View
        style={[
          chatStyle.messageWrapper,
          {
            justifyContent: isUser ? "flex-end" : "flex-start",
            alignItems: "flex-end",
          },
        ]}
      >
        {!isUser && (
          <Image
            source={require("../../../assets/imgs/supportChat.png")}
            style={chatStyle.avatar}
          />
        )}
        <View
          style={[
            chatStyle.messageBubble,
            isUser ? chatStyle.user : chatStyle.admin,
          ]}
        >
          <Text style={chatStyle.messageText}>{item.content}</Text>
          <View style={chatStyle.metaRow}>
            {isUser && (
              <Text
                style={{
                  color: isRead ? "blue" : "gray",
                  marginRight: 6,
                  fontSize: 11,
                }}
              >
                ✔✔
              </Text>
            )}
            <Text style={chatStyle.metaText}>
              {formatMessageTime(item.created_at)}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={chatStyle.centeredView}
      >
        <View style={chatStyle.modalView}>
          <View style={chatStyle.header}>
            <Text style={chatStyle.modalTitle}>التواصل مع الدعم</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={28} color="#000" />
            </TouchableOpacity>
          </View>

          {!ready ? (
            <Text style={{ textAlign: "center", flex: 1, marginTop: 20 }}>
              جاري تحميل المحادثة...
            </Text>
          ) : (
            <>
              {/* <FlatList
                ref={flatListRef}
                data={messages}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                contentContainerStyle={{
                  flexGrow: 1,
                  justifyContent: "flex-end",
                  paddingVertical: 10,
                }}
                showsVerticalScrollIndicator={false}
              /> */}
              <FlatList
                ref={flatListRef}
                data={messages}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                contentContainerStyle={{
                  flexGrow: 1,
                  justifyContent: "flex-end",
                  paddingVertical: 10,
                }}
                showsVerticalScrollIndicator={false}
                // ✅ --- هذا هو السطر الجديد والحل النهائي ---
                onContentSizeChange={() =>
                  ready && flatListRef.current?.scrollToEnd({ animated: false })
                }
              />
              <View style={chatStyle.inputRow}>
                <TextInput
                  style={chatStyle.textInput}
                  placeholder="اكتب رسالتك هنا..."
                  value={newMessage}
                  onChangeText={setNewMessage}
                />
                <TouchableOpacity
                  onPress={handleSend}
                  style={chatStyle.sendButton}
                >
                  <FontAwesome name="send" size={20} color="#fff" />
                  {/* <Ionicons name="send" size={20} color="" /> */}
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const chatStyle = StyleSheet.create({
  // ... نفس الـ styles بتاعتك مع إضافة بسيطة
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 6,
    marginBottom: 10,
  },
  //...
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 16,
    width: "90%",
    height: "80%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  modalTitle: { fontSize: 18, fontWeight: "bold" },
  textInput: {
    flex: 1,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 40,
    textAlign: "right",
  },
  inputRow: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  sendButton: {
    backgroundColor: "#327AFF",
    borderRadius: 10,
    padding: 8,
    marginRight: 8,
  },
  messageBubble: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 4,
    maxWidth: "80%",
  },
  user: { backgroundColor: "#dff3ff", alignSelf: "flex-end" },
  admin: { backgroundColor: "#eee", alignSelf: "flex-start" },
  messageText: { textAlign: "right" },
  messageWrapper: {
    flexDirection: "row",
    marginVertical: 4,
    alignItems: "center",
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 5,
  },
  metaText: { fontSize: 10, color: "gray" },
});
