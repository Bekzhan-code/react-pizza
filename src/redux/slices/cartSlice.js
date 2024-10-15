import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async () => {
    const { data } = await axios.get("https://eaed36219e51a8b4.mokky.dev/cart");
    return data;
  }
);

export const postCartItem = createAsyncThunk(
  "cart/postCartItem",
  async (newItem, { getState, dispatch }) => {
    const state = getState();

    const existingItem = findExistingItem(state.cart.items, newItem);

    dispatch(addItem(newItem));
    if (!existingItem) {
      const { data } = await axios.post(
        `https://eaed36219e51a8b4.mokky.dev/cart`,
        {
          ...newItem,
          count: 1,
        }
      );
      return data;
    } else {
      const { data: fetchData } = await axios.get(
        `https://eaed36219e51a8b4.mokky.dev/cart?pizzaId=${existingItem.pizzaId}&type=${existingItem.type}&size=${existingItem.size}`
      );
      const { data: patchData } = await axios.patch(
        `https://eaed36219e51a8b4.mokky.dev/cart/${fetchData[0].id}`,
        { count: existingItem.count + 1 }
      );
      return patchData;
    }
  }
);

export const deleteAllCartItems = createAsyncThunk(
  "cart/deleteAllCartItems",
  async () => {
    const { data } = await axios.patch(
      "https://eaed36219e51a8b4.mokky.dev/cart",
      []
    );
    return data;
  }
);

export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async (item, { dispatch }) => {
    let response;
    if (item.id)
      response = await axios.delete(
        `https://eaed36219e51a8b4.mokky.dev/cart/${item.id}`
      );
    dispatch(removeItem(item));
    return response.data;
  }
);

export const decrementCartItem = createAsyncThunk(
  "cart/decrementCartItem",
  async (item, { dispatch }) => {
    let response;
    if (item.count === 1) {
      dispatch(removeItem(item));
      response = await axios.delete(
        `https://eaed36219e51a8b4.mokky.dev/cart/${item.id}`
      );
    } else {
      dispatch(decrementItem(item.id));
      response = await axios.patch(
        `https://eaed36219e51a8b4.mokky.dev/cart/${item.id}`,
        { count: item.count - 1 }
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

const findExistingItem = (items, newItem) => {
  return items.find((item) => {
    if (
      item.pizzaId === newItem.pizzaId &&
      item.type === newItem.type &&
      item.size === newItem.size
    )
      return item;
  });
};

const removeItemFromArr = (items, deleteItem) => {
  return items.filter((item) => item !== deleteItem);
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;

      // если размер или тип пиццы отлчиается от пицц в корзине (даже если id равные), то пицца добавляется как новый элемент
      const existingItem = findExistingItem(state.items, newItem);
      if (existingItem) existingItem.count += 1;
      else state.items.push({ ...newItem, count: 1 });

      state.totalPrice += newItem.price;
      state.totalCount += 1;
    },
    removeItem(state, action) {
      const itemToDelete = findExistingItem(state.items, action.payload);
      state.items = removeItemFromArr(state.items, itemToDelete);
      state.totalPrice -= itemToDelete.price * itemToDelete.count;
      state.totalCount -= itemToDelete.count;
    },
    decrementItem(state, action) {
      const itemToDecrement = state.items.find(
        (item) => item.id === action.payload
      );
      itemToDecrement.count -= 1;

      state.totalCount -= 1;
      state.totalPrice -= itemToDecrement.price;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postCartItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postCartItem.fulfilled, (state, action) => {
        state.status = "success";
      })
      .addCase(postCartItem.rejected, (state) => {
        state.status = "error";
      })
      .addCase(fetchCartItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.status = "success";
        state.items = action.payload;
        state.totalCount = action.payload.reduce(
          (acc, item) => acc + item.count,
          0
        );
        state.totalPrice = action.payload.reduce(
          (acc, item) => acc + item.count * item.price,
          0
        );
      })
      .addCase(fetchCartItems.rejected, (state) => {
        state.status = "error";
      })
      .addCase(deleteCartItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.status = "success";
      })
      .addCase(deleteCartItem.rejected, (state) => {
        state.status = "error";
      })
      .addCase(deleteAllCartItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteAllCartItems.fulfilled, (state, action) => {
        state.status = "success";
        state.items = [];
        state.totalCount = 0;
        state.totalPrice = 0;
      })
      .addCase(deleteAllCartItems.rejected, (state) => {
        state.status = "error";
      })
      .addCase(decrementCartItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(decrementCartItem.fulfilled, (state, action) => {
        state.status = "success";
      })
      .addCase(decrementCartItem.rejected, (state) => {
        state.status = "error";
      });
  },
});

// Action creators are generated for each case reducer function
export const { addItem, removeItem, decrementItem } = cartSlice.actions;

export default cartSlice.reducer;
