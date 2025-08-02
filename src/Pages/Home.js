import React, { useEffect, useRef, useState } from 'react';
import {
  ScrollView, Text, Animated, View,
  FlatList, StyleSheet
} from 'react-native';
import { colors } from '../../styles';
import Header from '../Components/HomeCpmponents/Header';
import MainSlider from '../Components/HomeCpmponents/MainSlider';
import MainCategories from '../Components/HomeCpmponents/MainCategories';
import ProductSlider from '../Components/GlobalComponents/ProductSlider';
import Statusbar from '../Components/GlobalComponents/Statusbar';
import CompaniesSlide from '../Components/HomeCpmponents/CompaniesSlide';
import { UserData } from '../Redux/Slices/GetUserData';
import { fetchCartItems } from '../Redux/Slices/CartItems';
import { useDispatch } from 'react-redux';
import SkeletonBox from "../Components/GlobalComponents/SkeletonBox.js";


export default function Home() {
  const dispatch = useDispatch();
  const scrollY = useRef(new Animated.Value(0)).current;
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchUser = async () => {
      const user = await UserData();
      setLoading(true);
      if (user) {
        setUserData(user);
      }
      setLoading(false);
    };
    fetchUser();
  }, []);


  useEffect(() => {
    dispatch(fetchCartItems());
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1,  backgroundColor: "white" }}>
        <View style={style.container}>
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

            <Header city={userData && userData.city} governorate={userData && userData.governorate} />
            <View style={style.skContainer}>
              {/* المنتج الكبير في الأعلى */}
              <View style={style.mainProductCard}>
                <SkeletonBox style={style.mainImage} />

              </View>

              {/* عنوان منتجات هذا المنتج */}
              <View style={style.sectionTitle}>
                <SkeletonBox style={style.titleSkeleton} />
              </View>

              {/* المنتجات المقترحة في FlatList */}
              <FlatList
                data={[...Array(3)]}
                keyExtractor={(_, index) => index.toString()}
                horizontal
                inverted
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => (
                  <View key={index} style={style.suggestedCard}>
                    <SkeletonBox style={style.suggestedImage} />
                    <SkeletonBox style={style.suggestedText} />
                    <SkeletonBox style={style.suggestedPrice} />
                  </View>
                )}
              />
              {/* المنتجات المقترحة في FlatList */}
              <FlatList
                data={[...Array(3)]}
                keyExtractor={(_, index) => index.toString()}
                horizontal
                inverted
                style={{ marginTop: 32 }}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => (
                  <View key={index} style={style.suggestedCard}>
                    <SkeletonBox style={style.suggestedImage} />
                    <SkeletonBox style={style.suggestedText} />
                    <SkeletonBox style={style.suggestedPrice} />
                  </View>
                )}
              />
            </View>
            </ScrollView>
        </View>
      </View>
    );
  }
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

        <Header city={userData && userData.city} governorate={userData && userData.governorate} />



        <MainSlider />
        <MainCategories />
        <ProductSlider sectionName="عروض و خصومات 🔥" />
        <CompaniesSlide sectionName="تسوق الشركات" />
      </ScrollView>
    </View>
  );
}


const style = StyleSheet.create({

  skContainer: {
    paddingHorizontal: 12,
    paddingTop: 8,
    backgroundColor: '#fff',

  },

  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  gradient: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#F2F8FC',
    opacity: 0.5,
  },

  mainProductCard: {
    width: '100%',
    borderRadius: 12,
    backgroundColor: '#F7F7F7',
    padding: 12,
    marginBottom: 16,
  },

  mainImage: {
    width: '100%',
    height: 210,
    borderRadius: 10,
  },

  mainTextContainer: {
    marginBottom: 16,
  },

  mainTitle: {
    width: '60%',
    height: 18,
    borderRadius: 6,
    marginBottom: 16,
    alignSelf: 'flex-end'
  },

  mainOldPrice: {
    width: '40%',
    height: 14,
    borderRadius: 6,
    marginBottom: 6,
    alignSelf: 'flex-end'

  },

  mainNewPrice: {
    width: '50%',
    height: 16,
    borderRadius: 6,
    alignSelf: 'flex-end'

  },

  mainQty: {
    width: '40%',
    height: 32,
    borderRadius: 8,
    alignSelf: 'flex-end'

  },

  sectionTitle: {
    marginBottom: 70,
  },

  titleSkeleton: {
    width: '40%',
    height: 10,
    borderRadius: 6,
    alignSelf: 'center'

  },

  suggestedCard: {
    width: 120,
    borderRadius: 12,
    backgroundColor: '#F7F7F7',
    padding: 8,
    marginRight: 12,

  },

  suggestedImage: {
    width: '100%',
    height: 80,
    borderRadius: 8,
    marginBottom: 8,
  },

  suggestedText: {
    width: '80%',
    height: 14,
    borderRadius: 6,
    marginBottom: 6,
    alignSelf: 'flex-end'

  },

  suggestedPrice: {
    width: '60%',
    height: 12,
    borderRadius: 6,
    alignSelf: 'flex-end'

  },
});
