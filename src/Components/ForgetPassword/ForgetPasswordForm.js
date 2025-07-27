import React, { useState } from 'react';
import { Text, TouchableOpacity, View, TextInput, Alert } from 'react-native';
import LabelInpts from '../GlobalComponents/LabelInpts';
import Fontisto from "@expo/vector-icons/Fontisto";
import LoadingSpinner from "../GlobalComponents/LoadingSpinner";
import { colors, styles } from '../../../styles';
import { sendOtpToEmail, verifyOtp } from '../../Redux/Supabase/ForgetPassword';
import { useNavigation } from '@react-navigation/native';
import BackToSignUp from '../GlobalComponents/BackToSignUp';
import { PATHS } from '../../routes/Paths';

export default function ForgetPasswordForm() {
  const [Email, SetEmail] = useState('');
  const [OTP, SetOTP] = useState('');
  const [loading, Setloading] = useState(false);
  const [error, Seterror] = useState('');
  const [ResError, SetResError] = useState('');
  const [Show, SetShow] = useState('forgetPass');

const {replace}=useNavigation();

  const validateEmail = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  const handleSendOtp = async () => {
    if (!Email || !validateEmail(Email)) {
      SetResError('')
      Seterror('email');
      return;
    }

    Seterror('');
    Setloading(true);

    try {
      const res = await sendOtpToEmail(Email);
if (res.success) {
  SetResError('')
  SetShow('VerifyOtp');
} else {
  SetResError(res.message);
}
     
    } 
    catch (err) {
        SetResError(err.message);
        
    } finally {
      Setloading(false);
    }
  };

  const handleVerifyOtp = async () => {
  Setloading(true);
  try { 
    const res = await verifyOtp(Email, OTP); // لازم تبني الدالة دي
  
   
    if (res.success) {
      SetResError("");
     replace(PATHS.ResetPasswordForm, { email: Email });
    } 
    else {
      SetResError(res.error);
    }
  } catch (err) {
    SetResError("حدث خطأ أثناء التحقق");
  } finally {
    Setloading(false);
  }
};


  return (
    <View style={[styles.container, { marginTop: -20 }]}>
     {Show=='forgetPass'&&
     <View>
       <Text
        style={[
          styles.h2,
          {
            marginBottom: 50,
            textAlign: "right",
            color: colors.primary,
            paddingRight: 0,
          },
        ]}
      >
        نسيت كلمة المرور
      </Text>

      <LabelInpts text="البريد الالكترونى" />
      <View style={styles.inputWrapper}>
        <Fontisto name="email" size={24} color="black" style={styles.icon} />
        <TextInput
          placeholder="البريد الإلكتروني"
          placeholderTextColor="#7B7686"
          style={[styles.input, styles.h4]}
          onChangeText={(text) => SetEmail(text)}
          value={Email}
          keyboardType="email-address"
          autoCapitalize="none"
          textAlign="right"
        />
      </View>

      {error === 'email' && (
        <Text style={styles.errorText}>ادخل بريد إلكتروني صحيح</Text>
      )}
      {ResError  && (
        <Text style={styles.errorText}>{ResError}</Text>
      )}

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
          onPress={handleSendOtp}
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
              التالى
            </Text>
     
        </TouchableOpacity>
      </View>
      <BackToSignUp/>
     </View>
     }


      {Show=='VerifyOtp'&&
     <View>
       <Text
        style={[
          styles.h2,
          {
            marginBottom: 30,
            textAlign: "right",
            color: colors.primary,
            paddingRight: 0,
          },
        ]}
      >
       تأكيد البريد الالكترونى  
      </Text>

      <Text style={[styles.h3, { fontSize: 16,lineHeight:23, textAlign: "right" }]}>
        يرجى التحقق من بريدك  الالكترونى للعثور على رسالة تحتوى على رمز مكون من 6 أرقام
        </Text> 
      <View style={styles.inputWrapper}>
       
        <TextInput
          placeholder="ادخل الرمز"
          placeholderTextColor="#7B7686"
          style={[styles.input, styles.h4]}
          onChangeText={(text) => SetOTP(text)}
        
          value={OTP}
          keyboardType="numeric"
          maxLength={6}
          autoCapitalize="none"
          textAlign="right"
        />
      </View>

      {ResError  && (
        <Text style={styles.errorText}>{ResError}</Text>
      )}

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
          onPress={handleVerifyOtp}
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
              التالى
            </Text>
     
        </TouchableOpacity>
      </View>
       <BackToSignUp/>
     </View>
     }
    </View>
  );
}
