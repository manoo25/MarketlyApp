import React, { useEffect, useRef } from "react";
import { Animated, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function LoadingSpinner() {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1100, // مدة الدورة الكاملة (1 ثانية)
        useNativeDriver: true,
      })
    ).start();
  }, [spinValue]);

  const rotate = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <Animated.View style={{ transform: [{ rotate }] }}>
      <FontAwesome name="spinner" size={24} color="white" />
    </Animated.View>
  );
}
