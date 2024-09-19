import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryInd: 0,
  sortBy: "rating",
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategoryInd(state, action) {
      state.categoryInd = action.payload;
    },
    setSortType(state, action) {
      state.sortBy = action.payload;
    },
    setFilters(state, action) {
      state.categoryInd = Number(action.payload.categoryInd);
      state.sortBy = action.payload.sortBy;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCategoryInd, setSortType, setFilters } = filterSlice.actions;

export default filterSlice.reducer;
