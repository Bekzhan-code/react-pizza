import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FilterState {
  categoryInd: number;
  sortBy: string;
}

const initialState: FilterState = {
  categoryInd: 0,
  sortBy: "rating",
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategoryInd(state, action: PayloadAction<number>) {
      state.categoryInd = action.payload;
    },
    setSortType(state, action: PayloadAction<string>) {
      state.sortBy = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterState>) {
      state.categoryInd = Number(action.payload.categoryInd);
      state.sortBy = action.payload.sortBy;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCategoryInd, setSortType, setFilters } = filterSlice.actions;

export default filterSlice.reducer;
