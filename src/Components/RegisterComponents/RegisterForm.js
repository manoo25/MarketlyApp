import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Fontisto from "@expo/vector-icons/Fontisto";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import Feather from "@expo/vector-icons/Feather";
import { Formik } from "formik";
import * as Yup from "yup";
import { colors, styles } from "../../../styles";
import { useNavigation } from "@react-navigation/native";
import LabelInpts from "../GlobalComponents/LabelInpts";
import { useDispatch, useSelector } from "react-redux";
import TestPicker from "../GlobalComponents/Picker";
import ImagePickerComponent from "../GlobalComponents/ImagePickerComponent";
import LoadingSpinner from "../GlobalComponents/LoadingSpinner";
import { UserRegister } from "../../Redux/Slices/users";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { compressImage, uploadUserImage } from "../../Redux/UploadAndDeleteImages";
import { PATHS } from "../../routes/Paths";


export default function RegisterForm() {
  const dispatch = useDispatch();
  const[IsLoading,SetIsLoading]=useState(false)

  const { currentUser, error, loading } = useSelector((state) => state.Users);
  const [Show, SetShow] = useState(false);
  const { replace } = useNavigation();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  useEffect(() => {
    if (currentUser) {
      AsyncStorage.setItem("userData", JSON.stringify(currentUser));
      replace(PATHS.Home);
    }
  }, [currentUser]);

const handleRegister = async (userdata) => {
  SetIsLoading(true);
  const isLocalImage = userdata.image && userdata.image.startsWith("file://");

  let uploadedUrl = null;
  if (isLocalImage) {
    const compressedUri = await compressImage(userdata.image); // ⬅️ ضغط الصورة
    uploadedUrl = await uploadUserImage(compressedUri);         // ⬅️ رفع الصورة المضغوطة
  }

  const updatedUser = {
    ...userdata,
    image: uploadedUrl || userdata.image,
  }
  SetIsLoading(false);
  dispatch(UserRegister(updatedUser));
  
};









  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "صيغة البريد الإلكتروني غير صحيحة")
      .required("البريد مطلوب"),

    name: Yup.string()
      .matches(/^[\u0600-\u06FFa-zA-Z ]{5,30}$/, "الاسم يجب أن يكون من 5 إلى 30 حرفًا")
      .required("اسم المستخدم مطلوب"),

    governorate: Yup.string().required("اختر المحافظة !"),
    city: Yup.string().required("اسم المدينة مطلوب !"),
    location: Yup.string().required("عنوان المحل مطلوب !"),

    phone: Yup.string()
      .matches(/^01[0-2,5]{1}[0-9]{8}$/, "رقم الهاتف  غير صحيح")
      .required("ادخل رقم هاتف صحيح !"),

    password: Yup.string()
      .min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل")
      .required("كلمة المرور مطلوبة"),
  });

  return (
    <Formik
      initialValues={{
        email: "",
        name: "",
        phone: "",
        password: "",
        governorate: "", // ✅ تم التعديل هنا
        city: "",
        location: "",
        role:'user',
        isBlocked:false,
        image:''
      }}
      validationSchema={validationSchema}
      onSubmit={handleRegister}
    >
      {({ handleChange, handleBlur, values, errors, touched, handleSubmit, setFieldValue }) => (
        <>
          <Text
            style={[
              styles.h2,
              { marginTop: 35, color: colors.primary, paddingRight: 17 },
              Show && { display: "none" },
            ]}
          >
            انشاء حساب جديد
          </Text>

          <View style={[styles.container, { minHeight: "120vh" }]}>
            {!Show && (
              <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "ios" ? 95 : 0}
              >
                <ScrollView showsVerticalScrollIndicator={false}>
                  <LabelInpts text="البريد الالكترونى" />
                  <View style={styles.inputWrapper}>
                    <Fontisto name="email" size={24} color="black" style={styles.icon} />
                    <TextInput
                      placeholder="البريد الإلكتروني"
                      placeholderTextColor="#7B7686"
                      style={[styles.input, styles.h4]}
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
                    <AntDesign name="user" size={24} color="black" style={styles.icon} />
                    <TextInput
                      placeholder="ادخل اسمك ثلاثى"
                      placeholderTextColor="#7B7686"
                      style={[styles.input, styles.h4]}
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
                    <Feather name="phone" size={24} color="black" style={styles.icon} />
                    <TextInput
                      placeholder="+20 "
                      placeholderTextColor="#7B7686"
                      style={[styles.input, styles.h4, { textAlign: "left" }]}
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

                  <LabelInpts text="كلمة المرور" />
                  <View style={styles.inputWrapper}>
                    <MaterialIcons name="lock-outline" size={24} color="black" style={styles.icon} />
                    <TextInput
                      placeholder="كلمة المرور"
                      placeholderTextColor="#7B7686"
                      style={[styles.input, styles.h4, { flex: 1 }]}
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("password")}
                      value={values.password}
                      secureTextEntry={!isPasswordVisible}
                      textAlign="right"
                    />
                    <TouchableOpacity onPress={togglePasswordVisibility}>
                      <FontAwesome6
                        name={isPasswordVisible ? "eye" : "eye-slash"}
                        size={24}
                        color="gray"
                        style={{ marginLeft: 10 }}
                      />
                    </TouchableOpacity>
                  </View>
                  {touched.password && errors.password && (
                    <Text style={styles.errorText}>{errors.password}</Text>
                  )}

                  <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 25 }}>
                    <TouchableOpacity style={styles.Btn} onPress={() => SetShow(true)}>
                      <Text style={[styles.h3, { fontSize: 20, color: colors.white }]}>التالى</Text>
                    </TouchableOpacity>
                  </View>
                  <View
                style={{
                  flexDirection: "row-reverse",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 20,
                  gap: 4,
                }}
              >
                <Text
                  style={[
                    styles.h3,
                    {
                      color: colors.gray,
                      fontSize: 17,
                    },
                  ]}
                >
                  بالفعل لديك حساب ؟
                </Text>
                <TouchableOpacity onPress={() => replace(PATHS.Login)}>
                  <Text
                    style={[
                      styles.h3,
                      {
                        color: colors.primary,
                        fontSize: 17,
                      },
                    ]}
                  >
                    {" "}
                    تسجيل الدخول
                  </Text>
                </TouchableOpacity>
              </View>
                </ScrollView>
              </KeyboardAvoidingView>
            )}

            {Show && (
              <View>
                <ImagePickerComponent source={values.image} 
                setSource={(val) => setFieldValue("image", val)} />
                <Text style={[styles.h3, { fontSize: 16, color: colors.primary, textAlign: "center" }]}>
                  اختر صورة
                </Text>

                <LabelInpts text="اختر المحافظة" />
                <TestPicker
                  Governate={values.governorate}
                  SetGovernate={(val) => setFieldValue("governorate", val)}
                />
                {touched.governorate && errors.governorate && (
                  <Text style={styles.errorText}>{errors.governorate}</Text>
                )}

                <ScrollView
                  showsVerticalScrollIndicator={false}
                  keyboardShouldPersistTaps="handled"
                  contentContainerStyle={{ paddingBottom: 0, flexGrow: 1 }}
                >
                  <View style={{ flex: 1 }}>
                    <LabelInpts text="اسم المدينة" />
                    <View style={styles.inputWrapper}>
                      <MaterialCommunityIcons
                        name="city-variant-outline"
                        size={24}
                        color="black"
                      />
                      <TextInput
                        placeholder="ادخل اسم المدينة"
                        placeholderTextColor="#7B7686"
                        style={[styles.input, styles.h4, { marginEnd: 7 }]}
                        onChangeText={handleChange("city")}
                        onBlur={handleBlur("city")}
                        value={values.city}
                        autoCapitalize="none"
                      />
                    </View>
                    {touched.city && errors.city && (
                      <Text style={styles.errorText}>{errors.city}</Text>
                    )}

                    <LabelInpts text="عنوان المحل " />
                    <View style={styles.inputWrapper}>
                      <EvilIcons name="location" size={24} color="black" />
                      <TextInput
                        placeholder="ادخل عنوان المحل"
                        placeholderTextColor="#7B7686"
                        style={[styles.input, styles.h4, { marginEnd: 7 }]}
                        onChangeText={handleChange("location")}
                        onBlur={handleBlur("location")}
                        value={values.location}
                        autoCapitalize="none"
                      />
                    </View>
                    {touched.location && errors.location && (
                      <Text style={styles.errorText}>{errors.location}</Text>
                    )}

                      {error && (
                                <Text style={[styles.errorText, { textAlign: 'center' }]}>
                                  {error}
                                </Text>
                              )}

                    <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 20 }}>
                      <TouchableOpacity
                        style={[styles.Btn, loading && { opacity: 0.7 }]}
                        onPress={handleSubmit}
                        disabled={loading}
                      >
                        {loading||IsLoading && <LoadingSpinner />}
                        <Text
                          style={[
                            styles.h3,
                            { textAlign: "right", fontSize: 20, color: colors.white },
                          ]}
                        >
                          التسجيل الأن
                        </Text>
                      </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 25 }}>
                      <TouchableOpacity
                        style={[styles.Btn, { backgroundColor: colors.LightBtnsColor }]}
                        onPress={() => SetShow(false)}
                      >
                        <Text
                          style={[
                            styles.h3,
                            { textAlign: "right", fontSize: 20, color: colors.primary },
                          ]}
                        >
                          السابق
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </ScrollView>
              </View>
            )}
          </View>
        </>
      )}
    </Formik>
  );
}
