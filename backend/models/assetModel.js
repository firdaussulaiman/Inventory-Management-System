const mongoose = require("mongoose");

const assetSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    Machine_Name: {
      type: String,
      required: [true, "Please add a name"],
      trim: true,
    },
    Machine_Type: {
      type: String,
      required: [true, "Please add a type"],
      trim: true,
    },
    Serial_Number: {
      type: String,
      required: [true, "Please add a serial number"],
      trim: true,
    },
    Machine_Manufacturer: {
      type: String,
      required: [true, "Please add a manufacturer"],
      trim: true,
    },
    Machine_Mac_Address: {
      type: String,
      required: [true, "Please add a MAC address"],
      trim: true,
    },
    User_Assigned: {
      type: String,
      required: [true, "Please specify a user assigned"],
      trim: true,
    },
    Warranty_Date: {
      type: Date, // Assuming Warranty_Date is a date
      required: [true, "Please add a warranty date"],
    },
    image: {
      type: Object,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

const Asset = mongoose.model("Asset", assetSchema); // Changed "Product" to "Asset"
module.exports = Asset;
