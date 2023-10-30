import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Card from "../../card/Card";

import "./AssetForm.scss";

const AssetForm = ({
  asset,
  description,
  setDescription,
  handleInputChange,
  saveAsset,
}) => {
  return (
    <div className="add-asset">
      <Card cardClass={"card"}>
        <form onSubmit={saveAsset}>
          <label>Machine Name:</label>
          <input
            type="text"
            placeholder="Machine Name"
            name="Machine_Name"
            value={asset?.Machine_Name}
            onChange={handleInputChange}
          />

          <label>Machine Type:</label>
          <input
            type="text"
            placeholder="Machine Type"
            name="Machine_Type"
            value={asset?.Machine_Type}
            onChange={handleInputChange}
          />

          <label>Serial Number:</label>
          <input
            type="text"
            placeholder="Serial Number"
            name="Serial_Number"
            value={asset?.Serial_Number}
            onChange={handleInputChange}
          />

          <label>Machine Manufacturer:</label>
          <input
            type="text"
            placeholder="Machine Manufacturer"
            name="Machine_Manufacturer"
            value={asset?.Machine_Manufacturer}
            onChange={handleInputChange}
          />

          <label>Machine MAC Address:</label>
          <input
            type="text"
            placeholder="Machine MAC Address"
            name="Machine_Mac_Address"
            value={asset?.Machine_Mac_Address}
            onChange={handleInputChange}
          />

          <label>User Assigned:</label>
          <input
            type="text"
            placeholder="User Assigned"
            name="User_Assigned"
            value={asset?.User_Assigned}
            onChange={handleInputChange}
          />

          <label>Warranty Date:</label>
          <input
            type="date"
            name="Warranty_Date"
            value={asset?.Warranty_Date}
            onChange={handleInputChange}
          />

          <label>Asset Description:</label>
          <ReactQuill
            theme="snow"
            value={description}
            onChange={setDescription}
            modules={AssetForm.modules}
            formats={AssetForm.formats}
          />

          <div className="--my">
            <button type="submit" className="--btn --btn-primary">
              Save Asset
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

AssetForm.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["clean"],
  ],
};
AssetForm.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "color",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "video",
  "code-block",
  "align",
];

export default AssetForm;
