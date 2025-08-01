import React from 'react'
import { Text, View } from 'react-native'
import GoBack from './GoBack'
import { styles } from '../../../styles'

export default function HeaderPages({ navigate, title }) {
  return (

    // <View style={styles.header}>
    //   <View style={styles.headerContent}>
    //     <View style={styles.headerRow}>
    //       <GoBack navigate={navigate} />

    //       <Text style={[styles.h3, styles.headerTitle]}>{title}</Text>
    //     </View>
    //   </View>
    // </View>
    
        <View style={{ flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'flex-end' }}>
          <GoBack navigate={navigate} />
          <Text style={[styles.h2, { textAlign: 'right' }]}>{title}</Text>
        </View>

  )
}


