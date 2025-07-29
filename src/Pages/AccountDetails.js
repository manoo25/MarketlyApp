import { StyleSheet, Text, TouchableOpacity, ScrollView, View, TextInput } from "react-native";
import { useState, useEffect } from 'react';
import { colors, styles } from '../../styles';
import { ArrowRight2 } from 'iconsax-react-nativejs';
import { Edit } from 'iconsax-react-nativejs';
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from 'react-redux';
import LabelInpts from "../Components/GlobalComponents/LabelInpts";
import { updateUser } from "../Redux/Slices/users";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PATHS } from '../routes/Paths';







function AccountDetails({ navigation }) {

    const dispatch = useDispatch();
    const [user, setUser] = useState('');

    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            const storedUser = await AsyncStorage.getItem("userData");
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        };
        fetchUser();
    }, []);

    const userId = user?.id;



    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "صيغة البريد الإلكتروني غير صحيحة")
            .required("البريد مطلوب")
    });


    return (

        <View style={style.container}>
            {/* الهيدر */}
            <View style={{ alignItems: 'center', marginTop: 60, marginBottom: 16 }}>
                <View style={{ width: '100%', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row-reverse' }}>
                    <View>
                        <View style={{ flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'flex-end' }}>
                            <TouchableOpacity onPress={() => navigation.navigate(PATHS.UserOptions)}>
                                <ArrowRight2 size="32" color="#424047" />
                            </TouchableOpacity>
                            <Text style={[styles.h2, { textAlign: 'right', }]}>بيانات الحساب</Text>
                        </View>
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                            display: isEditing ? 'none' : 'flex',
                        }}
                    >
                        <TouchableOpacity style={{
                            backgroundColor: '#EBF2FF',
                            flexDirection: 'row-reverse',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 130,
                            height: 60,
                            borderRadius: 16,
                            gap: 10,
                        }}
                            onPress={() => setIsEditing(!isEditing)}
                        >
                            <Text
                                style={[
                                    styles.h2,
                                    {
                                        textAlign: "right",
                                        fontSize: 20,
                                        color: colors.BtnsColor,

                                    },
                                ]}
                            >
                                تعديل
                            </Text>
                            <Edit size="32" color="#327aff" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            {/* المحتوى */}

            <ScrollView style={{ flex: 1, paddingHorizontal: 16 }}>

                <Formik
                    initialValues={{
                        email: user?.email || '',
                        name: user?.name || '',
                        phone: user?.phone || '',
                    }}
                    validationSchema={validationSchema}
                    enableReinitialize
                    // onSubmit={async  (values) => {
                    //     dispatch(updateUser({ id: userId, updatedData: values }));
                    //     setIsEditing(false);
                    // }}
                    onSubmit={async (values) => {
                        try {
                            // 1. Update في Supabase
                            await dispatch(updateUser({ id: userId, updatedData: values }));

                            // 2. هات اليوزر القديم من AsyncStorage
                            const storedUser = await AsyncStorage.getItem('userData');
                            if (storedUser) {
                                const parsedUser = JSON.parse(storedUser);

                                // 3. اعمل نسخة محدثة منه بالبيانات الجديدة
                                const updatedUser = {
                                    ...parsedUser,
                                    ...values,
                                };

                                // 4. احفظها في AsyncStorage
                                await AsyncStorage.setItem('userData', JSON.stringify(updatedUser));
                            }

                            // 5. اقفل وضع التعديل
                            setIsEditing(false);

                        } catch (error) {
                            console.log('Update Error:', error);
                        }
                    }}
                >
                    {({
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        values,
                        errors,
                        touched,
                    }) => (
                        <>
                            <View style={styles.container}>
                                {/* Email Input */}
                                <Text style={[styles.h4, { textAlign: 'right', marginTop: 24 }]}>البريد الالكترونى</Text>
                                <View style={styles.inputWrapper}>
                                    <TextInput
                                        placeholder="البريد الإلكتروني"
                                        placeholderTextColor="#7B7686"
                                        style={[[styles.input, styles.h4], { color: '#7B7686' }]}
                                        editable={false}
                                        onChangeText={handleChange("email")}
                                        onBlur={handleBlur("email")}
                                        value={values.email}
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                    />
                                </View>
                                {touched.email && errors.email && (
                                    <Text style={styles.errorText}>{errors.email}</Text>
                                )}

                                <LabelInpts text="اسم المستخدم" />
                                <View style={styles.inputWrapper}>
                                    <TextInput
                                        placeholder="ادخل اسمك ثلاثى"
                                        placeholderTextColor="#7B7686"
                                        style={[[styles.input, styles.h4], { color: isEditing ? colors.text : '#7B7686'  }]}
                                        editable={isEditing}
                                        onChangeText={handleChange("name")}
                                        onBlur={handleBlur("name")}
                                        value={values.name}
                                        autoCapitalize="none"
                                    />
                                </View>
                                {touched.name && errors.name && (
                                    <Text style={styles.errorText}>{errors.name}</Text>
                                )}

                                <LabelInpts text="رقم الهاتف" />
                                <View style={styles.inputWrapper}>
                                    <TextInput
                                        placeholder="+20 "
                                        placeholderTextColor="#7B7686"
                                        style={[styles.input, styles.h4, { color: isEditing ? colors.text : '#7B7686' }]}
                                        editable={isEditing}
                                        onChangeText={handleChange("phone")}
                                        onBlur={handleBlur("phone")}
                                        value={values.phone}
                                        autoCapitalize="none"
                                        keyboardType="numeric"
                                    />
                                </View>
                                {touched.phone && errors.phone && (
                                    <Text style={styles.errorText}>{errors.phone}</Text>
                                )}
                            </View>
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginTop: 24,
                                    display: isEditing ? 'flex' : 'none',
                                }}
                            >
                                <TouchableOpacity
                                    style={styles.Btn}
                                    onPress={() => {
                                        handleSubmit();
                                    }}
                                >
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
                                        حفظ

                                    </Text>

                                </TouchableOpacity>
                            </View>
                        </>
                    )}
                </Formik>

            </ScrollView>

        </View>

    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    Btn: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        justifyContent: 'center',
        paddingHorizontal: 12,
        paddingVertical: 16,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#E0E0E0',

    },
})


export default AccountDetails;
