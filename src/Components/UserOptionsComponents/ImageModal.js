import { Modal, View, Image, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { uploadUserImage, deleteUserImage, compressImage } from '../../Redux/UploadAndDeleteImages';
import { updateUser } from '../../Redux/Slices/users';
import AsyncStorage from '@react-native-async-storage/async-storage';



const ImageModal = ({ visible, onClose, source, setSource, userId, setUser }) => {

    // const [imageUri, setImage] = useState(source);
    const [imageUri, setImageUri] = useState(null);


    useEffect(() => {
        if (visible) {
            setImageUri(source); // بس لما المودال يفتح
        }
    }, [visible]);


    

    const removeImage = () => {
        setImageUri(null);
        if (setSource) {
            setSource(null);
        }
    };
    const handleDeleteImage = async () => {
        try {
            const success = await deleteUserImage(image);

            if (!success) {
                Alert.alert('خطأ', 'لم يتم حذف الصورة');
                return;
            }

            if (userId) {
                await updateUser({ id: userId, updatedData: { image: null } });
            }

            setImageUri(null);
            if (setSource) setSource(null);
            onClose();

            Alert.alert('تم الحذف', 'تم حذف الصورة بنجاح');

        } catch (error) {
            Alert.alert('خطأ', 'حدث خطأ أثناء حذف الصورة');
            console.error('❌ خطأ أثناء الحذف:', error);
        }
    };
    // const handleChangeImage = async () => {
    //     try {
    //         const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    //         if (status !== 'granted') {
    //             Alert.alert('خطأ', 'يجب منح صلاحية الوصول إلى المعرض');
    //             return;
    //         }
    //         let result = await ImagePicker.launchImageLibraryAsync({
    //             mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //             allowsEditing: true,
    //             aspect: [4, 3],
    //             quality: 1,
    //         });
    //         if (!result.canceled) {
    //             const selectedImage = result.assets[0].uri;
    //             // ضغط الصورة
    //             const compressedUri = await compressImage(selectedImage);

    //             // رفع الصورة
    //             const publicUrl = await uploadUserImage(compressedUri);

    //             if (!publicUrl) {
    //                 Alert.alert('خطأ', 'لم يتم رفع الصورة بنجاح');
    //                 return;
    //             }

    //             const updatedUser = {
    //                 ...user,
    //                 image: publicUrl
    //             };

    //             // خزنها في AsyncStorage
    //             await AsyncStorage.setItem('userData', JSON.stringify(updatedUser));

    //             // حدث الـ state
    //             setUser(updatedUser);

    //             // تحديث البيانات في supabase
    //             if (userId) {
    //                 await updateUser({ id: userId, updatedData: { image: publicUrl } });
    //             }

    //             // تحديث الـ state
    //             setImageUri(publicUrl);
    //             if (setSource) setSource(publicUrl);

    //             Alert.alert('تم التحديث', 'تم تغيير الصورة بنجاح');
    //         }

    //         onClose();

    //     } catch (error) {
    //         Alert.alert('خطأ', 'حدث خطأ أثناء تغيير الصورة');
    //         console.error('❌ خطأ في تغيير الصورة:', error);
    //     }
    // };


    const handleChangeImage = async () => {
        try {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('خطأ', 'يجب منح صلاحية الوصول إلى المعرض');
                return;
            }

            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            if (!result.canceled) {
                const selectedImage = result.assets[0].uri;

                // رفع الصورة
                const publicUrl = await uploadUserImage(selectedImage);
                if (!publicUrl) {
                    Alert.alert('خطأ', 'فشل رفع الصورة');
                    return;
                }

                // تحديث المستخدم في Supabase
                const success = await updateUser({
                    id: userId,
                    updatedData: { image: publicUrl },
                });

                if (!success) {
                    Alert.alert('خطأ', 'فشل تحديث الصورة في الحساب');
                    return;
                }

                // تحديث الواجهة + AsyncStorage
                const updatedUser = { id: userId, image: publicUrl };
                await AsyncStorage.setItem('userData', JSON.stringify(updatedUser));
                setUser(updatedUser);

                if (setSource) setSource(publicUrl);
                setImageUri(publicUrl);
                onClose();
                Alert.alert('تم', 'تم تحديث الصورة بنجاح');
            }

        } catch (error) {
            console.error('❌ خطأ:', error);
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
                        <TouchableOpacity style={styles.buttonDelete} onPress={handleDeleteImage}>
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
