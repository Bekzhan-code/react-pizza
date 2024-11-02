import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import filterReducer from "./slices/filterSlice";
import pizzaReducer from "./slices/pizzaSlice";
import cartReducer from "./slices/cartSlice";

export const store = configureStore({
  reducer: { filter: filterReducer, pizza: pizzaReducer, cart: cartReducer },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
