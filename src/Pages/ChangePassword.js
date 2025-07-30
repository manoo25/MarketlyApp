import { StyleSheet, Text, TouchableOpacity, View, KeyboardAvoidingView, Keyboard , Platform, Alert, TextInput, TouchableWithoutFeedback } from 'react-native';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { colors, styles } from '../../styles';
import { ArrowRight2 } from 'iconsax-react-nativejs';
import LoadingSpinner from "../Components/GlobalComponents/LoadingSpinner";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../Redux/Slices/users";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { EyeSlash } from 'iconsax-react-nativejs';
import { Eye } from 'iconsax-react-nativejs';
import { Warning2 } from 'iconsax-react-nativejs';
import { TickCircle } from 'iconsax-react-nativejs';
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import * as Yup from "yup";



function ChangePassword() {

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [isPasswordVisible_1, setIsPasswordVisible_1] = useState(false);
    const [isPasswordVisible_2, setIsPasswordVisible_2] = useState(false);
    const [isPasswordVisible_3, setIsPasswordVisible_3] = useState(false);
    const [userId, setUserId] = useState(null);
    const { currentUser, error, loading } = useSelector((state) => state.Users);

    useEffect(() => {
        // جلب معرف المستخدم من AsyncStorage
        const getUserData = async () => {
            try {
                const userData = await AsyncStorage.getItem("userData");
                if (userData) {
                    const user = JSON.parse(userData);
                    setUserId(user.id);
                }
            } catch (error) {
                console.error("Error getting user data:", error);
            }
        };
        getUserData();
        setIsInitialized(true);
    }, []);

    // مراقبة نجاح تغيير كلمة المرور
    useEffect(() => {
        if (isInitialized && hasSubmitted && currentUser && !loading && !error && !isPasswordChanged) {
            setIsPasswordChanged(true);
            setSuccessMessage("تم تغيير كلمة المرور بنجاح");
            setHasSubmitted(false); // إعادة تعيين عند النجاح

            // العودة للصفحة السابقة بعد ثانيتين
            setTimeout(() => {
                navigation.goBack()
            }, 2000);
        }
    }, [currentUser, loading, error, navigation, hasSubmitted, isPasswordChanged, isInitialized]);

    // مراقبة حالة التحميل
    useEffect(() => {
        if (hasSubmitted && loading) {
            // بدأت عملية التحميل
            console.log("بدأت عملية تغيير كلمة المرور");
        }
    }, [loading, hasSubmitted]);

    // مراقبة الأخطاء
    useEffect(() => {
        if (hasSubmitted && error) {
            console.log("حدث خطأ في تغيير كلمة المرور:", error);
        }
    }, [error, hasSubmitted]);

    // إضافة state لرسالة النجاح
    const [successMessage, setSuccessMessage] = useState("");
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [isPasswordChanged, setIsPasswordChanged] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);

    const togglePasswordVisibility_1 = () => {
        setIsPasswordVisible_1(!isPasswordVisible_1);
    };

    const togglePasswordVisibility_2 = () => {
        setIsPasswordVisible_2(!isPasswordVisible_2);
    };

    const togglePasswordVisibility_3 = () => {
        setIsPasswordVisible_3(!isPasswordVisible_3);
    };

    const handleChangePassword = async (values) => {
        setHasSubmitted(true);
        setIsPasswordChanged(false); // إعادة تعيين عند بدء عملية جديدة

        if (!userId) {
            Alert.alert("خطأ", "لم يتم العثور على بيانات المستخدم");
            return;
        }

        if (values.password2 !== values.password3) {
            Alert.alert("خطأ", "كلمة المرور الجديدة غير متطابقة");
            return;
        }

        // إظهار رسالة تأكيد قبل الحفظ
        dispatch(changePassword({
            userId: userId,
            currentPassword: values.password1,
            newPassword: values.password2
        }));

    }










    return (
        // <KeyboardAvoidingView
        //     style={{ flex: 1 }}
        //     behavior={Platform.OS === "ios" ? "padding" : "height"}
        //     keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        // >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                <View style={style.container}>
                    {/* الهيدر */}
                    <View style={{ alignItems: 'center', marginTop: 60, marginBottom: 24 }}>
                        <View style={{ width: '100%', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row-reverse' }}>
                            <View style={{ flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'flex-end' }}>
                                <TouchableOpacity onPress={() => navigation.goBack()}>
                                    <ArrowRight2 size="32" color="#424047" />
                                </TouchableOpacity>
                                <Text style={[styles.h2, { textAlign: 'right' }]}>تغيير كلمة السر</Text>
                            </View>
                        </View>
                    </View>
                    {/* المحتوى */}
                    <View style={{ justifyContent: 'center' }}>
                        <Formik
                            initialValues={{ password1: "", password2: "", password3: "" }}
                            // validationSchema={validationSchema}
                            onSubmit={handleChangePassword}>
                            {({
                                handleChange,
                                handleBlur,
                                values,
                                errors,
                                touched,
                                handleSubmit,
                            }) => (
                                <>
                                    {/* <Text style={[styles.h4, { textAlign: 'right' }]}>كلمة المرور الحالية</Text> */}
                                    <View style={styles.container}>
                                        <View style={[stylesheet.inputWrapper, touched.password1 && errors.password1 && stylesheet.inputWrapperError]}>
                                            <TextInput
                                                placeholder="ادخل كلمة المرور الحالية"
                                                placeholderTextColor="#7B7686"
                                                style={[stylesheet.input, styles.h4, { flex: 1 }]}
                                                onChangeText={handleChange("password1")}
                                                onBlur={handleBlur("password1")}
                                                value={values.password1}
                                                secureTextEntry={!isPasswordVisible_1}
                                                textAlign="right"
                                                returnKeyType="next"
                                                keyboardType="default"
                                                autoCapitalize="none"
                                                onSubmitEditing={() => {
                                                    // التركيز على الحقل التالي
                                                }}
                                            />
                                            <TouchableOpacity onPress={togglePasswordVisibility_1}>
                                                {isPasswordVisible_1 ? <Eye size="32" color="#A6A1B1" /> :
                                                    <EyeSlash size="32" color="#A6A1B1" />}
                                            </TouchableOpacity>
                                        </View>
                                        {/* {touched.password1 && errors.password1 && (
                                                    <View style={{ flexDirection: 'row-reverse', alignItems: 'center' }}>
                                                        <Warning2 size="16" color="#FF3B30" />
                                                        <Text style={[styles.errorText, { marginRight: 8 }]}>{errors.password1}</Text>
                                                    </View>
                                                )} */}
                                        {hasSubmitted && error && (error.includes("كلمة المرور الحالية") || error.includes("غير صحيحة")) && (
                                            <View style={{ flexDirection: 'row-reverse', alignItems: 'center', marginTop: 8, marginBottom: 8 }}>
                                                <Warning2 size="16" color="#FF3B30" />
                                                <Text style={[styles.errorText, { marginRight: 8 }]}>{error}</Text>
                                            </View>
                                        )}
                                    </View>
                                    {/* <Text style={[styles.h4, { textAlign: 'right', marginTop: 22 }]}>كلمة المرور الجديدة</Text> */}
                                    <View style={styles.container}>
                                        <View style={[stylesheet.inputWrapper, touched.password2 && errors.password2 && stylesheet.inputWrapperError]}>
                                            <TextInput
                                                placeholder="ادخل كلمة المرور الجديدة"
                                                placeholderTextColor="#7B7686"
                                                style={[stylesheet.input, styles.h4, { flex: 1 }]}
                                                onChangeText={handleChange("password2")}
                                                onBlur={handleBlur("password2")}
                                                value={values.password2}
                                                secureTextEntry={!isPasswordVisible_2}
                                                textAlign="right"
                                                returnKeyType="next"
                                                keyboardType="default"
                                                autoCapitalize="none"
                                                onSubmitEditing={() => {
                                                    // التركيز على الحقل التالي
                                                }}
                                            />
                                            <TouchableOpacity onPress={togglePasswordVisibility_2}>
                                                {isPasswordVisible_2 ? <Eye size="32" color="#A6A1B1" /> :
                                                    <EyeSlash size="32" color="#A6A1B1" />}
                                            </TouchableOpacity>
                                        </View>
                                        {/* {touched.password2 && errors.password2 && (
                                                    <View style={{ flexDirection: 'row-reverse', alignItems: 'center', marginTop: 8, marginBottom: 8 }}>
                                                        <Warning2 size="16" color="#FF3B30" />
                                                        <Text style={[styles.errorText, { marginRight: 8 }]}>{errors.password2}</Text>
                                                    </View>
                                                )} */}
                                        {hasSubmitted && error && (error.includes("كلمة المرور الجديدة") || error.includes("المستخدم غير موجود")) && (
                                            <View style={{ flexDirection: 'row-reverse', alignItems: 'center', marginTop: 8, marginBottom: 8 }}>
                                                <Warning2 size="16" color="#FF3B30" />
                                                <Text style={[styles.errorText, { marginRight: 8 }]}>{error}</Text>
                                            </View>
                                        )}
                                    </View>
                                    {/* <Text style={[styles.h4, { textAlign: 'right', marginTop: 22 }]}>تأكيد كلمة المرور</Text> */}
                                    <View style={styles.container}>
                                        <View style={[stylesheet.inputWrapper, touched.password3 && errors.password3 && stylesheet.inputWrapperError]}>
                                            <TextInput
                                                placeholder="اعد ادخال كلمة المرور الجديدة"
                                                placeholderTextColor="#7B7686"
                                                style={[stylesheet.input, styles.h4, { flex: 1 }]}
                                                onChangeText={handleChange("password3")}
                                                onBlur={handleBlur("password3")}
                                                value={values.password3}
                                                secureTextEntry={!isPasswordVisible_3}
                                                textAlign="right"
                                                returnKeyType="done"
                                                keyboardType="default"
                                                autoCapitalize="none"
                                                onSubmitEditing={handleSubmit}
                                            />
                                            <TouchableOpacity onPress={togglePasswordVisibility_3}>
                                                {isPasswordVisible_3 ? <Eye size="32" color="#A6A1B1" /> :
                                                    <EyeSlash size="32" color="#A6A1B1" />}
                                            </TouchableOpacity>
                                        </View>
                                        {/* {touched.password3 && errors.password3 && (
                                                    <View style={{ flexDirection: 'row-reverse', alignItems: 'center', marginTop: 8, marginBottom: 8 }}>
                                                        <Warning2 size="16" color="#FF3B30" />
                                                        <Text style={[styles.errorText, { marginRight: 8 }]}>{errors.password3}</Text>
                                                    </View>
                                                )} */}
                                        {hasSubmitted && error && error.includes("تأكيد") && (
                                            <View style={{ flexDirection: 'row-reverse', alignItems: 'center', marginTop: 8, marginBottom: 8 }}>
                                                <Warning2 size="16" color="#FF3B30" />
                                                <Text style={[styles.errorText, { marginRight: 8 }]}>{error}</Text>
                                            </View>
                                        )}
                                    </View>

                                    {/* رسائل الخطأ والنجاح */}
                                    {/* رسائل الخطأ العامة التي لا تتعلق بحقل محدد */}
                                    {hasSubmitted && error && !error.includes("كلمة المرور الحالية") && !error.includes("غير صحيحة") &&
                                        !error.includes("كلمة المرور الجديدة") && !error.includes("المستخدم غير موجود") &&
                                        !error.includes("تأكيد") && (
                                            <View style={{ flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'center', marginTop: 16, marginBottom: 8 }}>
                                                <Warning2 size="16" color="#FF3B30" />
                                                <Text style={[styles.errorText, { marginRight: 8 }]}>{error}</Text>
                                            </View>
                                        )}

                                    {/* رسالة النجاح */}
                                    {successMessage && (
                                        <View style={{
                                            flexDirection: 'row-reverse',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginTop: 16,
                                            marginBottom: 8,
                                            backgroundColor: '#E8F5E8',
                                            padding: 12,
                                            borderRadius: 8,
                                            borderWidth: 1,
                                            borderColor: '#34C759'
                                        }}>
                                            <TickCircle size="20" color="#34C759" />
                                            <Text style={[styles.successText, { marginRight: 8, color: '#34C759' }]}>{successMessage}</Text>
                                        </View>
                                    )}

                                    {/* زر تغيير كلمة المرور */}
                                    <TouchableOpacity
                                        style={[stylesheet.submitButton, (loading || !!successMessage) && stylesheet.submitButtonDisabled]}
                                        onPress={handleSubmit}
                                        disabled={loading || !!successMessage}
                                    >
                                        <Text style={stylesheet.submitButtonText}>
                                            {loading ? "جاري التحديث..." : successMessage ? "تم الحفظ" : "حفظ"}
                                        </Text>
                                    </TouchableOpacity>
                                </>
                            )}
                        </Formik>
                    </View>
                    <View style={{ paddingTop: 22 }}>
                        <Text style={[styles.h5, { textAlign: 'right', color: '#A6A1B1' }]}>
                            يجب أن تتكون كلمة المرور من 8 أحرف على الأقل،
                        </Text>
                        <Text style={[styles.h5, { textAlign: 'right', color: '#A6A1B1' }]}>
                            ويجب أن تتضمن :
                        </Text>
                        <Text style={[styles.h5, { textAlign: 'right', color: '#A6A1B1' }]}>
                            • حرف كبير واحد (A-Z)
                        </Text>
                        <Text style={[styles.h5, { textAlign: 'right', color: '#A6A1B1' }]}>
                            • حرف صغير واحد (a-z)
                        </Text>
                        <Text style={[styles.h5, { textAlign: 'right', color: '#A6A1B1' }]}>
                            • رقم واحد (0-9)
                        </Text>
                        <Text style={[styles.h5, { textAlign: 'right', color: '#A6A1B1' }]}>
                            • رمز خاص واحد (مثل: - @ # $ % ^ & * _ - + = . , ? /)
                        </Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        // </KeyboardAvoidingView>
    )
}



const style = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
})

const stylesheet = StyleSheet.create({
    inputWrapper: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        backgroundColor: '#FAFAFA',
        borderWidth: 1,
        borderColor: '#EFECF3',
        paddingHorizontal: 10,
        height: 60,
        borderRadius: 15,
    },
    submitButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        marginTop: 30,
        alignItems: 'center',
    },
    submitButtonDisabled: {
        backgroundColor: '#CCCCCC',
    },
    submitButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    inputWrapperError: {
        borderColor: '#FF3B30',
        borderWidth: 2,
    },
    successText: {
        color: '#34C759',
        fontSize: 13,
        textAlign: 'right',
        marginTop: 4,
        fontWeight: 'bold',
    },
});


export default ChangePassword;