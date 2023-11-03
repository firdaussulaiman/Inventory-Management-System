import React, { useEffect, useState } from "react";
import { SpinnerImg } from "../../loader/Loader";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import Search from "../../search/Search";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_ASSETS,
  selectFilteredAssets,
} from "../../../redux/features/asset/filterSlice";
import { DataGrid } from '@mui/x-data-grid';
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import {
  deleteAsset,
  getAssets,
} from "../../../redux/features/asset/assetSlice";
import { Link } from "react-router-dom";
import "./AssetList.scss";

const AssetList = ({ assets, isLoading }) => {
  const [search, setSearch] = useState("");
  const filteredAssets = useSelector(selectFilteredAssets);
  const dispatch = useDispatch();

  const columns = [
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
      )
    },
  ];

  const delAsset = async (id) => {
    await dispatch(deleteAsset(id));
    await dispatch(getAssets());
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete Asset",
      message: "Are you sure you want to delete this asset?",
      buttons: [
        {
          label: "Yes",
          onClick: () => delAsset(id),
        },
        {
          label: "No",
        },
      ],
    });
  };

  useEffect(() => {
    dispatch(FILTER_ASSETS({ assets, search }));
  }, [assets, search, dispatch]);

  return (
    <div className="asset-list">
      <hr />
      <div className="table-header">
        <h3>Asset list</h3>
        <Search
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      
      {isLoading && <SpinnerImg />}

      {!isLoading && assets.length === 0 ? (
        <p>-- No asset found, please add an asset...</p>
      ) : (
        <div style={{ height: 500, width: '100%' }}>
          <DataGrid 
            rows={filteredAssets.map((asset, index) => ({ ...asset, index: index +1 }))}
            columns={columns} 
            getRowId={(row) => row._id}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            sx={{
              '& .MuiDataGrid-cell': {
                fontSize: '1.3rem', 
                borderRight: '3px solid #fff',
              },
              '& .MuiDataGrid-columnSeparator': {
                display: 'none',
              },
              '& .MuiDataGrid-columnHeaders': {
                fontSize: '1.6rem', 
                borderRight: '3px solid #fff', 
              },
              '& .MuiDataGrid-row': {
                '&:last-child .MuiDataGrid-cell': {
                  borderRight: 'none',
                },
              },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default AssetList;
