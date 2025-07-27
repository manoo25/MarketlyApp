import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Bag, DiscountShape, Home2, ProfileCircle, Receipt1 } from 'iconsax-react-nativejs';
import Home from '../Pages/Home';
import Cart from '../Pages/Cart';
import { Platform, View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { styles } from '../../styles';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  const { cartItems } = useSelector((state) => state.CartItems);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          const variant = focused ? 'Bold' : 'Outline';
          const iconColor = focused ? '#327AFF' : '#292D32';

          let icon;

          if (route.name === 'Home') {
            icon = <Home2 size={35} color={iconColor} variant={variant} />;
          } else if (route.name === 'Sales') {
            icon = <DiscountShape size={35} color={iconColor} variant={variant} />;
          } else if (route.name === 'Cart') {
            icon = (
              <View>
                <Bag size={35} color={iconColor} variant={variant} />
                {cartItems.length > 0 && (
                  <View style={{
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
          } else if (route.name === 'Orders') {
            icon = <Receipt1 size={35} color={iconColor} variant={variant} />;
          } else if (route.name === 'Profile') {
            icon = <ProfileCircle size={35} color={iconColor} variant={variant} />;
          }

          return icon;
        },
        tabBarActiveTintColor: '#327AFF',
        tabBarInactiveTintColor: '#292D32',
        tabBarLabelStyle: styles.titleNavegator,
        tabBarStyle: {
          height: Platform.OS === 'android' ? 75 : 70,
          alignItems: 'center',
          backgroundColor: '#FFFFFF',
          justifyContent: 'space-between',
          marginBottom: Platform.OS === 'android' ? 35 : 0,
          paddingTop: 5,
        },
      })}
    >
      <Tab.Screen name="Profile" component={Cart} options={{ title: 'الحساب' }} />
      <Tab.Screen name="Orders" component={Cart} options={{ title: 'الطلبات' }} />
      <Tab.Screen name="Cart" component={Cart} options={{ title: 'عربة التسوق' }} />
      <Tab.Screen name="Sales" component={Home} options={{ title: 'العروض' }} />
      <Tab.Screen name="Home" component={Home} options={{ title: 'الرئيسية' }} />
    </Tab.Navigator>
  );
}
