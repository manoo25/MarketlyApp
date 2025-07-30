import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { colors, styles } from '../../styles';

import Logo from "../../assets/imgs/Logo2.png";
import LoginComponents from '../Components/LoginComponents/LoginComponents';

export default function LoginPage() {
 
  return (
   <ScrollView style={{flex:1,backgroundColor:colors.white}}>
     <View style={styles.paddingView}>
     <View style={{
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 8,
  marginTop:25
}}>
   
  <Text style={[styles.h3, { color: colors.primary,marginRight:12 }]}>
   👋
  </Text>
  <Text style={[styles.h3, { color: colors.primary,marginTop:10 }]}>
    مرحبًا بعودتك!
  </Text>
 
</View>

<View 
style={{

  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 8,
  marginTop:40,
  width:'100%'
}}
>
  <Image source={Logo} style={styles.LoginLogo} resizeMode="cover"/>
</View>
<Text style={[styles.h2,{marginHorizontal:'auto'}]}>Marketly</Text>
<LoginComponents/>
    </View>
   </ScrollView>
  );
}
