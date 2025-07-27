import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, Text, Animated, View } from 'react-native';
import { colors } from '../../styles';
import Header from '../Components/HomeCpmponents/Header';
import MainSlider from '../Components/HomeCpmponents/MainSlider';
import MainCategories from '../Components/HomeCpmponents/MainCategories';
import ProductSlider from '../Components/GlobalComponents/ProductSlider';
import Statusbar from '../Components/GlobalComponents/Statusbar';
import CompaniesSlide from '../Components/HomeCpmponents/CompaniesSlide';
import { UserData } from '../Redux/Slices/GetUserData';

export default function Home() {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const user = await UserData();
      if (user) {
        
        setUserData(user);
      
      }
    };
    fetchUser();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <Statusbar scrollY={scrollY} />
      
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, backgroundColor: colors.white, position: 'relative' }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >

        <Header city={userData&&userData.city} governorate={userData&&userData.governorate}/>

     

        <MainSlider />
        <MainCategories />
        <ProductSlider sectionName="عروض و خصومات 🔥" />
        <CompaniesSlide sectionName="تسوق الشركات" />
      </ScrollView>
    </View>
  );
}
