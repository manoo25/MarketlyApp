import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { colors, styles, useAppFonts } from './styles'; // ملف الخطوط اللي جهزناه
import IntroPage from './src/Pages/intro';

export default function App() {
  const [fontsLoaded] = useAppFonts(); // تحميل الخطوط من الملف الخارجي

  if (!fontsLoaded) return null;

  return (

    <IntroPage/>
  );
}
