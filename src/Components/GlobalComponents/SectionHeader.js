import React from 'react'
import { styles } from '../../../styles'
import { Text } from 'react-native'

export default function SectionHeader({text}) {
  return (


    
    <Text style={[styles.h3,{
                    fontSize:28,
                    paddingRight:18,
                   
                    textAlign:"right"
                }]}>
                    {text}
                </Text>
  )
}
