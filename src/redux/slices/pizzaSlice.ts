import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export type PizzaItem = {
  id: number;
  imageUrl: string;
  title: string;
  price: number;
  category: number;
  rating: number;
};

interface PizzaState {
  items: PizzaItem[];
  status: string;
}

type SearchPizzaParams = {
  categoryInd: number;
  sortBy: string;
};

export const fetchPizzas = createAsyncThunk<PizzaItem[], SearchPizzaParams>(
  "pizza/fetchPizzas",
  async ({ categoryInd, sortBy }) => {
    const { data } = await axios.get<PizzaItem[]>(
      `https://eaed36219e51a8b4.mokky.dev/items?${
        categoryInd !== 0 ? `category=${categoryInd}` : ""
      }&sortBy=${sortBy}`
    );
    return data;
  }
);

const initialState: PizzaState = {
  items: [],
  status: "loading", // loading | success | error
};

export const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.items = [];
        state.status = "loading";
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "success";
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.items = [];
        state.status = "error";
      });
  },
});

// Action creators are generated for each case reducer function
export const {} = pizzaSlice.actions;

export default pizzaSlice.reducer;
