import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async () => {}
);

export const postCartItems = createAsyncThunk(
  "cart/postCartItems",
  async (newItem, { getState }) => {
    // const state = getState();
    // const curCartItems = state.cart.items;
    // console.log("from postCartItems", curCartItems);
    // const { data } = await axios.post(
    //   "https://eaed36219e51a8b4.mokky.dev/cart",
    //   state.cart.items
    // );
    // return data;

    console.log("in postCartItems async func");
    const state = getState();
    const existingItem = findExistingItem(state.cart, newItem);
    let response;
    if (existingItem) {
      console.log("postCartItems exists:", existingItem);
      response = await axios.patch(
        `https://eaed36219e51a8b4.mokky.dev/cart/${newItem.id}`,
        { count: newItem.count + 1 }
      );
    } else {
      console.log("postCartItems doesnt exist:", existingItem);
      response = await axios.post(
        "https://eaed36219e51a8b4.mokky.dev/cart",
        newItem
      );
    }
    return response.data;
  }
);

const initialState = {
  items: [],
  status: "loading", // loading | success | error
  totalPrice: 0,
  totalCount: 0,
};

const findExistingItem = (state, newItem) => {
  return state.items.find((item) => {
    if (
      item.id === newItem.id &&
      item.type === newItem.type &&
      item.size === newItem.size
    )
      return item;
  });
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;

      // если размер или тип пиццы отлчиается от пицц в корзине (даже если id равные), то пицца добавляется как новый элемент
      const existingItem = findExistingItem(state, newItem);
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
