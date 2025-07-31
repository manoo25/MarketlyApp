import { useNavigation } from "@react-navigation/native";
import { ArrowRight2 } from "iconsax-react-nativejs";
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

export default function GoBack({ navigate }) {
  const navigation = useNavigation();

  return (
    
      <TouchableOpacity onPress={() => (navigate ? navigate() : navigation.goBack())}>
        <ArrowRight2 size="32" color="#424047" />
      </TouchableOpacity>

  );
}
  