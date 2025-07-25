import React, { useRef } from 'react';
import { Alert, ScrollView, Text, Animated, View, TouchableOpacity } from 'react-native';
import { colors, styles } from '../../styles';
import { sendOTP, sendOtp, sendOtpToEmail, verifyOtp } from '../Redux/Supabase/ForgetPassword';
import Header from '../Components/HomeCpmponents/Header';
import MainSlider from '../Components/HomeCpmponents/MainSlider';
import MainCategories from '../Components/HomeCpmponents/MainCategories';
import ProductSlider from '../Components/GlobalComponents/ProductSlider';
import Statusbar from '../Components/GlobalComponents/Statusbar';
import CompaniesSlide from '../Components/HomeCpmponents/CompaniesSlide';

export default function Home() {

 const scrollY = useRef(new Animated.Value(0)).current;
  return (
  <View style={{ flex: 1,backgroundColor:colors.white }}>
  <Statusbar scrollY={scrollY}/>
  
  <ScrollView 
    showsVerticalScrollIndicator={false}
     style={{flex:1,backgroundColor:colors.white,position:'relative'}}
      onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
     >
     
    <Header/>
   
      <MainSlider/>
    <MainCategories/>

      <ProductSlider sectionName="الأكثر مبيعًا🔥"/>
      <CompaniesSlide sectionName="تسوق الشركات"/>
    

    </ScrollView>
</View>
    
 
  );
}
