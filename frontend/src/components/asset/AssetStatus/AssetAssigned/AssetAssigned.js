import React from 'react';
import { useSelector } from 'react-redux';
import { Paper, Typography, Button } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Link } from 'react-router-dom';

// This selector should be defined in your Redux slice
const selectAssignedAssets = (state) =>
  state.asset.assets.filter((asset) => asset.Status && asset.Status.toLowerCase() === 'assigned');

const AssetAssigned = () => {
  const assignedMachines = useSelector(selectAssignedAssets);

  // Calculate assigned asset counts by machine type
  const assignedAssetCountsByType = assignedMachines.reduce((countByType, machine) => {
    const machineType = machine.Machine_Type || 'Unknown'; // Fallback to 'Unknown' if Machine_Type is not defined
    countByType[machineType] = (countByType[machineType] || 0) + 1;
    return countByType;
  }, {});

  // Prepare data for the bar chart
  const chartData = Object.entries(assignedAssetCountsByType).map(([machineType, count]) => ({
    machineType,
    count,
  }));

  return (
    <Paper elevation={3} sx={{ padding: '1rem', margin: '1rem' }}>
      <Typography variant="h5" gutterBottom>
        Assigned Machines - {assignedMachines.length}
      </Typography>
      <Button
        component={Link}
        to="/assetsAssigned" // This should match with your Route path
        variant="contained"
        color="primary"
        sx={{ marginBottom: '1rem' }}
      >
        View Asset List
      </Button>
      {assignedMachines.length > 0 ? (
        <div>
          <BarChart width={500} height={300} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="machineType" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#30233E" />
          </BarChart>
        </div>
      ) : (
        <Typography>No Assigned Machines available.</Typography>
      )}
    </Paper>
  );
};

export default AssetAssigned;
