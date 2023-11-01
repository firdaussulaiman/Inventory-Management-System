import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const API_URL = `${BACKEND_URL}/api/assets/`; // Change "products" to "assets"

const createAsset = async (assetData) => {
  const response = await axios.post(API_URL, assetData, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return response.data;
};


// Get all assets
const getAssets = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Delete an Asset
const deleteAsset = async (id) => {
  const response = await axios.delete(API_URL + id);
  return response.data;
};

// Get an Asset
const getAsset = async (id) => {
  const response = await axios.get(API_URL + id);
  return response.data;
};

// Update Asset
const updateAsset = async (id, formData) => {
  const response = await axios.patch(`${API_URL}${id}`, formData);
  return response.data;
};

const assetService = {
  createAsset,
  getAssets,
  getAsset,
  deleteAsset,
  updateAsset,
};

export default assetService;
