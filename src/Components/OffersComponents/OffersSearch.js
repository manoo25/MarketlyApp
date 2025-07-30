import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from '../../../styles';
export default function OffersSearch({ query, onChange , onClose  }) {
  return (
   <View
      style={{
        flexDirection: 'row-reverse',
        alignItems: 'center',
        backgroundColor: '#F0F0F0',
        paddingHorizontal: 12,
        borderRadius: 8,
        marginBottom: 12,
      }}
    >
      <Ionicons name="search" size={20} color="#666" />
      <TextInput
        style={[styles.h3,{
          flex: 1,
          marginLeft: 8,
          height:35,
          fontSize: 16,
          textAlign: 'right',
          paddingRight: 15,
          paddingTop:5
        }]}
        placeholder="ابحث عن منتج..."
        value={query}
        onChangeText={onChange}
      />
      {query.length > 0 && (
        <TouchableOpacity onPress={onClose}>
          <Ionicons name="close" size={20} color="#666" />
        </TouchableOpacity>
      )}
    </View>
  );
}
