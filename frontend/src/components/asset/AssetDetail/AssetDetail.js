import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useRedirectLoggedOutUser from "../../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../../redux/features/auth/authSlice";
import { getAsset } from "../../../redux/features/asset/assetSlice";
import Card from "../../card/Card";
import { SpinnerImg } from "../../loader/Loader";
import "./AssetDetail.scss";

const AssetDetail = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();
  const { id } = useParams();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { asset, isLoading, isError, message } = useSelector((state) => state.asset);

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getAsset(id));
    }
    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch, id]); // Ensure 'id' is in the dependency array if it's being used in the effect

  // Capitalize the first letter of the status
  const formatStatus = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <div className="asset-detail">
      <h3 className="--mt">Asset Detail</h3>
      <Card cardClass="card">
        {isLoading && <SpinnerImg />}
        {!isLoading && asset && (
          <div className="detail">
            <h4><span className="badge">Machine Name: </span> &nbsp; {asset.Machine_Name}</h4>
            <p><b>&rarr; Machine Type : </b> {asset.Machine_Type}</p>
            <p><b>&rarr; Serial Number : </b> {asset.Serial_Number}</p>
            <p><b>&rarr; Manufacturer : </b> {asset.Machine_Manufacturer}</p>
            <p><b>&rarr; MAC Address : </b> {asset.Machine_Mac_Address}</p>
            <p><b>&rarr; User Assigned : </b> {asset.User_Assigned}</p>
            <p><b>&rarr; Warranty Date : </b> {new Date(asset.Warranty_Date).toLocaleDateString("en-US")}</p>
            <p><b>&rarr; Status : </b> {formatStatus(asset.Status)}</p>
            <hr />
            <code className="--color-dark">Created on: {new Date(asset.createdAt).toLocaleString("en-US")}</code>
            <br />
            <code className="--color-dark">Last Updated: {new Date(asset.updatedAt).toLocaleString("en-US")}</code>
          </div>
        )}
      </Card>
    </div>
  );
};

export default AssetDetail;
