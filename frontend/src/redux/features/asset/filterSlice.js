import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filteredAssets: [],
  loanAssetsCount: 0, 
  leaseAssetsCount: 0, 
  assignedAssetCount: 0, 
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    FILTER_ASSETS(state, action) {
      const { assets, search } = action.payload;
      const lowercaseSearch = search.toLowerCase();
      
      // Filter assets based on the search criteria
      const tempAssets = assets.filter((asset) =>
        (asset.Machine_Name && asset.Machine_Name.toLowerCase().includes(lowercaseSearch)) ||
        (asset.Machine_Type && asset.Machine_Type.toLowerCase().includes(lowercaseSearch)) ||
        (asset.Serial_Number && asset.Serial_Number.toLowerCase().includes(lowercaseSearch)) ||
        (asset.Machine_Manufacturer && asset.Machine_Manufacturer.toLowerCase().includes(lowercaseSearch)) ||
        (asset.Status && asset.Status.toLowerCase().includes(lowercaseSearch))
      );
      
      state.filteredAssets = tempAssets;
      
      // Calculate loan assets from the filtered assets
      state.loanAssetsCount = tempAssets.reduce((count, asset) => 
        asset.Status && asset.Status.toLowerCase() === 'loan' ? count + 1 : count, 0);
      
      // Calculate lease assets from the filtered assets
      state.leaseAssetsCount = tempAssets.reduce((count, asset) => 
        asset.Status && asset.Status.toLowerCase() === 'lease' ? count + 1 : count, 0);

         // Calculate assigned assets from the filtered assets
      state.assignedAssetCount = tempAssets.reduce((count, asset) =>
        asset.Status && asset.Status.toLowerCase() === 'assigned' ? count + 1 : count, 0);
    },
  },
});

export const { FILTER_ASSETS } = filterSlice.actions;

export const selectFilteredAssets = (state) => state.filter.filteredAssets;
export const selectLoanAssetsCount = (state) => state.filter.loanAssetsCount; // Selector for loan assets count
export const selectLeaseAssetsCount = (state) => state.filter.leaseAssetsCount; // Selector for lease assets count
export const selectAssignedAssetCount = (state) => state.filter.assignedAssetCount; // Selector for assigned assets count

export default filterSlice.reducer;
