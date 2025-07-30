import { useNavigation } from "@react-navigation/native";
import { ArrowRight2 } from "iconsax-react-nativejs";
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

export default function GoBack({ navigate }) {
  const navigation = useNavigation();

  return (
    <View
      style={{
        width: 35,
        height: 35,
        borderRadius: 50,
        backgroundColor: '#EBF2FF',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
      }}
    >
      <TouchableOpacity onPress={() => (navigate ? navigate() : navigation.goBack())}>
        <ArrowRight2 size="32" color="#424047" />
      </TouchableOpacity>
    </View>
  );
}
