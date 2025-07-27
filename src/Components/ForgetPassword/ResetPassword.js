import React, { useEffect, useState } from "react";
import { View, TextInput, Text, TouchableOpacity, Alert, ScrollView } from "react-native";
import { Formik, replace } from "formik";
import * as Yup from "yup";
import { colors, styles } from "../../../styles";
import LoadingSpinner from "../GlobalComponents/LoadingSpinner";
import LabelInpts from "../GlobalComponents/LabelInpts";
import BackToSignUp from "../GlobalComponents/BackToSignUp";
import { fetchUserIdByEmail, updateUser } from "../../Redux/Slices/users";
import { useDispatch } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import { PATHS } from "../../routes/Paths";

export default function ResetPasswordForm() {
  const [loading, setLoading] = useState(false);
  const [UserID, SetUserId] = useState('');

const{replace}=useNavigation();

 const route = useRoute();
  const { email } = route.params || {};
  const dispatch = useDispatch();

  useEffect(() => {
    if (email) {
      dispatch(fetchUserIdByEmail(email))
        .unwrap()
        .then((userId) => {
          SetUserId(userId);
          console.log("User ID:", userId);
          console.log("Email:", email);
        })
        .catch((err) => {
          console.log("Error:", err);
        });
    }
  }, [email]);









  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required("كلمة المرور مطلوبة")
      .min(6, "يجب ألا تقل كلمة المرور عن 6 أحرف"),
    confirmPassword: Yup.string()
      .required("تأكيد كلمة المرور مطلوب")
      .oneOf([Yup.ref("password"), null], "كلمة المرور غير متطابقة"),
  });



const handleFormSubmit = (values) => {
  setLoading(true);

  const reQ = {
    id: UserID,
    updatedData: { password: values.password },
  };

  dispatch(updateUser(reQ))
    .unwrap()
    .then(() => {
      setLoading(false);
      Alert.alert('تم تغيير كلمة المرور بنجاح');
      replace(PATHS.Login)
    })
    .catch(() => {
      console.error("خطأ في التحديث");
    });
};




  return (
    <Formik
      initialValues={{ password: "", confirmPassword: "" }}
      validationSchema={validationSchema}
      onSubmit={handleFormSubmit}
    >
      {({
        handleChange,
        handleBlur,
        values,
        errors,
        touched,
        handleSubmit,
      }) => (

         <View style={{flex:1,backgroundColor:colors.white,paddingTop:25}}>
          
        
             <ScrollView >
                <View style={styles.paddingView}>
                <View style={{
             flexDirection: 'row',
             alignItems: 'center',
             justifyContent: 'center',
             padding: 8,
             marginTop:25
           }}>
        
            <View style={[styles.container, { marginTop: -20 }]}>
          <Text
            style={[
              styles.h2,
              {
                marginBottom: 15,
                textAlign: "right",
                color: colors.primary,
                paddingRight: 0,
              },
            ]}
          >
            تغيير كلمة المرور
          </Text>

          {/* كلمة المرور الجديدة */}
          <LabelInpts text="كلمة المرور الجديدة" />
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="ادخل كلمة المرور الجديدة"
              placeholderTextColor="#7B7686"
              style={[styles.input, styles.h4, { flex: 1 }]}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
             
              textAlign="right"
            />
          </View>
          {touched.password && errors.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}

          {/* تأكيد كلمة المرور */}
          <LabelInpts text="تأكيد كلمة المرور" />
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="اعادة إدخال كلمة المرور"
              placeholderTextColor="#7B7686"
              style={[styles.input, styles.h4, { flex: 1 }]}
              onChangeText={handleChange("confirmPassword")}
              onBlur={handleBlur("confirmPassword")}
              value={values.confirmPassword}
            
              textAlign="right"
            />
          </View>
          {touched.confirmPassword && errors.confirmPassword && (
            <Text style={styles.errorText}>{errors.confirmPassword}</Text>
          )}

          {/* زر التالي */}
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
               {loading&&  
                         <LoadingSpinner />
             }
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
                           تأكيد
                         </Text>
                  
                     </TouchableOpacity>
          </View>

          <BackToSignUp />
        </View>
            </View>
            </View>
            </ScrollView>
            </View>
       
      )}
    </Formik>
  );
}
