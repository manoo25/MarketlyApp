import React from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../../styles';
import { sendOTP, sendOtp, sendOtpToEmail, verifyOtp } from '../Redux/Supabase/ForgetPassword';

export default function Home() {
  const email = "imagenerate30@gmail.com"; // غيره حسب الحاجة
  const code = "123456"; // جرب بكود حقيقي بعد الإرسال

  const handleSendOtp = async () => {
    try {
      const res = await sendOtpToEmail(email);
      Alert.alert("تم الإرسال", res.message);
    } catch (err) {
      console.log(err.message);
      
      Alert.alert("خطأ", err.message);
    }
  };

  const handleVerifyOtp = async () => {
   const result = await verifyOtp('imagenerate30@gmail.com', '187411');
if (result.success) {
  Alert.alert("تم الإرسال");
} else {
    Alert.alert("خطأ");
}
  };

  return (
    <View style={{ padding: 50 }}>
      <TouchableOpacity style={styles.Btn} onPress={handleSendOtp}>
        <Text>إرسال الكود</Text>
      </TouchableOpacity>
 <Text>تحقق من الكود</Text>
      <TouchableOpacity style={styles.Btn} onPress={handleVerifyOtp}>
        <Text>تحقق من الكود</Text>
      </TouchableOpacity>
    </View>
  );
}
