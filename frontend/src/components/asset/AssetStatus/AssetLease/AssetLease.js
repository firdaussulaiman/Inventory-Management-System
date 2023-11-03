import React from 'react';
import { useSelector } from 'react-redux';
import {
  Paper,
  Typography,Button 
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { Link } from 'react-router-dom';

const AssetLease = () => {
  const assets = useSelector((state) => state.asset.assets);
  const leaseAssetsCount = useSelector(
    (state) => state.filter.leaseAssetsCount
  );
  const leaseMachines = assets.filter(
    (asset) => asset.Status && asset.Status.toLowerCase() === 'lease'
  );

  // Calculate lease asset counts by machine type
  const leaseAssetCountsByType = leaseMachines.reduce(
    (countByType, machine) => {
      const machineType = machine.Machine_Type;
      countByType[machineType] = (countByType[machineType] || 0) + 1;
      return countByType;
    },
    {}
  );

  // Prepare data for the bar chart
  const chartData = Object.entries(leaseAssetCountsByType).map(
    ([machineType, count]) => ({
      machineType,
      count,
    })
  );

  return (
    <Paper elevation={3} sx={{ padding: '1rem', margin: '1rem' }}>
      <Typography variant="h5" gutterBottom>
        Lease Machines - {leaseAssetsCount}
      </Typography>
      <Button
        component={Link}
        to="/assetslease" // This should match with your Route path
        variant="contained"
        color="primary"
        sx={{ marginBottom: '1rem' }}
      >
        View Asset List
      </Button>
      {leaseMachines.length > 0 ? (
        <div>
          <BarChart width={500} height={300} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="machineType" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#0E542A" />
          </BarChart>
        </div>
      ) : (
        <Typography>No Lease Machines available.</Typography>
      )}
    </Paper>
  );
};

export default AssetLease;
