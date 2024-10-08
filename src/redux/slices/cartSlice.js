import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async () => {}
);

export const postCartItems = createAsyncThunk(
  "cart/postCartItems",
  async (_, { getState }) => {
    const state = getState();
    const { data } = await axios.post(
      "https://eaed36219e51a8b4.mokky.dev/items",
      state.cart.items
    );
    return data;
  }
);

const initialState = {
  items: [],
  status: "loading", // loading | success | error
  totalPrice: 0,
  totalCount: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;

      // если размер или тип пиццы отлчиается от пицц в корзине (даже если id равные), то пицца добавляется как новый элемент
      const existingItem = state.items.find((item) => {
        if (
          item.id === newItem.id &&
          item.type === newItem.type &&
          item.size === newItem.size
        )
          return item;
      });
      if (existingItem) existingItem.count += 1;
      else state.items.push({ ...newItem, count: 1 });

      state.totalPrice += newItem.price;
      state.totalCount += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postCartItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postCartItems.fulfilled, (state, action) => {
        state.status = "success";
      })
      .addCase(postCartItems.rejected, (state) => {
        state.status = "error";
      });
  },
});

// Action creators are generated for each case reducer function
export const { addItem } = cartSlice.actions;

export default cartSlice.reducer;
