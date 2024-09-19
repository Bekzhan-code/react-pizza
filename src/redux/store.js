import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import filterReducer from "./slices/filterSlice";

export const store = configureStore({
  reducer: { filter: filterReducer },
});

export const useAppDispatch = () => {
  return useDispatch();
};
