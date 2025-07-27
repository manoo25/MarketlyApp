import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Bag, DiscountShape, Home2, ProfileCircle, Receipt1 } from 'iconsax-react-nativejs';
import Home from '../Pages/Home';
import { styles } from '../../styles';
import Cart from '../Pages/Cart';
import Orders from '../Pages/orders';
import OrderDetails from '../Pages/OrderDetails';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
    initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
      tabBarIcon: ({ focused, color, size }) => {
  let icon = null;
  const variant = focused ? 'Bold' : 'Outline';
  const iconColor = focused ? '#327AFF' : '#292D32';

  if (route.name === 'Home') {
    icon = <Home2 size={35} color={iconColor} variant={variant} />;
  } else if (route.name === 'Sales') {
    icon = <DiscountShape size={35} color={iconColor} variant={variant} />;
  } else if (route.name === 'Cart') {
    icon = <Bag size={35} color={iconColor} variant={variant} />;
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
          height: 70,
         backgroundColor:'#FFFFFF',
         justifyContent:'space-between',
          paddingBottom: 10,
          paddingTop: 5,
        },
      })}
    >
    
 <Tab.Screen name="Profile" component={Cart} options={{title: 'الحساب'}}/>
 <Tab.Screen name="Orders" component={Orders} options={{title: 'الطلبات'}}/>
    <Tab.Screen name="Cart" component={Cart} options={{title: 'عربة التسوق'}}/>
    <Tab.Screen name="Sales" component={Home} options={{title: 'العروض'}}/>
 <Tab.Screen  name="Home" component={Home} options={{title: 'الرئيسية'}}/>
 
    
  


    </Tab.Navigator>
  );
}
