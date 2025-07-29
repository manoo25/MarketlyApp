import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert , Modal , TextInput } from 'react-native';
import { styles } from '../../../styles';
import { ArrowLeft2 } from 'iconsax-react-nativejs';
import { LogoutCurve } from 'iconsax-react-nativejs';
import { logoutUser } from "../../Redux/Slices/users";
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PATHS } from '../../routes/Paths';
import React, { useState } from 'react';
import { CloseCircle } from 'iconsax-react-nativejs';
import { createComplaint , fetchUserComplaints } from '../../Redux/Slices/Complaints';








const settings = [
    { id: '1', title: 'بيانات الحساب' },
    { id: '2', title: 'تغيير كلمة المرور' },
    { id: '3', title: 'ارسال شكوى' },
    { id: '4', title: 'تقييم الخدمة' },
    { id: '5', title: 'اللغة', value: 'العربية' },
];





function OptionsList() {



    const dispatch = useDispatch();
    const { replace } = useNavigation();
    const navigation = useNavigation();
    const [isCompModalVisible, setIsCompModalVisible] = useState(false);
    const [complaint, setComplaint] = useState('');
    const [savedComplaint, setSavedComplaint] = useState('');

    const handleSaveComplaint = () => {
        // هنا يمكنك فعل أي شيء بالملاحظات (مثل إرسالها إلى API، تخزينها في Redux، إلخ)
        setSavedComplaint(complaint); // نحفظ الملاحظات في حالة مؤقتة للعرض هنا
        dispatch(createComplaint({ userId: '', complaint })); // استبدل '123' بمعرف المستخدم الفعلي
        setComplaint(''); // مسح الملاحظات بعد الحفظ
        setIsCompModalVisible(false); // إخفاء الـ Modal
        Alert.alert('تم حفظ الملاحظات', `ملاحظاتك: ${complaint}`); // تأكيد للمستخدم
    };






    const handleLogout = async () => {
        await AsyncStorage.removeItem('userData');
        dispatch(logoutUser());
        replace(PATHS.Login);
    };

    const handleOptionPress = (item) => {
        if (item.id === "1") {
            navigation.navigate(PATHS.AccountDetails);
        } else if (item.id === "2") {
            navigation.navigate(PATHS.ChangePassword);
        }
        else if (item.id === "3") {
            setIsCompModalVisible(true); // إخفاء الـ Modal بدون حفظ
        }
        else if (item.id === "4") {
            setIsRatingModalVisible(true); // إخفاء الـ Modal بدون حفظ
        }
    };



    const RenderItem = ({ item, onPress }) => (
        <TouchableOpacity style={style.item} onPress={onPress}>
            <View style={style.textContainer}>
                <View>
                    <Text style={[style.title, styles.h4]}>{item.title}</Text>
                </View>

                <View>
                    {item.value && <Text style={[style.value, styles.h5]}>{item.value}</Text>}
                </View>
            </View>
            <ArrowLeft2 size="24" color="#424047" />
        </TouchableOpacity>
    );


    return (
        <View style={style.container}>
            <FlatList
                data={settings}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <RenderItem item={item} onPress={() => handleOptionPress(item)} />
                )}
                ItemSeparatorComponent={() => <View style={style.separator} />}
            />
            <View style={style.separator} />
            <TouchableOpacity style={[style.logout, { alignSelf: 'flex-end' }]} onPress={() => Alert.alert('تأكيد', 'هل تريد تسجيل الخروج؟', [
                { text: 'إلغاء', style: 'cancel' },
                { text: 'تأكيد', onPress: handleLogout }])}>
                <LogoutCurve size="20" color="#ee3030" />
                <Text style={[styles.h3, style.logoutText]}>تسجيل خروج</Text>
            </TouchableOpacity>
            {/* Complaints Modal */}
            <Modal
                animationType="slide" // تأثير ظهور من الأسفل
                transparent={true} // يجعل الخلفية شفافة
                visible={isCompModalVisible} // يتحكم في ظهوره أو إخفائه
                onRequestClose={() => {
                    // يمكن استخدام هذا في الأندرويد للتحكم في زر الرجوع بالجهاز
                    setIsCompModalVisible(!isCompModalVisible);
                }}>

                <View style={style.centeredView}>
                    <View style={style.modalView}>
                        <View style={{ flexDirection: 'row-reverse', width: '90%', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={style.modalTitle}>أضف شكوتك</Text>
                            <TouchableOpacity
                                style={{ marginRight: -16, marginTop: -16 }}
                                onPress={() => {
                                    setIsCompModalVisible(false); // إخفاء الـ Modal بدون حفظ
                                    setComplaint(''); // مسح أي ملاحظات مكتوبة عند الإلغاء
                                }}>
                                <CloseCircle size="32" color="#424047" />
                            </TouchableOpacity>
                        </View>
                        <TextInput
                            style={style.textInput}
                            onChangeText={setComplaint} // تحديث حالة الملاحظات مع كل تغيير
                            value={complaint} // عرض القيمة الحالية للملاحظات
                            placeholder="اكتب ملاحظاتك هنا..."
                            multiline={true} // السماح بعدة أسطر
                            numberOfLines={4} // عدد الأسطر الافتراضي
                        />
                        <View style={style.buttonContainer}>
                            <TouchableOpacity
                                style={[style.modalButton, style.buttonSave]}
                                onPress={handleSaveComplaint}>
                                <Text style={style.buttonText}>حفظ</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

        </View>
    );
}


const style = StyleSheet.create({
    container: {
        padding: 16,
    },
    item: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 14,
        marginTop: 4,
    },
    textContainer: {
        width: '90%',
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 16,
        color: '#333',
    },
    value: {
        fontSize: 14,
        color: '#999',

    },
    separator: {
        height: 1,
        backgroundColor: '#eee',
    },
    logout: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        alignSelf: 'flex-start',
        marginTop: 16,
        gap: 6,
    },
    logoutText: {
        color: '#ee3030',
        fontSize: 16,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '80%',
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
});

export default OptionsList