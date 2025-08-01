import React, { useEffect, useRef } from 'react';
import { Animated, Text, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const ToastMessage = ({ visible, message, duration = 2000, onHide }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.delay(duration),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        if (onHide) onHide();
      });
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Animated.View style={[styles.toastContainer, { opacity: fadeAnim }]}>
      <Text style={styles.toastText}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
  position: 'absolute',
  bottom: 30, // ✅ أقرب للمكان اللي تحت
  left: 20,
  right: 20,
  backgroundColor: '#333',
  paddingVertical: 12,
  paddingHorizontal: 16,
  borderRadius: 10,
  alignItems: 'center',
  zIndex: 1000,
  elevation: 10,
  alignSelf: 'center', // ✅ للتوسيط الأفقي في كل الشاشات
},
  toastText: {
    color: '#fff',
    fontSize: 15,
    textAlign: 'center',
  },
});

export default ToastMessage;
