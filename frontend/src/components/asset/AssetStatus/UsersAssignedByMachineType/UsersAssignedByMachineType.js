import React from 'react';
import { useSelector } from 'react-redux';
import {
  Paper,
  Typography,
} from '@mui/material';
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell, // Import Cell for customizing colors
} from 'recharts';

const UsersAssignedByMachineTypePieChart = () => {
  const assets = useSelector((state) => state.asset.assets);

  // Filter assets that are assigned
  const assignedAssets = assets.filter((asset) => asset.Status && asset.Status.toLowerCase() === 'assigned');

  // Group assigned assets by Machine_Type and User_Assigned
  const assignedCountsByTypeAndUser = assignedAssets.reduce(
    (countByTypeAndUser, asset) => {
      const machineType = asset.Machine_Type;
      const userAssigned = asset.User_Assigned;
      if (!countByTypeAndUser[machineType]) {
        countByTypeAndUser[machineType] = {};
      }
      countByTypeAndUser[machineType][userAssigned] = (countByTypeAndUser[machineType][userAssigned] || 0) + 1;
      return countByTypeAndUser;
    },
    {}
  );

  // Prepare data for the pie chart
  const chartData = Object.keys(assignedCountsByTypeAndUser).map((machineType) => {
    const countsByUser = assignedCountsByTypeAndUser[machineType];
    const totalUsers = Object.keys(countsByUser).length;
    return {
      machineType,
      totalUsers,
    };
  });

  // Define a custom color scheme for machine types
  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#ff8888', '#888888']; // Add more colors as needed

  return (
    <Paper elevation={3} sx={{ padding: '1rem', margin: '1rem' }}>
      <Typography variant="h5" gutterBottom>
        Users Assigned by Machine Type 
      </Typography>
      {assignedAssets.length > 0 ? (
        <div>
          <PieChart width={400} height={400}>
            <Tooltip />
            <Legend />
            <Pie
              dataKey="totalUsers"
              isAnimationActive={false}
              data={chartData}
              cx="50%"
              cy="50%"
              outerRadius={150}
              label={({ machineType, totalUsers }) => `${machineType}: ${totalUsers}`}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
          </PieChart>
        </div>
      ) : (
        <Typography>No Assigned Machines available.</Typography>
      )}
    </Paper>
  );
};

export default UsersAssignedByMachineTypePieChart;
