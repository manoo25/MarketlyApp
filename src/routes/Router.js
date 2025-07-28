import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import { View } from 'react-native'
import LoginPage from '../Pages/LoginPage';
import IntroPage from '../Pages/intro';
import RegisterPage from '../Pages/RegisterPage';
import Home from '../Pages/Home';
import ForgetPasswordPage from '../Pages/ForgetPasswordPage';
import ResetPasswordForm from '../Components/ForgetPassword/ResetPassword';
import { PATHS } from './Paths';
import BottomTabs from './BottomTabs';
import AllCategoriesScreen from "../Pages/categories/AllCategoriesScreen";
import CategoryProductsPage from '../Pages/categories/CategoryProductsPage';
import AccountDetails from '../Pages/AccountDetails';
import SavedAdresses from '../Pages/SavedAdresses';
import ChangePassword from '../Pages/ChangePassword';





export default function Router() {

  const Stack = createNativeStackNavigator();


  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name={PATHS.Intro} component={IntroPage} />
        <Stack.Screen name={PATHS.Login} component={LoginPage} />
        <Stack.Screen name={PATHS.Register} component={RegisterPage} />
        <Stack.Screen name={PATHS.Home} component={BottomTabs} />

        <Stack.Screen
          name={PATHS.ForgetPassword}
          component={ForgetPasswordPage}
        />
        <Stack.Screen
          name={PATHS.ResetPasswordForm}
          component={ResetPasswordForm}
        />

        <Stack.Screen
          name={PATHS.AllCategories}
          component={AllCategoriesScreen}
        />
        <Stack.Screen
          name={PATHS.CategoryProducts}
          component={CategoryProductsPage}
        />
        <Stack.Screen name={PATHS.AccountDetails} component={AccountDetails} />
        <Stack.Screen name={PATHS.SavedAdresses} component={SavedAdresses} />
        <Stack.Screen name={PATHS.ChangePassword} component={ChangePassword} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
