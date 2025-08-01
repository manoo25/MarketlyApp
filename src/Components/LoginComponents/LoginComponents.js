import React, { useEffect, useState } from "react";
import { View, TextInput, Text, TouchableOpacity, Alert } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Fontisto from "@expo/vector-icons/Fontisto";
import { Formik } from "formik";
import * as Yup from "yup";
import { colors, styles } from "../../../styles";
import LoginByGoogle from "./LoginByGoogle";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { UserLogin } from "../../Redux/Slices/users";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingSpinner from "../GlobalComponents/LoadingSpinner";
import { PATHS } from "../../routes/Paths";
import { DelegatesPaths } from "../../routes/delegatesRoute/delegatesPaths";
import { UserData } from "../../Redux/Slices/GetUserData";

export default function LoginForm() {
  const dispatch = useDispatch();
  const { currentUser, error, loading } = useSelector((state) => state.Users);
  const { replace } = useNavigation();
  const { navigate } = useNavigation();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loginError, setLoginError] = useState("");

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  useEffect(() => {
    setLoginError("");
  }, []);
  useEffect(() => {
    if (currentUser) {
      AsyncStorage.setItem("userData", JSON.stringify(currentUser));

 if(currentUser.role=='delegate'){
 const fetchUser = async () => {
     await UserData();
    };
    fetchUser();
      replace(DelegatesPaths.DelegatorProducts);
if (currentUser.email === currentUser.password) {
  Alert.alert(
    "تنبيه",
    "يجب عليك تغيير كلمة مرورك الموقتة لامان حسابك!!",
    [{ text: "حسناً" }],
    { cancelable: true }
  );
  replace(DelegatesPaths.DelegatorResetPasswordForm,{email:currentUser.email})
}
     return;
    }

      replace(PATHS.Home);
    }
  }, [currentUser]);



  const handleLogin = async (userdata) => {
    setLoginError("");
    dispatch(UserLogin(userdata));
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
    .required("هذا الحقل مطلوب")
    .test("is-email-or-phone", "يجب إدخال بريد إلكتروني أو رقم هاتف صحيح", function (value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^01[0125][0-9]{8}$/; // مثال: أرقام مصر
      return emailRegex.test(value) || phoneRegex.test(value);
    }),
    password: Yup.string().required("كلمة المرور مطلوبة"),
  });

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={handleLogin}
    >
      {({
        handleChange,
        handleBlur,
        values,
        errors,
        touched,
        handleSubmit,
      }) => (
        <View style={styles.container}>
          {/* Email Input */}
          <View style={styles.inputWrapper}>
            <Fontisto name="email" size={24} color="black" style={styles.icon} />
            <TextInput
              placeholder="البريد الإلكتروني او الهاتف"
              placeholderTextColor="#7B7686"
              style={[styles.input, styles.h4]}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              keyboardType="email-address"
              autoCapitalize="none"
              textAlign="right"
            />
          </View>
          {touched.email && errors.email && (
            <Text style={styles.errorText}>{errors.email}</Text>
          )}

          {/* Password Input */}
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

          {/* Forgot Password */}
          <TouchableOpacity onPress={() => replace(PATHS.ForgetPassword)}>
            <Text
              style={[
                styles.h3,
                {
                  textAlign: "right",
                  marginTop: 15,
                  fontSize: 14,
                  color: colors.primary,
                },
              ]}
            >
              نسيت كلمة المرور ؟
            </Text>
          </TouchableOpacity>

          {loginError && (
            <Text style={[styles.errorText, { textAlign: 'center' }]}>
              {loginError}
            </Text>
          )}

          {/* Login Button */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 20,
            }}
          >
            <TouchableOpacity 
              style={[styles.Btn, loading && { opacity: 0.7 }]} 
              onPress={handleSubmit}
              disabled={loading}
            >
              {loading && <LoadingSpinner />}
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
              تسجيل الدخول
          
              </Text>
               
            </TouchableOpacity>
          </View>

          {/* Register Link */}
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
              ليس لديك حساب ؟
            </Text>
            <TouchableOpacity onPress={() => replace(PATHS.Register)}>
              <Text
                style={[
                  styles.h3,
                  {
                    color: colors.primary,
                    fontSize: 17,
                  },
                ]}
              >
                انشاء حساب جديد
              </Text>
            </TouchableOpacity>
          </View>

          {/* Google Login */}
          {/* <LoginByGoogle /> */}
        </View>
      )}
    </Formik>
  );
}