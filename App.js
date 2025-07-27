
import { useAppFonts } from './styles';
import Router from './src/routes/Router';
import { Provider } from 'react-redux';
import { store } from './src/Redux/Store';


export default function App() {
  const [fontsLoaded] = useAppFonts();

  if (!fontsLoaded) return null;

  return (
    <Provider  store={store}>
      <Router />
    </Provider>
  );
}
