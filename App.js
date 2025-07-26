import { StatusBar } from 'expo-status-bar';
import { useAppFonts, styles, colors } from './styles';
import Router from './src/routes/Router';
import { Provider } from 'react-redux';
import { store } from './src/Redux/Store';
import ProductDetails from './src/Pages/ProductDetails';
import Cart from './src/Pages/Cart';
import UserOptions from './src/Pages/UserOptions';
import ChangePassword from './src/Pages/ChangePassword';

export default function App() {
  const [fontsLoaded] = useAppFonts();

  if (!fontsLoaded) return null;

  return (
    // <Provider store={store}>
    //   <Router />
    // </Provider>
    <ChangePassword />
  );
}
