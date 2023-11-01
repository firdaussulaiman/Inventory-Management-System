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
  outOfStock: 0,
  category: [],
};

// Create New Asset
export const createAsset = createAsyncThunk(
  "assets/create", 
  async (formData, thunkAPI) => {
    try {
      const response = await assetService.createAsset(formData);
      console.log("Asset creation response:", response);
      return response;
    } catch (error) {
      console.log("Error in asset creation:", error);
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
  "assets/getAsset", // Change "products" to "assets"
  async (id, thunkAPI) => {
    try {
      return await assetService.getAsset(id); // Change "product" to "asset"
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
  "assets/updateAsset", // Change "products" to "assets"
  async ({ id, formData }, thunkAPI) => {
    try {
      return await assetService.updateAsset(id, formData); // Change "product" to "asset"
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
  
    CALC_OUTOFSTOCK(state, action) {
      const assets = action.payload; 
      const array = [];
      assets.map((item) => {
        const { quantity } = item;
        return array.push(quantity);
      });
      let count = 0;
      array.forEach((number) => {
        if (number === 0 || number === "0") {
          count += 1;
        }
      });
      state.outOfStock = count;
    },
    CALC_CATEGORY(state, action) {
      const assets = action.payload; 
      const array = [];
      assets.map((item) => {
        const { category } = item;
        return array.push(category);
      });
      const uniqueCategory = [...new Set(array)];
      state.category = uniqueCategory;
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
        console.log(action.payload);
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
        console.log(action.payload);
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
  },
});

export const {  CALC_OUTOFSTOCK, CALC_CATEGORY } =
  assetSlice.actions;

export const selectIsLoading = (state) => state.asset.isLoading;
export const selectAsset = (state) => state.asset.asset;
export const selectOutOfStock = (state) => state.asset.outOfStock;
export const selectCategory = (state) => state.asset.category;

export default assetSlice.reducer;
