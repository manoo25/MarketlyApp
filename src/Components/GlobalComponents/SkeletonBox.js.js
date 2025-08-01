import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Dimensions  } from 'react-native';

const { width } = Dimensions.get('window');

export default function SkeletonBox({ style }) {
  const animatedValue = useRef(new Animated.Value(-1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const translateX = animatedValue.interpolate({
    inputRange: [-1, 1],
    outputRange: [-width, width],
  });

  return (
    <View style={[styles.container, style]}>
      <Animated.View
        style={[
          styles.gradient,
          {
            transform: [{ translateX }],
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E1E9EE',
    overflow: 'hidden',

  },
  gradient: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#F2F8FC',
    opacity: 0.5,
  },
});
