import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredAssets: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_ASSETS(state, action) {
      const { assets, search } = action.payload;
      const tempAssets = assets.filter(
        (asset) =>
          asset.name.toLowerCase().includes(search.toLowerCase()) ||
          asset.category.toLowerCase().includes(search.toLowerCase())
      );

      state.filteredAssets = tempAssets;
    },
  },
});

export const { FILTER_ASSETS } = filterSlice.actions;

export const selectFilteredAssets = (state) => state.filter.filteredAssets;

export default filterSlice.reducer;
