// src/Components/CartIcon.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Bag } from 'iconsax-react-nativejs';
import { useSelector } from 'react-redux';
import { styles } from '../../../styles';
import { useNavigation } from '@react-navigation/native';
import { PATHS } from '../../routes/Paths';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


export default function BottomCartIcon({ focused }) {
  const { cartItems } = useSelector((state) => state.CartItems);
  const { navigate } = useNavigation();
  const insets = useSafeAreaInsets();

  const total = cartItems.reduce((sum, item) => {
    return sum + (item.quantity * item.product.endPrice);
  }, 0);

  return (
    <>
      {cartItems.length > 0 &&
      
        <TouchableOpacity style={{
          backgroundColor: '#327AFF', position: 'absolute',
          bottom: 10 + insets.bottom, right: 18, left: 18, zIndex: 100, flexDirection: 'row-reverse',
          paddingHorizontal: 10,

          height: 55, borderRadius: 30,
        }} onPress={() => navigate(PATHS.CartScreen)}>
          <View style={{
            flexDirection: 'row-reverse',
            width: '100%',
            justifyContent: 'space-between', alignItems: 'center',
            


          }}>



            <View style={{
              flexDirection: 'row-reverse',
              alignItems: 'center', gap: 8
            }}>
              <View style={{
                backgroundColor: '#09162e3d',
                width: 40,
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 50,
              }}>
                <Text style={[styles.h3, {
                  color: 'white',
                  fontSize: 20,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  lineHeight: 45,
                }]}>
                  {cartItems.length}
                </Text>

              </View>
              <Text style={[styles.h3, { color: 'white', fontSize: 18 }
              ]}>عرض السلة</Text>
            </View>
            <View style={{
              flexDirection: 'row-reverse',
              alignItems: 'center', gap: 5
            }}>
              <Text style={[styles.h3, { color: 'white', fontSize: 19, marginTop: 5 }]}>{total}</Text>
              <Text style={[styles.h3, { color: 'white', fontSize: 19 }]}>ج.م</Text>
            </View>

          </View>
        </TouchableOpacity>
      }
    </>

  );
}
