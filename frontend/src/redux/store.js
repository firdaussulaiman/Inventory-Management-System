import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/features/auth/authSlice";
import assetReducer from "./features/asset/assetSlice";
import filterReducer from "./features/asset/filterSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    asset: assetReducer,
    filter: filterReducer,
  },
});
