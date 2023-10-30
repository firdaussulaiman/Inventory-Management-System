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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);

  const assetEdit = useSelector(selectAsset);

  const [asset, setAsset] = useState(assetEdit);
  const [assetImage, setAssetImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState("");

  useEffect(() => {
    dispatch(getAsset(id));
  }, [dispatch, id]);

  useEffect(() => {
    setAsset(assetEdit);

    setImagePreview(
      assetEdit && assetEdit.image ? `${assetEdit.image.filePath}` : null
    );

    setDescription(
      assetEdit && assetEdit.description ? assetEdit.description : ""
    );
  }, [assetEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAsset({ ...asset, [name]: value });
  };

  const handleImageChange = (e) => {
    setAssetImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const saveAsset = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    
    formData.append("Machine_Name", asset?.Machine_Name);
    formData.append("Machine_Type", asset?.Machine_Type);
    formData.append("Serial_Number", asset?.Serial_Number);
    formData.append("Machine_Manufacturer", asset?.Machine_Manufacturer);
    formData.append("Machine_Mac_Address", asset?.Machine_Mac_Address);
    formData.append("User_Assigned", asset?.User_Assigned);
    if(asset?.Warranty_Date) {
      formData.append("Warranty_Date", asset?.Warranty_Date);
    }

    console.log(...formData);

    await dispatch(updateAsset({ id, formData }));
    await dispatch(getAssets());
    navigate("/dashboard");
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Edit Asset</h3>
      <AssetForm
        asset={asset}
        assetImage={assetImage}
        imagePreview={imagePreview}
        description={description}
        setDescription={setDescription}
        handleInputChange={handleInputChange}
        handleImageChange={handleImageChange}
        saveAsset={saveAsset}
      />
    </div>
  );
};

export default EditAsset;
