import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import AssetForm from "../../components/asset/assetForm/AssetForm"; 
import {
  createAsset, 
  selectIsLoading,
} from "../../redux/features/asset/assetSlice"; 

const initialState = {
  Machine_Name: "",
  Machine_Type: "",
  Serial_Number: "",
  Machine_Manufacturer: "",
  Machine_Mac_Address: "",
  User_Assigned: "",
  Warranty_Date: "",
};

const AddAsset = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [asset, setAsset] = useState(initialState); 

  const isLoading = useSelector(selectIsLoading);

  const {
    Machine_Name,
    Machine_Type,
    Serial_Number,
    Machine_Manufacturer,
    Machine_Mac_Address,
    User_Assigned,
    Warranty_Date,
  } = asset;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAsset({ ...asset, [name]: value });
  };

  const saveAsset = async (e) => {
    e.preventDefault();
    const assetData = {
      Machine_Name: Machine_Name,
      Machine_Type: Machine_Type,
      Serial_Number: Serial_Number,
      Machine_Manufacturer: Machine_Manufacturer,
      Machine_Mac_Address: Machine_Mac_Address,
      User_Assigned: User_Assigned,
      Warranty_Date: Warranty_Date,
    };

    console.log("Asset Data to be sent:", assetData);

    await dispatch(createAsset(assetData)); 

    navigate("/dashboard");
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Add New Asset</h3> 
      <AssetForm 
        asset={asset} 
        handleInputChange={handleInputChange}
        saveAsset={saveAsset}
      />
    </div>
  );
};

export default AddAsset;
