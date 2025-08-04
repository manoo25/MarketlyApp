import React from 'react'
import { styles } from '../../../styles'
import { Text } from 'react-native'

export default function SectionHeader({ text }) {
  return (



    <Text style={[styles.h3, {
      fontSize: 22,
      paddingRight: 18,
      textAlign: "right",
      alignSelf: "flex-end"
    }]}>
      {text}
    </Text>
  )
}
