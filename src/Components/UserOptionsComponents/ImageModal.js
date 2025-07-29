import { Modal, View, Image, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { uploadUserImage, deleteUserImage, compressImage } from '../../Redux/UploadAndDeleteImages';
import { updateUser, updateCurrentUser } from '../../Redux/Slices/users';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';


const ImageModal = ({ visible, onClose, userId: propUserId, source }) => {
    const [imageUri, setImageUri] = useState(source);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.Users.currentUser);
    // استخدم userId من props أو من currentUser
    const userId = propUserId || (currentUser && currentUser.id);

    useEffect(() => {
        setImageUri(source);
        // لوج للتأكد من userId
        console.log('ImageModal opened with userId:', userId);
    }, [source, visible, userId]);

    const handleDeleteImage = async () => {
        if (!imageUri) return;
        setLoading(true);
        try {
            // استخراج اسم الملف فقط من الرابط (لأن Supabase يحتاج اسم الملف)
            const fileName = imageUri.split('/').pop();
            const success = await deleteUserImage(fileName);
            if (success) {
                setImageUri(null);
                // تحديث قاعدة البيانات بحذف الصورة
                if (userId) {
                    dispatch(updateUser({ id: userId, updatedData: { image: "" } }))
                        .then((res) => {
                            if (res && res.error) {
                                Alert.alert('خطأ', 'لم يتم حذف الصورة من قاعدة البيانات!');
                            } else {
                                // تحديث فوري للواجهة
                                if (currentUser) {
                                    const updatedUser = { ...currentUser, image: "" };
                                    // تحديث AsyncStorage
                                    AsyncStorage.setItem("userData", JSON.stringify(updatedUser));
                                    // تحديث Redux state مباشرة
                                    dispatch(updateCurrentUser(updatedUser));
                                }
                            }
                        });
                }
                Alert.alert('تم الحذف', 'تم حذف الصورة بنجاح');
            } else {
                Alert.alert('خطأ', 'فشل حذف الصورة');
            }
        } catch (error) {
            Alert.alert('خطأ', 'حدث خطأ أثناء حذف الصورة');
        }
        setLoading(false);
    };

    const handleChangeImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.7,
            });
            if (!result.canceled && result.assets && result.assets.length > 0) {
                setLoading(true);
                if (imageUri) {
                    const fileName = imageUri.split('/').pop();
                    await deleteUserImage(fileName);
                }
                const newImageUri = result.assets[0].uri;
                const compressedUri = await compressImage(newImageUri);
                const uploadedUrl = await uploadUserImage(compressedUri);
                if (uploadedUrl) {
                    setImageUri(uploadedUrl);
                    // لوج للتأكد من القيم المرسلة
                    console.log('🖼️ ImageModal: Dispatching updateUser with:', { id: userId, updatedData: { image: uploadedUrl } });
                    if (userId) {
                        dispatch(updateUser({ id: userId, updatedData: { image: uploadedUrl } }))
                            .then((res) => {
                                console.log('🖼️ ImageModal: updateUser result:', res);
                                if (res && res.error) {
                                    Alert.alert('خطأ', 'لم يتم تحديث الصورة في قاعدة البيانات!');
                                } else {
                                    // تحديث فوري للواجهة
                                    if (currentUser) {
                                        const updatedUser = { ...currentUser, image: uploadedUrl };
                                        // تحديث AsyncStorage
                                        AsyncStorage.setItem("userData", JSON.stringify(updatedUser));
                                        // تحديث Redux state مباشرة
                                        dispatch(updateCurrentUser(updatedUser));
                                    }
                                }
                            });
                    } else {
                        Alert.alert('خطأ', 'لم يتم العثور على معرف المستخدم (userId)!');
                    }
                    Alert.alert('تم التغيير', 'تم تغيير الصورة بنجاح');
                } else {
                    Alert.alert('خطأ', 'فشل رفع الصورة الجديدة');
                }
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
            Alert.alert('خطأ', 'حدث خطأ أثناء تغيير الصورة');
        }
    };


    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.modalContent}>
                    {/* <Image source={{ uri: imageUri }} style={styles.image} resizeMode="contain" /> */}
                    {imageUri ? (
                        <Image source={{ uri: imageUri }} style={styles.image} resizeMode="contain" />
                    ) : (
                        <Text style={{ color: 'gray', marginBottom: 16 }}>لا توجد صورة</Text>
                    )}
                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={styles.buttonDelete}
                            onPress={() => Alert.alert('تأكيد', 'هل تريد مسح الصوره؟', [
                                { text: 'إلغاء', style: 'cancel' },
                                { text: 'تأكيد', onPress: handleDeleteImage }])}
                         >
                            <Text style={styles.buttonDel}>حذف</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonChange} onPress={handleChangeImage}>
                            <Text style={styles.buttonText}>تغيير</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Text style={styles.closeText}>إغلاق</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        alignItems: 'center',
        width: '80%',
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 16,
        marginBottom: 16,
    },
    buttonRow: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 12,
    },
    buttonDelete: {
        backgroundColor: 'rgba(238, 48, 48, 0.1)',
        padding: 10,
        borderRadius: 8,
        flex: 1,
        marginHorizontal: 4,
    },
    buttonChange: {
        backgroundColor: 'rgba(50, 122, 255, 1)',
        padding: 10,
        borderRadius: 8,
        flex: 1,
        marginHorizontal: 4,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
    },
    buttonDel: {
        color: '#F92E5A',
        textAlign: 'center',
        fontSize: 16,
    },
    closeButton: {
        marginTop: 8,
        padding: 8,
    },
    closeText: {
        color: '#327AFF',
        fontSize: 15,
    },
});

export default ImageModal;
