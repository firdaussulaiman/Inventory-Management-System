import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import assetService from "./assetService"; // Import the asset service
import { toast } from "react-toastify";

const initialState = {
  asset: null, // Change "product" to "asset"
  assets: [], // Change "products" to "assets"
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  totalStoreValue: 0,
  outOfStock: 0,
  category: [],
};

// Create New Asset
export const createAsset = createAsyncThunk(
  "assets/create", // Change "products" to "assets"
  async (formData, thunkAPI) => {
    try {
      return await assetService.createAsset(formData); // Change "product" to "asset"
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
  "assets/getAll", // Change "products" to "assets"
  async (_, thunkAPI) => {
    try {
      return await assetService.getAssets(); // Change "product" to "asset"
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
  "assets/delete", // Change "products" to "assets"
  async (id, thunkAPI) => {
    try {
      return await assetService.deleteAsset(id); // Change "product" to "asset"
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
  name: "asset", // Change "product" to "asset"
  initialState,
  reducers: {
    CALC_STORE_VALUE(state, action) {
      const assets = action.payload; // Change "products" to "assets"
      const array = [];
      assets.map((item) => {
        const { price, quantity } = item;
        const assetValue = price * quantity; // Change "product" to "asset"
        return array.push(assetValue);
      });
      const totalValue = array.reduce((a, b) => {
        return a + b;
      }, 0);
      state.totalStoreValue = totalValue;
    },
    CALC_OUTOFSTOCK(state, action) {
      const assets = action.payload; // Change "products" to "assets"
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
      const assets = action.payload; // Change "products" to "assets"
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
        state.assets.push(action.payload); // Change "products" to "assets"
        toast.success("Asset added successfully"); // Change "Product" to "Asset"
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
        state.assets = action.payload; // Change "products" to "assets"
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
        toast.success("Asset deleted successfully"); // Change "Product" to "Asset"
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
        state.asset = action.payload; // Change "product" to "asset"
      })
      .addCase(getAsset.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
  },
});

export const { CALC_STORE_VALUE, CALC_OUTOFSTOCK, CALC_CATEGORY } =
  assetSlice.actions;

export const selectIsLoading = (state) => state.asset.isLoading;
export const selectProduct = (state) => state.asset.asset;
export const selectTotalStoreValue = (state) => state.asset.totalStoreValue;
export const selectOutOfStock = (state) => state.asset.outOfStock;
export const selectCategory = (state) => state.asset.category;

export default assetSlice.reducer;
