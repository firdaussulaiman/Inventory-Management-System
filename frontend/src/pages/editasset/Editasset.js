import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import AssetForm from "../../components/asset/assetForm/AssetForm";
import {
  getAsset,
  getAssets,
  selectIsLoading,
  selectAsset,
  updateAsset,
} from "../../redux/features/asset/assetSlice";

const EditAsset = () => {
  const { id } = useParams();
  console.log("Asset ID: ", id); // Log the asset ID

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);
  const assetEdit = useSelector(selectAsset);
  const [asset, setAsset] = useState(assetEdit || {});

  // Fetch the asset on mount and when the id changes
  useEffect(() => {
    if (id) {
      console.log("Dispatching getAsset with ID: ", id); // Log before dispatch
      dispatch(getAsset(id));
    }
  }, [dispatch, id]);

  // Update local state when assetEdit changes
  useEffect(() => {
    console.log("Asset fetched for edit: ", assetEdit); // Log the fetched asset
    if (assetEdit) {
      setAsset(assetEdit);
    }
  }, [assetEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(`Input changed: ${name} = `, value); // Log the input change
    setAsset((prev) => {
      const updatedAsset = { ...prev, [name]: value };
      console.log("Updated asset state: ", updatedAsset); // Log the updated asset state
      return updatedAsset;
    });
  };

  const saveAsset = async (e) => {
    e.preventDefault();
    console.log("Saving asset with state: ", asset); // Log before saving asset
    const formData = new FormData();

    Object.entries(asset).forEach(([key, value]) => {
      if (value != null) {
        formData.append(key, value);
      }
    });

    try {
      const response = await dispatch(updateAsset({ id, formData }));
      console.log("Update asset response: ", response); // Log the response from update
      await dispatch(getAssets());
      navigate("/dashboard");
      console.log("Navigating to dashboard after asset update"); // Log after navigation
    } catch (error) {
      console.error("Update asset error: ", error); // Log if there is an error
    }
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Edit Asset</h3>
      <AssetForm
        asset={asset}
        handleInputChange={handleInputChange}
        saveAsset={saveAsset}
      />
    </div>
  );
};

export default EditAsset;
