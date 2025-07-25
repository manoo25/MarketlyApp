import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "./Slices/users";
import companiesReducer from "./Slices/companiesSlice";
import productsSlice from "./Slices/productsSlice";


export  const store = configureStore({
  reducer: {
    Users: usersSlice.reducer,
    companies: companiesReducer.reducer,
    products: productsSlice.reducer,
  },
});