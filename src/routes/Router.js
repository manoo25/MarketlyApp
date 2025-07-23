import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import { View } from 'react-native'
import LoginPage from '../Pages/LoginPage';
import IntroPage from '../Pages/intro';


export const PATHS = {
  Intro: 'Intro',
  Login: 'Login'
}
export default function Router() {

  const Stack = createNativeStackNavigator();


  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={
          {
            headerShown: false
          }
        }
      >
        <Stack.Screen name={PATHS.Intro} component={IntroPage} />
        <Stack.Screen name={PATHS.Login} component={LoginPage} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
