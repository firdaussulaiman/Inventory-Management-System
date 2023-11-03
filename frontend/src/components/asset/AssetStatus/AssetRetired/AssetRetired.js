import React from 'react';
import { useSelector } from 'react-redux';
import {
  Paper,
  Typography,
} from '@mui/material';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  Tooltip,
  Legend,
} from 'recharts';

const AssetRetiredRadarChart = () => {
  const assets = useSelector((state) => state.asset.assets);
  const retiredAssetsCount = useSelector(
    (state) => state.filter.retiredAssetsCount
  );
  const retiredMachines = assets.filter(
    (asset) => asset.Status && asset.Status.toLowerCase() === 'retired'
  );

  // Calculate retired asset counts by machine type
  const retiredAssetCountsByType = retiredMachines.reduce(
    (countByType, machine) => {
      const machineType = machine.Machine_Type;
      countByType[machineType] = (countByType[machineType] || 0) + 1;
      return countByType;
    },
    {}
  );

  // Prepare data for the radar chart
  const chartData = Object.entries(retiredAssetCountsByType).map(
    ([machineType, count]) => ({
      machineType,
      count,
    })
  );

  return (
    <Paper elevation={3} sx={{ padding: '1rem', margin: '1rem' }}>
      <Typography variant="h5" gutterBottom>
        Retired Machines - {retiredAssetsCount}
      </Typography>
      {retiredMachines.length > 0 ? (
        <div>
          <RadarChart cx={250} cy={150} outerRadius={120} width={500} height={300} data={chartData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="machineType" />
            <Radar dataKey="count" stroke="#3E2330" fill="#070707" fillOpacity={0.2} />
            <Tooltip />
            <Legend />
          </RadarChart>
        </div>
      ) : (
        <Typography>No Retired Machines available.</Typography>
      )}
    </Paper>
  );
};

export default AssetRetiredRadarChart;
