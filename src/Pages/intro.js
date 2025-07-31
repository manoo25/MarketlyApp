import React, { useEffect, useRef } from "react";
import {
  Image,
  StyleSheet,
  View,
  Animated,
  Easing,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Logo from "../../assets/imgs/Logo.png";
import { useNavigation } from "@react-navigation/native";
import { PATHS } from "../routes/Paths";
import { UserData } from '../Redux/Slices/GetUserData';
import { DelegatesPaths } from "../routes/delegatesRoute/delegatesPaths";




function IntroPage() {
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;
const {replace}=useNavigation();
useEffect(()=>{
  setTimeout(() => {

 const fetchUser = async () => {
      const user = await UserData();
      if (user) {   
        if(user.role==='delegate'){
replace(DelegatesPaths.DelegatorProducts) ;
return;
        }
       
            
  replace(PATHS.Home)   
      }
      else{
        replace(PATHS.Login)   
      }
    };
    fetchUser();
  }, 3200);
},[])
  useEffect(() => {
    const animateDot = (dot, delay) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(dot, {
            toValue: 1,
            duration: 300,
            delay,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(dot, {
            toValue: 0.3,
            duration: 300,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    animateDot(dot1, 0);
    animateDot(dot2, 150);
    animateDot(dot3, 300);
  }, []);



  return (
    <LinearGradient
      colors={["#ab9fd5", "#b2cbdf"]}
      style={styles.introContainer}
    >
      <Image source={Logo} style={styles.logo} resizeMode="contain" />

      <View style={styles.dotsContainer}>
        <Animated.View
          style={[styles.dot, { opacity: dot1 }]}
        />
        <Animated.View
          style={[styles.dot, { opacity: dot2 }]}
        />
        <Animated.View
          style={[styles.dot, { opacity: dot3 }]}
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  introContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 100,
  },
  dotsContainer: {
    position: "absolute",
    bottom: 50,
    flexDirection: "row",
    gap: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
    marginHorizontal: 1,
  },
});

export default IntroPage;
