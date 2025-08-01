import React, { useState, useEffect, useCallback, useRef } from "react";
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Alert,
    TextInput,
    Keyboard,
} from "react-native";
import { styles } from "../../../styles";
import {
    ArrowLeft2,
    Star,
    CloseCircle,
    LogoutCurve,
} from "iconsax-react-nativejs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Rating } from "react-native-ratings";
import Modal from 'react-native-modal';
import { InteractionManager } from 'react-native';
import Octicons from "@expo/vector-icons/Octicons";



// ✅ --- [الخطوة 1]: استيراد الـ Supabase client ---
import { supabase } from "../../Redux/Supabase";

import { logoutUser, updateCurrentUser } from "../../Redux/Slices/users";
import { createComplaint } from "../../Redux/Slices/Complaints";
import { createRating } from "../../Redux/Slices/Ratings";
import { PATHS } from "../../routes/Paths";
import ChatModal from "../ChatComponents/ChatModal";
import ToastMessage from "../GlobalComponents/ToastMessage";
// import CustomAlert from "../GlobalComponents/CustomAlert";

// ✅ --- [الخطوة 2]: تعريف ID الأدمن ---
const SUPPORT_ADMIN_ID = "a157b1db-54c3-46e3-968c-b3e0be6f6392";

function OptionsList() {
    const dispatch = useDispatch();
    const { replace } = useNavigation();
    const navigation = useNavigation();
    const [isCompModalVisible, setIsCompModalVisible] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [rating, setRating] = useState(0); // قيمة مبدئية
    const [modalType, setModalType] = useState(""); // complaint | rating
    const [savedInput, setSavedInput] = useState("");
    const [isChatVisible, setIsChatVisible] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [Message, setToastMessage] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    // const handleConfirm = () => {
    //     console.log('Confirmed!');
    //     setShowAlert(false);
    // };

    // ✅ --- [الخطوة 3]: إضافة state جديد لعدّاد الرسائل ---
    const [unreadCount, setUnreadCount] = useState(0);

    const usersState = useSelector(state => state.Users);
    const currentUser = usersState.currentUser;
    useEffect(() => {
        const fetchUserData = async () => {
            if (!currentUser) {
                try {
                    const userData = await AsyncStorage.getItem("userData");
                    if (userData) {
                        const parsedUser = JSON.parse(userData);
                        dispatch(updateCurrentUser(parsedUser));
                    }
                } catch (e) {
                    console.error("Failed to fetch user data from storage", e);
                }
            }
        };
        fetchUserData();
    }, [currentUser, dispatch]);

    const userId = currentUser && currentUser.id;


    const fetchUnreadCount = useCallback(async () => {
        if (!userId) return;

        const { count, error } = await supabase
            .from("UsersMessage")
            .select("*", { count: "exact", head: true })
            .eq("receiver_id", userId)
            .eq("sender_id", SUPPORT_ADMIN_ID)
            .is("read_at", null);

        if (error) {
            console.error("Error fetching unread count:", error.message);
        } else {
            setUnreadCount(count || 0);
        }
    }, [userId]);

    // ✅ --- [الخطوة 5]: useEffect لجلب العدد والاشتراك في التحديثات ---
    useEffect(() => {
        if (!userId) return;

        fetchUnreadCount();

        const channel = supabase
            .channel(`unread-counter-for-${userId}`)
            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "UsersMessage",
                    filter: `receiver_id=eq.${userId}`,
                },
                () => {
                    fetchUnreadCount();
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [userId, fetchUnreadCount]);

    // --- استعادة الدوال الأصلية ---
    const handleSave = () => {
        setSavedInput(inputValue);
        if (modalType === 'complaint') {
            if (userId) {
                dispatch(createComplaint({ userId, complaint: inputValue }));
                setToastMessage('تم حفظ الشكوى وسيتم التواصل معك في أقرب وقت')
                setShowToast(true);

            } else {
                
                Alert.alert('خطأ', 'لم يتم العثور على المستخدم');
            }
        } else if (modalType === 'rating') {
            if (userId) {
              
                dispatch(createRating({ userId, feed_back: inputValue, rate: rating }));
                 setToastMessage('تم إرسال تقييمك وشكرا لك ')
                setShowToast(true);
              
            } else {
               
                Alert.alert('خطأ', 'لم يتم العثور على المستخدم');
            }
        }
        setInputValue('');
        setIsCompModalVisible(false);
    };

    const handleRatingCompleted = (rating) => {
       
        setRating(rating);
    };


    const inputRef = useRef(null);

    useEffect(() => {
        if (isCompModalVisible) {
            InteractionManager.runAfterInteractions(() => {
                inputRef.current?.focus();
            });
        }
    }, [isCompModalVisible]);

   
    const handleLogout = async () => {
        await AsyncStorage.removeItem("userData");
        dispatch(logoutUser());
        replace(PATHS.Login);
    };

    const handleOptionPress = (item) => {
        if (item.id === "1") {
            navigation.navigate(PATHS.AccountDetails);
        } else if (item.id === "2") {
            navigation.navigate(PATHS.ChangePassword);
        } else if (item.id === "3") {
            setModalType("complaint");
            setIsCompModalVisible(true);
        } else if (item.id === "4") {
            setModalType("rating");
            setIsCompModalVisible(true);
        } else if (item.id === "5") {
            setIsChatVisible(true);
        }
    };

    const settings = [
        { id: "1", title: "بيانات الحساب" },
        { id: "2", title: "تغيير كلمة السر" },
        { id: "3", title: "ارسال شكوى" },
        { id: "4", title: "تقييم الخدمة" },
        { id: "5", title: "الشات مع الدعم" },
        { id: "6", title: "اللغة", value: "العربية" },
    ];

    const RenderItem = ({ item, onPress }) => (
        <TouchableOpacity style={style.item} onPress={onPress}>
            <View style={style.textContainer}>
                <View style={style.titleContainer}>
                    <Text style={[style.title, styles.h4]}>{item.title}</Text>
                    {item.id === "6" && unreadCount > 0 && (
                        <View style={style.badgeContainer}>
                            <Text style={style.badgeText}>{unreadCount}</Text>
                        </View>
                    )}
                </View>
                <View>
                    {item.value && (
                        <Text style={[style.value, styles.h5]}>{item.value}</Text>
                    )}
                </View>
            </View>
            <ArrowLeft2 size="24" color="#424047" />
        </TouchableOpacity>
    );

    return (
        <>
         <View >
 <ToastMessage
                visible={showToast}
                message={Message}
                onHide={() => setShowToast(false)}
            />
         </View>
         <View style={style.container}>
            
            <FlatList
                data={settings}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <RenderItem item={item} onPress={() => handleOptionPress(item)} />
                )}
                ItemSeparatorComponent={() => <View style={style.separator} />}
            />
            <View style={style.separator} />
            <TouchableOpacity
                style={[style.logout, { alignSelf: "flex-end" }]}
                onPress={() =>
                    Alert.alert("تأكيد", "هل تريد تسجيل الخروج؟", [
                        { text: "إلغاء", style: "cancel" },
                        { text: "تأكيد", onPress: handleLogout },
                    ])
                }
            >
                <LogoutCurve size="20" color="#ee3030" />
                <Text style={[styles.h3, style.logoutText]}>تسجيل خروج</Text>
            </TouchableOpacity>

            {/* --- استعادة مودال الشكاوى والتقييم --- */}
            <Modal
                isVisible={isCompModalVisible}
                onBackdropPress={() => setIsCompModalVisible(false)}
                onBackButtonPress={() => setIsCompModalVisible(false)}
                style={style.modalBottom}
                swipeDirection="down"
                onSwipeComplete={() => setIsCompModalVisible(false)}
                backdropOpacity={0.4}
                animationIn="slideInUp"
                animationOut="slideOutDown"
                avoidKeyboard
            >
                <View style={style.modalView}>
                    <Octicons name="dash" size={60} color="#dbdbdb" style={styles.icon} />
                    <View style={{ flexDirection: 'row-reverse', width: '90%', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={style.modalTitle}>
                            {modalType === 'complaint' ? 'أضف شكوتك' : 'قيّم الخدمة'}
                        </Text>
                        <TouchableOpacity
                            style={{ marginRight: -16, marginTop: -16 }}
                            onPress={() => {
                                setIsCompModalVisible(false);
                                setInputValue('');
                            }}>
                            <CloseCircle size="32" color="#424047" />
                        </TouchableOpacity>
                    </View>

                    {modalType === 'rating' ? (
                        <View style={{ alignItems: 'center', marginBottom: 16 }}>
                            <Text style={[styles.h4, { marginRight: 8 }]}>تقييم الخدمة</Text>
                            <Rating
                                showRating={false}
                                onFinishRating={handleRatingCompleted}
                                style={{ paddingVertical: 10 }}
                            />
                        </View>
                    ) : null}

                    <TextInput
                        ref={inputRef}
                        style={style.textInput}
                        onChangeText={setInputValue}
                        value={inputValue}
                        placeholder={modalType === 'complaint' ? 'اكتب شكوتك هنا...' : 'اكتب تقييمك أو رأيك هنا...'}
                        multiline={true}
                        numberOfLines={4}
                    />

                    <View style={style.buttonContainer}>
                        <TouchableOpacity
                            style={[style.modalButton, style.buttonSave]}
                            onPress={handleSave}>
                            <Text style={style.buttonText}>حفظ</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <ChatModal
                visible={isChatVisible}
                onClose={() => setIsChatVisible(false)}
            />
          
           
          
            {/* <CustomAlert
                visible={showAlert}
                title=" تأكيد "
                message="هل انت متأكد من الارسال"
                onClose={() => setShowAlert(false)}
                onConfirm={handleConfirm}
            /> */}
        </View>
        </>
       
    );
}

const style = StyleSheet.create({
    container: { padding: 16 },
    item: {
        flexDirection: "row-reverse",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 14,
        marginTop: 4,
    },
    textContainer: {
        width: "90%",
        flexDirection: "row-reverse",
        alignItems: "center",
        justifyContent: "space-between",
    },
    titleContainer: { flexDirection: "row-reverse", alignItems: "center" },
    title: { fontSize: 16, color: "#333" },
    value: { fontSize: 14, color: "#999" },
    separator: { height: 1, backgroundColor: "#eee" },
    logout: {
        flexDirection: "row-reverse",
        alignItems: "center",
        alignSelf: "flex-start",
        marginTop: 16,
        gap: 6,
    },
    logoutText: { color: "#ee3030", fontSize: 16 },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 20,
        paddingLeft: 35,
        paddingRight: 35,
        paddingBottom: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '100%',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'right',
        width: '100%',
    },
    textInput: {
        width: '100%',
        height: 100,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
        textAlignVertical: 'top',
        textAlign: 'right',
    },
    buttonContainer: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-around',
        width: '100%',
    },
    modalButton: {
        borderRadius: 10,
        padding: 10,
        elevation: 2,
        width: '45%',
        alignItems: 'center',
    },
    buttonSave: {
        backgroundColor: '#327AFF',
    },
    buttonCancel: {
        backgroundColor: '#f44336',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalBottom: {
        justifyContent: 'flex-end',
        margin: 0,
    },

    buttonSave: { backgroundColor: "#327AFF" },
    buttonText: { color: "white", fontWeight: "bold", textAlign: "center" },
    badgeContainer: {
        backgroundColor: "#327AFF",
        borderRadius: 12,
        minWidth: 24,
        height: 24,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
        paddingHorizontal: 6,
    },
    badgeText: { color: "white", fontSize: 12, fontWeight: "bold" },
});

export default OptionsList;