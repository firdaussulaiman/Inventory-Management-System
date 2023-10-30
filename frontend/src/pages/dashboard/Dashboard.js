import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AssetList from "../../components/asset/assetList/AssetList"; // Change "product" to "asset"
import AssetSummary from "../../components/asset/assetSummary/AssetSummary"; // Change "product" to "asset"
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import { getAssets } from "../../redux/features/asset/assetSlice"; // Change "getProducts" to "getAssets"

const Dashboard = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { assets, isLoading, isError, message } = useSelector(
    (state) => state.asset // Change "product" to "asset"
  );

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getAssets()); // Change "getProducts" to "getAssets"
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  return (
    <div>
      <AssetSummary assets={assets} /> 
      <AssetList assets={assets} isLoading={isLoading} /> 
    </div>
  );
};

export default Dashboard;
