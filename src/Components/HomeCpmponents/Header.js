import React from 'react'
import { Image, Text, View } from 'react-native'
import { styles } from '../../../styles'
import { LinearGradient } from 'expo-linear-gradient'
import WaveDivider from './Wave'
import EvilIcons from '@expo/vector-icons/EvilIcons';
import SearchInput from './SearchInput'



export default function Header() {
  return (
   <View style={{height:160}}>
      <LinearGradient
           colors={["#327AFF", "#46B8F0"]}
           style={{flex:1,paddingTop:52}}
         >
       <View
       style={[
        styles.h4,{textAlign:'right',
          paddingRight:13,
          position:'relative',
          flexDirection:'row',
          justifyContent:'flex-end'
        }]}
       >
        
         <Text 
         style={[styles.h3,{textAlign:'right',color:'white',fontSize:15}]}
         >التوصيل إلى : محافظة القاهرة
         </Text>
         <EvilIcons name="location" size={22} color="white" />
       </View>

       <SearchInput/>
        <WaveDivider/>
      </LinearGradient>
    </View>
  )
}
