import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { colors, styles, useAppFonts } from './styles'; 
import IntroPage from './src/Pages/intro';
import Router from './src/routes/Router';
import ProductDetails from './src/Pages/ProductDetails';

export default function App() {
  const [fontsLoaded] = useAppFonts();

  if (!fontsLoaded) return null;

  return (

    <Router/>
  );
}
