// components/DiscountBadge.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const DiscountBadge = ({ discount }) => {
  if (!discount || discount <= 0) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>خصم %{discount.toFixed(1)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "#327AFF",
    borderBottomLeftRadius: 10,
     paddingVertical: 3,  
    paddingHorizontal: 14, 
    zIndex: 10,
  },
  text: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },
});

export default DiscountBadge;
