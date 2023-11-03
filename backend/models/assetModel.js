const mongoose = require("mongoose");

const assetSchema = mongoose.Schema(
  {

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
      type: Date,
      required: [true, "Please add a warranty date"],
    },

    Status: {
      type: String,
      required: [true, "Please add a status for the asset"],
      enum: ['assigned', 'lease', 'retired', 'loan'],
      default: 'assigned', 
    }
  },
  {
    timestamps: true,
  }
);

const Asset = mongoose.model("Asset", assetSchema);
module.exports = Asset;
