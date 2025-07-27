import React, { useEffect, useState } from "react";
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { colors, styles } from "../../../styles";
import { useDispatch, useSelector } from "react-redux";
import { UserLogin } from "../../Redux/Slices/users";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { EyeSlash } from 'iconsax-react-nativejs';
import { Eye } from 'iconsax-react-nativejs';





function ChangePassComponents() {

    const [isPasswordVisible_1, setIsPasswordVisible_1] = useState(false);
    const [isPasswordVisible_2, setIsPasswordVisible_2] = useState(false);
    const [isPasswordVisible_3, setIsPasswordVisible_3] = useState(false);

    const togglePasswordVisibility_1 = () => {
        setIsPasswordVisible_1((prev) => !prev);
    };
    const togglePasswordVisibility_2 = () => {
        setIsPasswordVisible_2((prev) => !prev);
    };
    const togglePasswordVisibility_3 = () => {
        setIsPasswordVisible_3((prev) => !prev);
    };


    const handleLogin = async (userdata) => {
        setLoginError("");
        dispatch(UserLogin(userdata));
    };


    const validationSchema = Yup.object().shape({
        password: Yup.string().required("كلمة المرور مطلوبة"),
    });


    return (
        <>
            <Formik
                initialValues={{password1: "", password2: "", password3: ""}}
                validationSchema={validationSchema}
                onSubmit={handleLogin}>
                {({
                    handleChange,
                    handleBlur,
                    values,
                    errors,
                    touched,
                    handleSubmit,
                }) => (
                    <>
                    <Text style={[styles.h4, { textAlign: 'right' , marginTop : 24 }]}>كلمة المرور الحالية</Text>
                    <View style={styles.container}>
                        <View style={style.inputWrapper}>
                            <TextInput
                                placeholder="ادخل كلمة المرور"
                                placeholderTextColor="#7B7686"
                                style={[style.input, styles.h4, { flex: 1 }]}
                                onChangeText={handleChange("password")}
                                onBlur={handleBlur("password")}
                                value={values.password1}
                                secureTextEntry={!isPasswordVisible_1}
                                textAlign="right"
                            />
                            <TouchableOpacity onPress={togglePasswordVisibility_1}>
                                {isPasswordVisible_1 ? <EyeSlash size="32" color="#A6A1B1" /> :
                                    <Eye size="32" color="#A6A1B1" />}
                            </TouchableOpacity>
                        </View>
                        {touched.password && errors.password1 && (
                            <Text style={styles.errorText}>{errors.password1}</Text>
                        )}
                    </View>
                    <Text style={[styles.h4, { textAlign: 'right' , marginTop : 22 }]}>كلمة المرور الجديدة</Text>
                    <View style={styles.container}>
                        <View style={style.inputWrapper}>
                            <TextInput
                                placeholder="اعد ادخال كلمة المرور"
                                placeholderTextColor="#7B7686"
                                style={[style.input, styles.h4, { flex: 1 }]}
                                onChangeText={handleChange("password")}
                                onBlur={handleBlur("password")}
                                value={values.password2}
                                secureTextEntry={!isPasswordVisible_2}
                                textAlign="right"
                            />
                            <TouchableOpacity onPress={togglePasswordVisibility_2}>
                                {isPasswordVisible_2 ? <EyeSlash size="32" color="#A6A1B1" /> :
                                    <Eye size="32" color="#A6A1B1" />}
                            </TouchableOpacity>
                        </View>
                        {touched.password && errors.password2 && (
                            <Text style={styles.errorText}>{errors.password2}</Text>
                        )}
                    </View>
                    <Text style={[styles.h4, { textAlign: 'right' , marginTop : 22 }]}>تأكيد كلمة المرور </Text>
                    <View style={styles.container}>
                        <View style={style.inputWrapper}>
                            <TextInput
                                placeholder="اعد ادخال كلمة المرور"
                                placeholderTextColor="#7B7686"
                                style={[style.input, styles.h4, { flex: 1 }]}
                                onChangeText={handleChange("password")}
                                onBlur={handleBlur("password")}
                                value={values.password3}
                                secureTextEntry={!isPasswordVisible_3}
                                textAlign="right"
                            />
                            <TouchableOpacity onPress={togglePasswordVisibility_3}>
                                {isPasswordVisible_3 ? <EyeSlash size="32" color="#A6A1B1" /> :
                                    <Eye size="32" color="#A6A1B1" />}
                            </TouchableOpacity>
                        </View>
                        {touched.password && errors.password3 && (
                            <Text style={styles.errorText}>{errors.password3}</Text>
                        )}
                    </View>
                    </>
                )}
            </Formik>
        </>
    )
}


const style = StyleSheet.create({
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

});

export default ChangePassComponents;