import React from 'react';
import { Animated, View } from 'react-native';

export default function Statusbar({ scrollY }) {
   const backgroundColor = scrollY?.interpolate?.({
    inputRange: [0, 105, 106], // 51 لتجنب القيم بين 50-51
    outputRange: ['transparent', '#fafafa49', 'white'],
    extrapolate: 'clamp',
  }) || 'green'; 

  return (
    <Animated.View style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 25,
      backgroundColor: backgroundColor,
      elevation: 5,
      zIndex: 1000,
    }} />
  );
}