import { StyleSheet, Text, TouchableOpacity, ScrollView, View, TextInput } from "react-native";
import { colors, styles } from '../../styles';
import { ArrowRight2 } from 'iconsax-react-nativejs';
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { EyeSlash } from 'iconsax-react-nativejs';
import { Eye } from 'iconsax-react-nativejs';








function DeleteAccountConfirmation() {

    const dispatch = useDispatch();
    const { currentUser, error, loading } = useSelector((state) => state.Users);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);


    const togglePasswordVisibility = () => {
        setIsPasswordVisible((prev) => !prev);
    };



    const validationSchema = Yup.object().shape({
        password: Yup.string().required("كلمة المرور مطلوبة"),
    });




    return (
        <View style={style.container}>
            {/* الهيدر */}
            <View style={{ alignItems: 'center', marginTop: 60 }}>
                <View style={{ width: '100%', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row-reverse' }}>
                    <View>
                        <View style={{ flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'flex-end' }}>
                            <TouchableOpacity>
                                <ArrowRight2 size="32" color="#424047" />
                            </TouchableOpacity>
                            <Text style={[styles.h2, { textAlign: 'right', }]}>حذف الحساب</Text>
                        </View>
                    </View>
                </View>
            </View>
            {/* المحتوى */}
            <Formik
                initialValues={{ password: "" }}
                validationSchema={validationSchema}
            >
                {({
                    handleChange,
                    handleBlur,
                    values,
                    errors,
                    touched,
                    handleSubmit,
                }) => (
                    <View style={style.emptyContainer}>
                        <Text style={[styles.h4, { marginTop: 24, color: '#f92e5a', textAlign: 'center' }]}>الرجاء ادخال كلمة المرور لتأكيد الحذف </Text>

                        {/* Password Input */}
                        <Text style={[styles.h3, { textAlign: 'right', marginTop: 24 }]}>كلمة المرور </Text>

                        <View style={styles.inputWrapper}>
                            <TextInput
                                placeholder="ادخل كلمة المرور"
                                placeholderTextColor="#7B7686"
                                style={[styles.input, styles.h4, { flex: 1 }]}
                                onChangeText={handleChange("password")}
                                onBlur={handleBlur("password")}
                                value={values.password}
                                secureTextEntry={!isPasswordVisible}
                                textAlign="right"
                            />
                            <TouchableOpacity onPress={togglePasswordVisibility}>
                                {isPasswordVisible ? <EyeSlash size="24" color="#A6A1B1" /> :
                                    <Eye size="24" color="#A6A1B1" />}
                            </TouchableOpacity>
                        </View>
                        {touched.password && errors.password && (
                            <Text style={styles.errorText}>{errors.password}</Text>
                        )}


                        <View style={{ alignSelf: 'stretch', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row-reverse', marginTop: 24 }}>
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <TouchableOpacity style={{
                                    backgroundColor: 'rgba(238, 48, 48, 0.1)',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: 175,
                                    height: 60,
                                    borderRadius: 16
                                }} >
                                    <Text
                                        style={[
                                            styles.h3,
                                            {
                                                textAlign: "right",
                                                fontSize: 20,
                                                color: '#F92E5A',

                                            },
                                        ]}
                                    >
                                        حذف
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <TouchableOpacity style={{
                                    backgroundColor: colors.BtnsColor,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: 175,
                                    height: 60,
                                    borderRadius: 16
                                }} >
                                    <Text
                                        style={[
                                            styles.h3,
                                            {
                                                textAlign: "right",
                                                fontSize: 20,
                                                color: colors.white,

                                            },
                                        ]}
                                    >
                                        الغاء
                                    </Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
                )}
            </Formik>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        marginTop: 24,
    },
})


export default DeleteAccountConfirmation