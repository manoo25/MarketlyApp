import React, { useEffect, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { styles } from '../../styles';
import { User } from 'iconsax-react-nativejs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import OptionsList from '../Components/UserOptionsComponents/OptionsList';
import ImageModal from '../Components/UserOptionsComponents/ImageModal';





function UserOptions({ navigation }) {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.Users.currentUser);
    const [user, setUser] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    // إعادة جلب بيانات المستخدم عند التركيز على الصفحة
    useFocusEffect(
        React.useCallback(() => {
            const fetchUser = async () => {
                // استخدم currentUser من Redux أولاً، ثم AsyncStorage كـ fallback
                if (currentUser) {
                    setUser(currentUser);
                } else {
                    const userData = await AsyncStorage.getItem('userData');
                    if (userData) {
                        setUser(JSON.parse(userData));
                    }
                }
            };
            fetchUser();
        }, [currentUser]) // أضف currentUser كـ dependency
    );

    // تحديث user state عند تغيير currentUser
    useEffect(() => {
        if (currentUser) {
            setUser(currentUser);
        }
    }, [currentUser]);

    // دالة إغلاق المودال مع تحديث البيانات
    const handleCloseModal = () => {
        setModalVisible(false);
        // تحديث البيانات من Redux state
        if (currentUser) {
            setUser(currentUser);
        }
    };











    return (
        <View style={style.container}>
            {/* الهيدر */}
            <View style={{ alignItems: 'center', marginTop: 60, marginBottom: 16 }}>
                <View style={{ width: '100%', alignItems: 'flex-end' }}>
                    <View style={{ flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'flex-end' }}>
                        {/* <TouchableOpacity onPress={() => navigation.goBack()}>
                            <ArrowRight2 size="32" color="#424047" />
                        </TouchableOpacity> */}
                        <Text style={[styles.h3, { textAlign: 'right', marginRight: 8, paddingBottom: 7 }]}>الحساب</Text>
                    </View>
                </View>
            </View>
            {/* محتوى الصفحة */}
            <View style={style.container}>
                <View style={{ flexDirection: 'row-reverse', alignItems: 'center' }}>
                    {user?.image ? (
                        <TouchableOpacity
                            style={{ width: 55, alignItems: 'center', justifyContent: 'center', backgroundColor: '#EBF2FF', borderRadius: 50, height: 55 }}
                            onPress={() => setModalVisible(true)}
                        >
                            <Image source={{ uri: user.image }} style={{ width: 55, height: 55, borderRadius: 50 }} />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity style={{ width: 55, alignItems: 'center', justifyContent: 'center', backgroundColor: '#EBF2FF', borderRadius: 50, height: 55 }}
                        onPress={() => setModalVisible(true)} >
                            <User size="32" color="#327AFF" />
                        </TouchableOpacity>
                    )}
                    <View style={{ width: '80%', marginRight: 8 }}>
                        {/* user.name */}
                        <Text style={[styles.h3, { textAlign: 'right', marginRight: 8, paddingBottom: 7 }]}>
                            {user?.name || "---"}
                        </Text>
                        {/* user.email */}
                        <Text style={[styles.h4, { textAlign: 'right', marginRight: 8, paddingBottom: 7 }]}>{user?.email || "---"}</Text>
                    </View>
                </View>
                <OptionsList />
            </View>
            {/* مودال الصورة */}
            <ImageModal
                visible={modalVisible}
                source={user?.image}
                onClose={handleCloseModal}
                userId={user?.id}
            />

        </View>
    )
}


const style = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
        backgroundColor: '#fff',
    },

});

export default UserOptions