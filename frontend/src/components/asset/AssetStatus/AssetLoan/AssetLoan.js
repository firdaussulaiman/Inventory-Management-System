import React from 'react';
import { useSelector } from 'react-redux';
import {
  Paper,
  Typography,
  Button,
} from '@mui/material';
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell,
} from 'recharts';
import { Link } from 'react-router-dom';

const AssetLoan = () => {
  const assets = useSelector((state) => state.asset.assets);
  const loanAssetsCount = useSelector(
    (state) => state.filter.assignedAssetsCount
  );
  const loanMachines = assets.filter(
    (asset) => asset.Status && asset.Status.toLowerCase() === 'loan'
  );

  // Calculate loan asset counts by machine type
  const loanAssetCountsByType = loanMachines.reduce((countByType, machine) => {
    const machineType = machine.Machine_Type;
    countByType[machineType] = (countByType[machineType] || 0) + 1;
    return countByType;
  }, {});

  // Prepare data for the pie chart
  const chartData = Object.entries(loanAssetCountsByType).map(
    ([machineType, count]) => ({
      machineType,
      count,
    })
  );

  // Define custom colors for the pie chart segments
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

  return (
    <Paper elevation={3} sx={{ padding: '1rem', margin: '1rem' }}>
      <Typography variant="h5" gutterBottom>
     Loan Out  Machines - {loanAssetsCount}
      </Typography>
      <Button
        component={Link}
        to="/assetsloan" // This should match with your Route path
        variant="contained"
        color="primary"
        sx={{ marginBottom: '1rem' }}
      >
        View Asset List
      </Button>
      {loanMachines.length > 0 ? (
        <div>
          <PieChart width={500} height={300}>
            <Pie
              dataKey="count"
              isAnimationActive={false}
              data={chartData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#23303E"
              label
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      ) : (
        <Typography>No Loan Machines available.</Typography>
      )}
    </Paper>
  );
};

export default AssetLoan;
