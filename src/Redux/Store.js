import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "./Slices/users";


export  const store=configureStore({
    reducer:{
        Users: usersSlice.reducer,
    }
});