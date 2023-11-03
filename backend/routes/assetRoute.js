const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {
  createAsset,
  getAssets,
  getAsset,
  deleteAsset,
  updateAsset,
} = require("../controllers/assetController");


router.post("/", protect, createAsset);
router.patch("/:id", protect, updateAsset);
router.get("/", protect, getAssets);
router.get("/:id", protect, getAsset);
router.delete("/:id", protect, deleteAsset);

module.exports = router;
