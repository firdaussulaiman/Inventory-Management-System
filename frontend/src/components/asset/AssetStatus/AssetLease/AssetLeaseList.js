import React from 'react';
import { useSelector } from 'react-redux';
import { Paper, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { AiOutlineEye } from 'react-icons/ai';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const selectAssignedAssets = (state) =>
  state.asset.assets.filter((asset) => asset.Status && asset.Status.toLowerCase() === 'lease');

const AssetLeaseList = () => {
  const leaseAssets = useSelector(selectAssignedAssets);

  // Function to handle delete confirmation
  const confirmDelete = (assetId) => {
    // Implement the logic to confirm deletion
    console.log('Confirm deletion for asset:', assetId);
  };  const columns = [
    { field: 'index', headerName: '#', width: 150 },
    { field: 'Machine_Name', headerName: 'Machine Name', width: 150 },
    { field: 'Machine_Type', headerName: 'Machine Type', width: 150 },
    { field: 'Serial_Number', headerName: 'Serial Number', width: 130 },
    { field: 'Machine_Manufacturer', headerName: 'Machine Manufacturer', width: 170 },
    { field: 'Machine_Mac_Address', headerName: 'Machine MAC Address', width: 170 },
    { field: 'User_Assigned', headerName: 'User Assigned', width: 130 },
    { field: 'Warranty_Date', headerName: 'Warranty Date', width: 130 },
    { field: 'Status', headerName: 'Status', width: 150 },
    { 
      field: 'actions', 
      headerName: 'Actions', 
      width: 100, 
      renderCell: (params) => (
        <>
          <Link to={`/asset-detail/${params.row._id}`}>
            <AiOutlineEye size={25} color={"purple"} />
          </Link>
          <Link to={`/edit-asset/${params.row._id}`}>
            <FaEdit size={20} color={"green"} />
          </Link>
          <FaTrashAlt
            size={20}
            color={"red"}
            onClick={() => confirmDelete(params.row._id)}
          />
        </>
      ),
      sortable: false,
      filterable: false,
    },
  ];

  const rows = leaseAssets.map((asset, index) => ({
    id: asset._id,
    index: index + 1,
    ...asset,
    Warranty_Date: asset.Warranty_Date ? new Date(asset.Warranty_Date).toLocaleDateString() : 'N/A',
  }));

  return (
	
    <Paper elevation={3} sx={{ height: 650, width: '100%', padding: '1rem', margin: '1rem' }}>
      <Typography variant="h5" gutterBottom>
        Assigned Assets
      </Typography>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5, 10, 20]}
        checkboxSelection
        sx={{
          '& .MuiDataGrid-cell': {
            fontSize: '1rem',
            borderRight: '1px solid rgba(224, 224, 224, 1)'
          },
          '& .MuiDataGrid-columnHeaders': {
            fontSize: '1.2rem',
            backgroundColor: 'rgba(240, 240, 240, 1)',
          }
        }}
      />
      {leaseAssets.length === 0 && (
        <Typography sx={{ mt: 2 }}>No assigned assets to display.</Typography>
      )}
    </Paper>
  );
};


export default AssetLeaseList;
