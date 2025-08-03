import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginPage from "../Pages/LoginPage";
import IntroPage from "../Pages/intro";
import RegisterPage from "../Pages/RegisterPage";
import ForgetPasswordPage from "../Pages/ForgetPasswordPage";
import ResetPasswordForm from "../Components/ForgetPassword/ResetPassword";
import { PATHS } from "./Paths";
import BottomTabs from "./BottomTabs";
import AllCategoriesScreen from "../Pages/categories/AllCategoriesScreen";
import CategoryProductsPage from '../Pages/categories/CategoryProductsPage';
import AllCompaniesScreen from "../Pages/companies/AllCompaniesScreen";
import CompanyProductsScreen from "../Pages/companies/CompanyProductsScreen";
import OffersPage from "../Pages/OffersPage";
import OrderDetails from '../Pages/OrderDetails';
import AccountDetails from '../Pages/AccountDetails';
import SavedAdresses from '../Pages/SavedAdresses';
import ChangePassword from '../Pages/ChangePassword';
import ProductDetails from '../Pages/ProductDetails';
import TraderProducts from "../Pages/TraderProducts/TraderProducts";
import Search from "../Pages/search";
import Cart from "../Pages/Cart";
import DelegatorOrderDetails from "../Pages/delegator/delegatorOrderDetails";
import DelegatesBottomTabs from "./delegatesRoute/delegatesBottomTabs";
import DelegatorAddToCart from "../Pages/delegator/delegatorAddTocart";
import DelegatorOrders from "../Pages/delegator/delegatorOrders";
import { DelegatesPaths } from "./delegatesRoute/delegatesPaths";
import DelegatorResetPasswordForm from "../Components/ForgetPassword/delegatorResetPAss";
import Orders from "../Pages/orders";





export default function Router() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* <Stack.Screen name={PATHS.Search} component={Search} /> */}
        <Stack.Screen name={PATHS.Intro} component={IntroPage} />
        <Stack.Screen name={PATHS.Login} component={LoginPage} />
        <Stack.Screen name={PATHS.Register} component={RegisterPage} />
        <Stack.Screen name={PATHS.Home} component={BottomTabs} />
        <Stack.Screen name={DelegatesPaths.DelegatorProducts} component={DelegatesBottomTabs} />

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
        <Stack.Screen
          name={PATHS.TraderProducts}
          component={TraderProducts}
        />
        <Stack.Screen name={PATHS.OffersPage} component={OffersPage} />
        <Stack.Screen
          name={PATHS.OrderDetails}
          component={OrderDetails}
        />
        <Stack.Screen
          name={PATHS.CartScreen}
          component={Cart}
        />
        <Stack.Screen
          name={PATHS.Orders}
          component={Orders}
        />
        <Stack.Screen
          name={PATHS.ProductDetails}
          component={ProductDetails}
        />
        <Stack.Screen name={PATHS.AccountDetails} component={AccountDetails} />
        <Stack.Screen name={PATHS.SavedAdresses} component={SavedAdresses} />
        <Stack.Screen name={PATHS.ChangePassword} component={ChangePassword} />

        <Stack.Screen
          name={PATHS.AllCompaniesScreen}
          component={AllCompaniesScreen}
        />
        <Stack.Screen
          name={PATHS.CompanyProductsScreen}
          component={CompanyProductsScreen}
        />
        <Stack.Screen
          name={PATHS.Search}
          component={Search}
        />
      
          {/* <Stack.Screen name={DelegatesPaths.delegatorProducts} component={delegatorProducts} /> */}
                <Stack.Screen name={DelegatesPaths.DelegatorAddToCart} component={DelegatorAddToCart} />
                <Stack.Screen name={DelegatesPaths.DelegatorOrderDetails} component={DelegatorOrderDetails} />
                <Stack.Screen name={DelegatesPaths.DelegatorOrders} component={DelegatorOrders} />
                <Stack.Screen name={DelegatesPaths.DelegatorResetPasswordForm} component={DelegatorResetPasswordForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
