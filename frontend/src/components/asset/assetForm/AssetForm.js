import React from "react";
import { TextField, MenuItem, Button, FormControl, InputLabel, Select, Card, CardContent } from '@mui/material';
import "./AssetForm.scss";

const AssetForm = ({ asset, handleInputChange, saveAsset }) => {
  const formattedDate = asset.Warranty_Date ? asset.Warranty_Date.split('T')[0] : '';

  return (
    <div className="add-asset">
      <Card className="card">
        <CardContent>
          <form onSubmit={saveAsset}>
            <TextField
              label="Machine Name"
              placeholder="Machine Name"
              name="Machine_Name"
              value={asset.Machine_Name || ''}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />

            <TextField
              label="Machine Type"
              placeholder="Machine Type"
              name="Machine_Type"
              value={asset.Machine_Type || ''}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />

            <TextField
              label="Serial Number"
              placeholder="Serial Number"
              name="Serial_Number"
              value={asset.Serial_Number || ''}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />

            <TextField
              label="Machine Manufacturer"
              placeholder="Machine Manufacturer"
              name="Machine_Manufacturer"
              value={asset.Machine_Manufacturer || ''}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />

            <TextField
              label="Machine MAC Address"
              placeholder="Machine MAC Address"
              name="Machine_Mac_Address"
              value={asset.Machine_Mac_Address || ''}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />

            <TextField
              label="User Assigned"
              placeholder="User Assigned"
              name="User_Assigned"
              value={asset.User_Assigned || ''}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />

            <TextField
              label="Warranty Date"
              type="date"
              name="Warranty_Date"
              value={formattedDate}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />

            <FormControl fullWidth margin="normal">
              <InputLabel>Status</InputLabel>
              <Select
                name="Status"
                value={asset.Status || 'assigned'}
                label="Status"
                onChange={handleInputChange}
              >
                <MenuItem value="assigned">Assigned</MenuItem>
                <MenuItem value="lease">Lease</MenuItem>
                <MenuItem value="retired">Retired</MenuItem>
                <MenuItem value="loan">Loan</MenuItem>
              </Select>
            </FormControl>

            <div className="--my">
              <Button type="submit" variant="contained" color="primary">
                Save Asset
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AssetForm;
