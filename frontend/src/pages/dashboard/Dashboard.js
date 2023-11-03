import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AssetList from "../../components/asset/AssetList/AssetList";
import AssetSummary from "../../components/asset/AssetSummary/AssetSummary";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import { getAssets } from "../../redux/features/asset/assetSlice";
import AssetLease from "../../components/asset/AssetStatus/AssetLease/AssetLease";
import AssetLoan from "../../components/asset/AssetStatus/AssetLoan/AssetLoan";
import AssetAssigned from "../../components/asset/AssetStatus/AssetAssigned/AssetAssigned";
import AssetRetired from "../../components/asset/AssetStatus/AssetRetired/AssetRetired";
import "../../index.css"; 
import AssetOutOfWarranty from "../../components/asset/AssetStatus/AssetOutWarranty/AssetOutWarranty";
import UsersAssignedByMachineType from "../../components/asset/AssetStatus/UsersAssignedByMachineType/UsersAssignedByMachineType";

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
    <div className="dashboard-container">
        <AssetSummary assets={assets} />
      <div className="dashboard-top">
        <AssetList assets={assets} isLoading={isLoading} />
      </div>

      <div className="dashboard-bottom">
        <AssetAssigned />
        <AssetLease />
        <AssetLoan />

      </div>
      <div className="dashboard-bottom2">
<AssetRetired />
<AssetOutOfWarranty />
<UsersAssignedByMachineType />
</div>
    </div>
  );
};

export default Dashboard;
