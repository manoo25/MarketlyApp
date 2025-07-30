import React from "react";
import { TextInput, View } from "react-native";
import { colors, styles } from "../../../styles";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import { PATHS } from "../../routes/Paths";

export default function SearchInput() {
  const navigation = useNavigation();
  const handleFocus = () => {
    navigation.navigate(PATHS.Search);
  };
  return (
    <View
      style={{
        paddingRight: 12,
      }}
    >
      <View
        style={[
          styles.inputWrapper,
          {
            backgroundColor: colors.white,
            width: "95%",
            margin: "auto",
            paddingVertical: 0,
            height: "auto",
            borderRadius: 50,
          },
        ]}
      >
        <AntDesign
          style={{ marginRight: 10 }}
          name="search1"
          size={24}
          color="black"
        />
        <TextInput
          placeholder="ابحث عن منتج , شركة او اكثر"
          placeholderTextColor="#7B7686"
          style={[
            styles.input,
            styles.h4,
            {
              paddingHorizontal: 10,
              height: 35,
              alignItems: "center",
              fontSize: 15,
            },
          ]}
          keyboardType="email-address"
          autoCapitalize="none"
          textAlign="right"
          onFocus={handleFocus}
        />
      </View>
    </View>
  );
}
