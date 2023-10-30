import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import AssetForm from "../../components/asset/assetForm/AssetForm"; // Change "product" to "asset"
import {
  createAsset, // Change "createProduct" to "createAsset"
  selectIsLoading,
} from "../../redux/features/asset/assetSlice"; // Change "product" to "asset"

const initialState = {
  Machine_Name: "",
  Machine_Type: "",
  Serial_Number: "",
  Machine_Manufacturer: "",
  Machine_Mac_Address: "",
  User_Assigned: "",
  Warranty_Date: "",
};

const AddAsset = () => { // Change "AddProduct" to "AddAsset"
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [asset, setAsset] = useState(initialState); // Change "product" to "asset"
  const [assetImage, setAssetImage] = useState(""); // Change "productImage" to "assetImage"
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState("");

  const isLoading = useSelector(selectIsLoading);

  const {
    Machine_Name,
    Machine_Type,
    Serial_Number,
    Machine_Manufacturer,
    Machine_Mac_Address,
    User_Assigned,
    Warranty_Date,
  } = asset; // Change "product" to "asset"

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAsset({ ...asset, [name]: value }); // Change "product" to "asset"
  };

  const handleImageChange = (e) => {
    setAssetImage(e.target.files[0]); // Change "productImage" to "assetImage"
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const saveAsset = async (e) => { // Change "saveProduct" to "saveAsset"
    e.preventDefault();
    const formData = new FormData();
    formData.append("Machine_Name", Machine_Name);
    formData.append("Machine_Type", Machine_Type);
    formData.append("Serial_Number", Serial_Number);
    formData.append("Machine_Manufacturer", Machine_Manufacturer);
    formData.append("Machine_Mac_Address", Machine_Mac_Address);
    formData.append("User_Assigned", User_Assigned);
    formData.append("Warranty_Date", Warranty_Date); // Assuming Warranty_Date is a date
    formData.append("image", assetImage); // Change "productImage" to "assetImage"

    console.log(...formData);

    await dispatch(createAsset(formData)); // Change "createProduct" to "createAsset"

    navigate("/dashboard");
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Add New Asset</h3> 
      <AssetForm // Change "ProductForm" to "AssetForm"
        asset={asset} // Change "product" to "asset"
        assetImage={assetImage} // Change "productImage" to "assetImage"
        imagePreview={imagePreview}
        description={description}
        setDescription={setDescription}
        handleInputChange={handleInputChange}
        handleImageChange={handleImageChange}
        saveAsset={saveAsset} // Change "saveProduct" to "saveAsset"
      />
    </div>
  );
};

export default AddAsset; // Change "AddProduct" to "AddAsset"
