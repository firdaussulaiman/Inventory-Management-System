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
      const lowercaseSearch = search.toLowerCase();
    
      const tempAssets = assets.filter((asset) => 
        asset.Machine_Name.toLowerCase().includes(lowercaseSearch) ||
        asset.Machine_Type.toLowerCase().includes(lowercaseSearch) ||
        asset.Serial.toLowerCase().includes(lowercaseSearch) ||
        asset.Machine_Manufacturer.toLowerCase().includes(lowercaseSearch)
      );
    
      state.filteredAssets = tempAssets;
    },
  },
});

export const { FILTER_ASSETS } = filterSlice.actions;

export const selectFilteredAssets = (state) => state.filter.filteredAssets;

export default filterSlice.reducer;
