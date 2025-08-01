import { TickCircle } from 'iconsax-react-nativejs';
import React, { useEffect, useRef } from 'react';
import { Animated, Text, StyleSheet, Dimensions } from 'react-native';
import { componentStyles } from '../../../styles';

const { width } = Dimensions.get('window');

const ToastMessage = ({ visible, message, duration = 600, onHide }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
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
      <TickCircle
 size="32"
 color="#FFf"
 variant="Bold"
/>
      <Text style={[componentStyles.h2,styles.toastText]}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
  position: 'absolute',
  top: "45%",
  left: 45,
  right: 45,
  backgroundColor: '#252322b6',
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
    marginTop: 10,
  },
});

export default ToastMessage;
