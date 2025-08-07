import React from 'react'
import { Text, View } from 'react-native'
import GoBack from './GoBack'
import { styles } from '../../../styles'
import { Platform } from 'react-native'

export default function HeaderPages({ navigate, title }) {
  return (


    <View style={{ flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'flex-end', }}>
      <GoBack navigate={navigate} />
      <Text style={[styles.h2, { textAlign: 'right', paddingTop: Platform.OS === "ios" ? 10 : 0, }]}>{title}</Text>
    </View>

  )
}


