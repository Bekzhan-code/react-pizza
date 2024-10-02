import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import filterReducer from "./slices/filterSlice";
import pizzaReducer from "./slices/pizzaSlice";
import cartReducer from "./slices/cartSlice";

export const store = configureStore({
  reducer: { filter: filterReducer, pizza: pizzaReducer, cart: cartReducer },
});

export const useAppDispatch = () => {
  return useDispatch();
};
