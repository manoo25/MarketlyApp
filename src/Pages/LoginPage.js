import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { colors, styles } from '../../styles';

import LoginComponents from '../Components/LoginComponents/LoginComponents';

export default function LoginPage() {

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.white,paddingVertical:45 }}>
      <View style={styles.paddingView}>
       

        <View
          style={{

            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%'
          }}
        >
          <Image source={require("../../assets/imgs/logo 2.png")} style={styles.LoginLogo} resizeMode="contain" />
        </View>
        <LoginComponents />
      </View>
    </ScrollView>
  );
}
