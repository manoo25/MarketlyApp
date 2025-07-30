
import { useAppFonts } from './styles';
import Router from './src/routes/Router';
import { Provider } from 'react-redux';
import { store } from './src/Redux/Store';
import { View } from 'react-native';


export default function App() {
  const [fontsLoaded] = useAppFonts();

  if (!fontsLoaded) return null;

  return (
    <Provider  store={store}>
     <View style={{ flex: 1}}>
       <Router   />
     </View>
    </Provider>
  );
}
