import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
export default function OffersSearch({ query, onChange , onClose  }) {
  return (
   <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F0F0F0',
        paddingHorizontal: 12,
        borderRadius: 8,
        marginBottom: 12,
      }}
    >
      <Ionicons name="search" size={20} color="#666" />
      <TextInput
        style={{
          flex: 1,
          marginLeft: 8,
          paddingVertical: 8,
        }}
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
