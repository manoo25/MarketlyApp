import React from 'react'
import { styles } from '../../../styles'
import { Text } from 'react-native'

export default function LabelInpts({text}) {
  return (
    <Text style={[styles.h3,{
                    marginTop:18,
                  
                    fontSize:22,
                    textAlign:"right"
                }]}>
                    {text}
                </Text>
  )
}
