import React from 'react'
import { Keyboard, ScrollView, Text, TouchableWithoutFeedback, View } from 'react-native'
import RegisterForm from '../Components/RegisterComponents/RegisterForm'
import { colors, styles } from '../../styles'
import TestPicker from '../Components/GlobalComponents/Picker'

export default function RegisterPage() {
  return (
<>

   <View style={{flex:1,backgroundColor:colors.white}}>
    
     <View style={styles.paddingView}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <RegisterForm/>
           
        </TouchableWithoutFeedback>
     
    </View>    
      </View>
</>
   
   
  )
}
