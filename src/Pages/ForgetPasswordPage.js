import React from 'react'
import { colors, styles } from '../../styles'
import { ScrollView, Text, View } from 'react-native'
import ForgetPasswordForm from '../Components/ForgetPassword/ForgetPasswordForm'
import ResetPasswordForm from '../Components/ForgetPassword/ResetPassword'

export default function ForgetPasswordPage() {
  return (
    <>
     <View style={{flex:1,backgroundColor:colors.white,paddingTop:25}}>
  

     <ScrollView >
        <View style={styles.paddingView}>
        <View style={{
     flexDirection: 'row',
     alignItems: 'center',
     justifyContent: 'center',
     padding: 8,
     marginTop:25
   }}>

    <ForgetPasswordForm/>
    </View>
    </View>
    </ScrollView>
    </View>
    </>
  )
}
