import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Bag, DiscountShape, Home2, ProfileCircle, Receipt1 } from 'iconsax-react-nativejs';
import Home from '../Pages/Home';
import Cart from '../Pages/Cart';
import UserOptions from '../Pages/UserOptions';
import { Platform, View, Text } from 'react-native';
import { styles } from '../../styles';
import AllCategoriesScreen from '../Pages/categories/AllCategoriesScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CategoryProductsPage from '../Pages/categories/CategoryProductsPage';
import CartIcon from '../Components/GlobalComponents/CartIcon';
import Orders from '../Pages/orders';
import OrderDetails from '../Pages/OrderDetails';
import OffersPage from '../Pages/OffersPage';
import AllCompaniesScreen from '../Pages/companies/AllCompaniesScreen';
import CompanyProductsScreen from '../Pages/companies/CompanyProductsScreen';
import ProductDetails from '../Pages/ProductDetails';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CartList from '../Components/CartComponents/CartList';
import { PATHS } from './Paths';

// import Search from '../Pages/search';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={Home} />
      <Stack.Screen name="AllCategories" component={AllCategoriesScreen} />
      <Stack.Screen name="CategoryProducts" component={CategoryProductsPage} />
      <Stack.Screen name="AllCompaniesScreen" component={AllCompaniesScreen} />
      {/* <Stack.Screen name="ProductDetails" component={ProductDetails} /> */}
      <Stack.Screen
        name="CompanyProductsScreen"
        component={CompanyProductsScreen}
      />
    </Stack.Navigator>
  );
}
function OrdersStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="OrdersMain" component={Orders} />
      <Stack.Screen name="OrderDetails" component={OrderDetails} />
    </Stack.Navigator>
  );
}


export default function BottomTabs() {
  const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator
      initialRouteName={PATHS.Home}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          const variant = focused ? "Bold" : "Linear";
          const iconColor = focused ? "#327AFF" : "#292D32";

          let icon;

          if (route.name === 'Home') {
            icon = <Home2 size={30} color={iconColor} variant={variant} />;
          } else if (route.name === 'OffersPage') {
            icon = <DiscountShape size={30} color={iconColor} variant={variant} />;
          } else if (route.name === 'Cart') {
            icon = <CartIcon focused={focused} />;
          } else if (route.name === 'Orders') {
            icon = <Receipt1 size={30} color={iconColor} variant={variant} />;
          } else if (route.name === "Profile") {
            icon = (
              <ProfileCircle size={30} color={iconColor} variant={variant} />
            );
          }

          return icon;
        },
        tabBarActiveTintColor: "#327AFF",
        tabBarInactiveTintColor: "#292D32",
        tabBarLabelStyle: styles.titleNavegator,
        tabBarStyle: {
          height: Platform.OS === "android" ? 75 + insets.bottom : 70,
          alignItems: "center",
          backgroundColor: "#FFFFFF",
          justifyContent: "space-between",
          paddingBottom: insets.bottom > 0 ? insets.bottom : 10,
          paddingTop: 10,
        },
      })}
    >
      <Tab.Screen name="Profile" component={UserOptions} options={{ title: 'الحساب' }} />
      <Tab.Screen name="Orders" component={OrdersStack} options={{ title: 'الطلبات' }} />
      <Tab.Screen name="Cart" component={Cart} options={{ title: 'عربة التسوق' }} />
      <Tab.Screen name="OffersPage" component={OffersPage} options={{ title: 'العروض' }} />
      <Tab.Screen name={PATHS.Home} component={HomeStack} options={{ title: 'الرئيسية' }} />
    </Tab.Navigator>
  );
}
