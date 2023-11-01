import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AssetList from "../../components/asset/AssetList/AssetList"; 
import AssetSummary from "../../components/asset/AssetSummary/AssetSummary"; 
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import { getAssets } from "../../redux/features/asset/assetSlice"; 
import Header from "../../components/header/Header";

const Dashboard = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { assets, isLoading, isError, message } = useSelector(
    (state) => state.asset
  );
  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getAssets());
    }

    if (isError) {
      console.log("Error message:", message); 
    }
  }, [isLoggedIn, isError, message, dispatch]);

  return (
    <div>
          <Header />
      <AssetList assets={assets} isLoading={isLoading} /> 
      <AssetSummary assets={assets} /> 
     
    </div>
  );
};

export default Dashboard;
