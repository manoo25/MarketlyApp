import React from 'react'
import { colors, styles } from '../../../styles'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import googleLogo from "../../../assets/imgs/google.png";

export default function LoginByGoogle() {
  return (
    <View
            style={{
              flexDirection: "row-reverse",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 20,
            }}
          >
            <TouchableOpacity style={[styles.Btn,{ backgroundColor:'#EBF2FF'}]} >
                
              <Text
                style={[
                  styles.h3,
                  {
                    textAlign: "right",
                    fontSize: 20,
                    color: colors.gray,
                    marginTop:5
                   
                  },
                ]}
              >
                التسجيل عن طريق جوجل 
              </Text>
               <Image source={googleLogo} style={{ width: 28, height: 28, marginStart: 12 }} />
            </TouchableOpacity>
          </View>
  )
}
