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


export  const PATHS={
  Intro:'Intro',
  Login:'Login',
  Register:'Register',
  Home:'Home',
  ForgetPassword:'ForgetPassword',
  ResetPasswordForm:'ResetPasswordForm',
}
export default function Router() {
   
const Stack = createNativeStackNavigator();


  return (
   <NavigationContainer>
<Stack.Navigator
screenOptions={
  {
    headerShown:false
  }
}
>
  <Stack.Screen name={PATHS.Intro} component={IntroPage}/>
  <Stack.Screen name={PATHS.Login} component={LoginPage}/>
  <Stack.Screen name={PATHS.Register} component={RegisterPage}/>
  <Stack.Screen name={PATHS.Home} component={Home}/>
  <Stack.Screen name={PATHS.ForgetPassword} component={ForgetPasswordPage}/>
  <Stack.Screen name={PATHS.ResetPasswordForm} component={ResetPasswordForm}/>
</Stack.Navigator>
   </NavigationContainer>
  )
}
  