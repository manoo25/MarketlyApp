// src/Components/CartIcon.js
import React from 'react';
import { View, Text } from 'react-native';
import { Bag } from 'iconsax-react-nativejs';
import { useSelector } from 'react-redux';

export default function CartIcon({ focused }) {
  const { cartItems } = useSelector((state) => state.CartItems);
  const variant = focused ? 'Bold' : 'Outline';
  const iconColor = focused ? '#327AFF' : '#292D32';

  return (
    <View>
      <Bag size={30} color={iconColor} variant={variant} />
      {cartItems.length > 0 && (
        <View
          style={{
            position: 'absolute',
            top: -5,
            right: -10,
            backgroundColor: 'red',
            borderRadius: 10,
            width: 21,
            height: 21,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>
            {cartItems.length}
          </Text>
        </View>
      )}
    </View>
  );
}
