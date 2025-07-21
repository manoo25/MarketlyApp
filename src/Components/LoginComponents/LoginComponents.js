import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Fontisto from "@expo/vector-icons/Fontisto";
import { Formik } from "formik";
import * as Yup from "yup";
import { colors, styles } from "../../../styles";
import LoginByGoogle from "../LoginByGoogle";

export default function LoginForm() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "صيغة البريد الإلكتروني غير صحيحة")
      .required("البريد مطلوب"),
    password: Yup.string().required("كلمة المرور مطلوبة"),
  });

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={(values) => console.log(values)}
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
        
          <View style={styles.inputWrapper}>
          
            <Fontisto
              name="email"
              size={24}
              color="black"
              style={styles.icon}
            />
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

       
          <View style={styles.inputWrapper}>
            <MaterialIcons
              name="lock-outline"
              size={24}
              color="black"
              style={styles.icon}
            />
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

          <TouchableOpacity>
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

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 20,
            }}
          >
            <TouchableOpacity style={styles.Btn} onPress={handleSubmit}>
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

          <View
            style={{
              flexDirection: "row-reverse",
              alignItems: 'center',
              justifyContent: "center",
              marginTop: 20,
              gap:4
            }}
          >
<Text style={[styles.h3,{
  color:colors.gray,
  fontSize:17
}]}>ليس لديك حساب ؟</Text>
<TouchableOpacity>
  <Text style={[styles.h3,{
  color:colors.primary,
  fontSize:17
}]}>انشاء حساب جديد</Text>
</TouchableOpacity>
          </View>

          <LoginByGoogle/>
        </View>
      )}
    </Formik>
  );
}
