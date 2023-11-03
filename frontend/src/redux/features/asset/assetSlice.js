import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import assetService from "./assetService"; 
import { toast } from "react-toastify";

const initialState = {
  asset: null, 
  assets: [], 
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  windowsAssetsCount: 0,
  macintoshAssetsCount: 0,
};

// Create New Asset
export const createAsset = createAsyncThunk(
  "assets/create", 
  async (formData, thunkAPI) => {
    try {
      return await assetService.createAsset(formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get all assets
export const getAssets = createAsyncThunk(
  "assets/getAll",
  async (_, thunkAPI) => {
    try {
      return await assetService.getAssets();  
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete an Asset
export const deleteAsset = createAsyncThunk(
  "assets/delete",
  async (id, thunkAPI) => {
    try {
      return await assetService.deleteAsset(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get an Asset
export const getAsset = createAsyncThunk(
  "assets/getAsset", 
  async (id, thunkAPI) => {
    try {
      return await assetService.getAsset(id); 
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update Asset
export const updateAsset = createAsyncThunk(
  "assets/updateAsset", 
  async ({ id, formData }, thunkAPI) => {
    try {
      return await assetService.updateAsset(id, formData); 
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const assetSlice = createSlice({
  name: "asset", 
  initialState,
  reducers: {
  
    CALC_WINDOWS_ASSETS(state, action) {
      state.windowsAssetsCount = action.payload.filter(asset => asset.Machine_Manufacturer === 'Dell').length;
    },
    CALC_MACINTOSH_ASSETS(state, action) {
      state.macintoshAssetsCount = action.payload.filter(asset => asset.Machine_Manufacturer === 'Macintosh').length;
    
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAsset.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAsset.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.assets.push(action.payload);
        toast.success("Asset added successfully");
      })
      .addCase(createAsset.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getAssets.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAssets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.assets = action.payload;
      })
      .addCase(getAssets.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(deleteAsset.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAsset.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Asset deleted successfully");
      })
      .addCase(deleteAsset.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getAsset.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAsset.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.asset = action.payload;
      })
      .addCase(getAsset.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(updateAsset.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAsset.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Product updated successfully");
      })
      .addCase(updateAsset.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
  
});

export const { CALC_WINDOWS_ASSETS, CALC_MACINTOSH_ASSETS } = assetSlice.actions;

export const selectIsLoading = (state) => state.asset.isLoading;
export const selectAsset = (state) => state.asset.asset;

export const selectWindowsAssetsCount = (state) => state.asset.windowsAssetsCount;
export const selectMacintoshAssetsCount = (state) => state.asset.macintoshAssetsCount;

export default assetSlice.reducer;
