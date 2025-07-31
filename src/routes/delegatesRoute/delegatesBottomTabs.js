
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {  ProfileCircle, Receipt1, Shop } from 'iconsax-react-nativejs';
import { Platform } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserOptions from '../../Pages/UserOptions';
import { styles } from '../../../styles';
import DelegatorProducts from '../../Pages/delegator/delegatorProducts';
import DelegatorOrders from '../../Pages/delegator/delegatorOrders';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


export default function DelegatesBottomTabs() {
  return (
    <Tab.Navigator
      initialRouteName="DelegatorProducts"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          const variant = focused ? "Bold" : "Outline";
          const iconColor = focused ? "#327AFF" : "#292D32";

          let icon;

          if (route.name === "DelegatorProducts") {
            icon = <Shop size={35} color={iconColor} variant={variant} />;
          } 
          else if (route.name === 'DelegatorOrders') {
                      icon = <Receipt1 size={35} color={iconColor} variant={variant} />;
                    }
          else if (route.name === "Profile") {
            icon = (
              <ProfileCircle size={35} color={iconColor} variant={variant} />
            );
          }

          return icon;
        },
        tabBarActiveTintColor: "#327AFF",
        tabBarInactiveTintColor: "#292D32",
        tabBarLabelStyle: styles.titleNavegator,
        tabBarStyle: {
          height: Platform.OS === "android" ? 75 : 70,
          alignItems: "center",
          backgroundColor: "#FFFFFF",
          justifyContent: "space-between",
          marginBottom: Platform.OS === "android" ? 35 : 0,
          paddingTop: 5,
        },
      })}
    >
      <Tab.Screen name="Profile" component={UserOptions} options={{ title: 'الحساب' }} />
      <Tab.Screen name="DelegatorOrders" component={DelegatorOrders} options={{ title: 'الطلبات' }} />
      <Tab.Screen name="DelegatorProducts" component={DelegatorProducts} options={{ title: 'منتجاتك' }} />
    </Tab.Navigator>
  );
}
