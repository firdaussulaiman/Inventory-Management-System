const asyncHandler = require("express-async-handler");
const Asset = require("../models/assetModel"); 


// Create Asset
const createAsset = asyncHandler(async (req, res) => { 
  const { Machine_Name, Machine_Type, Serial_Number, Machine_Manufacturer, Machine_Mac_Address, User_Assigned, Warranty_Date, Status } = req.body;

  console.log(req.body);
  // Validation
  if (!Machine_Name || !Machine_Type || !Serial_Number || !Machine_Manufacturer || !Machine_Mac_Address || !User_Assigned || !Warranty_Date || !Status) {
    res.status(400);
    throw new Error("All fields including 'Status' are required.");
  }
  console.log(req.body);

  // Create Asset
  const asset = await Asset.create({
    user: req.user.id,
    Machine_Name,
    Machine_Type,
    Serial_Number,
    Machine_Manufacturer,
    Machine_Mac_Address,
    User_Assigned,
    Warranty_Date,
    Status
  });

  res.status(201).json(asset); 
});

// Get all assets
const getAssets = asyncHandler(async (req, res) => { 
  const assets = await Asset.find({ user: req.user.id }).sort("-createdAt");
  res.status(200).json(assets); 
});

// Get single asset
const getAsset = asyncHandler(async (req, res) => {
  const asset = await Asset.findById(req.params.id); 
  // If asset doesn't exist
  if (!asset) {
    res.status(404);
    throw new Error("Asset not found");
  }
  // Match asset to its user
  if (asset.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  res.status(200).json(asset);
});

// Delete Asset
const deleteAsset = asyncHandler(async (req, res) => {
  const asset = await Asset.findById(req.params.id); // Changed 'product' to 'asset'
  // If asset doesn't exist
  if (!asset) {
    res.status(404);
    throw new Error("Asset not found");
  }
  // Match asset to its user
  if (asset.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  await asset.remove();
  res.status(200).json({ message: "Asset deleted" });
});

// Update Asset
const updateAsset = asyncHandler(async (req, res) => {
  const { Machine_Name, Machine_Type, Serial_Number, Machine_Manufacturer, Machine_Mac_Address, User_Assigned, Warranty_Date, Status } = req.body;
  const { id } = req.params;

  const asset = await Asset.findById(id);

  if (!asset) {
    res.status(404);
    throw new Error("Asset not found");
  }

  if (asset.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  if (Status && !['assigned', 'lease', 'retired', 'loan'].includes(Status)) {
    res.status(400);
    throw new Error("Invalid 'Status' value. It must be one of 'assigned', 'lease', 'retired', 'loan'.");
  }

  // Update Asset
  const updatedAsset = await Asset.findByIdAndUpdate(
    id,
    { $set: { Machine_Name, Machine_Type, Serial_Number, Machine_Manufacturer, Machine_Mac_Address, User_Assigned, Warranty_Date, Status } },
    { new: true, runValidators: true }
  );

  res.status(200).json(updatedAsset);
});

module.exports = {
  createAsset, 
  getAssets, 
  getAsset,
  deleteAsset, 
  updateAsset 
};
