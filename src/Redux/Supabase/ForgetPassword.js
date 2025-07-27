import { supabase } from "../Supabase";

export const sendOtpToEmail = async (email) => {
  try {
    const { data, error } = await supabase.auth.signInWithOtp({
      email: email,
    });
    
    if (error) {
      return { 
      success: false, 
      message: "تاكد من ان البريد مسجل بالفعل !"
    };

    }
    
    return { 
      success: true, 
      data,
      message: "تم إرسال كود التحقق إلى بريدك الإلكتروني"
    };
  } catch (error) {
   
    return { 
      success: false, 
      error: "حدث خطأ أثناء إرسال كود التحقق",
      details: error.message 
    };
  }
};

export const verifyOtp = async (email, token) => {
  
  try {
    const { data, error } = await supabase.auth.verifyOtp({
      email: email,
      token: token,
      type: 'email', // نوع OTP المرسل
    });
    
    if (error) throw error;
    console.log('OTP verified successfully:');
    
    return { 
      success: true, 
      data,
      message: "تم التحقق من الكود بنجاح"
    };
  } catch (error) {
  
    return { 
      success: false, 
      error: "الكود غير صحيح أو انتهت صلاحيته",
      details: error.message 
    };
  }
};


// const result = await verifyOtp('user@example.com', '123456');
// if (result.success) {
//   // الكود صحيح، قم بتنفيذ الإجراءات اللازمة
// } else {
//   // عرض رسالة الخطأ للمستخدم
// }