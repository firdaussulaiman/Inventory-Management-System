import React from 'react';
import { useSelector } from 'react-redux';
import {
  Paper,
  Typography,
} from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const AssetOutOfWarrantyLineChart = () => {
  const assets = useSelector((state) => state.asset.assets);

  // Create an array of years starting from 2018 to the current year
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2018 + 1 }, (_, index) => 2018 + index);

  // Filter assets that are out of warranty based on the Warranty_Date field
  const outOfWarrantyAssets = assets.filter((asset) => {
    const warrantyDate = new Date(asset.Warranty_Date);
    return warrantyDate < new Date(asset.Warranty_Date).setFullYear(warrantyDate.getFullYear() + 3);
  });

  // Group out of warranty assets by Machine_Type and year
  const outOfWarrantyCountsByTypeAndYear = outOfWarrantyAssets.reduce(
    (countByTypeAndYear, asset) => {
      const machineType = asset.Machine_Type;
      const warrantyYear = new Date(asset.Warranty_Date).getFullYear();
      if (!countByTypeAndYear[machineType]) {
        countByTypeAndYear[machineType] = {};
      }
      countByTypeAndYear[machineType][warrantyYear] = (countByTypeAndYear[machineType][warrantyYear] || 0) + 1;
      return countByTypeAndYear;
    },
    {}
  );

  // Prepare data for the line chart
  const chartData = years.map((year) => ({
    year: year.toString(),
    ...Object.entries(outOfWarrantyCountsByTypeAndYear).reduce((countsByType, [machineType, countsByYear]) => {
      countsByType[machineType] = countsByYear[year] || 0;
      return countsByType;
    }, {}),
  }));

  return (
    <Paper elevation={3} sx={{ padding: '1rem', margin: '1rem' }}>
      <Typography variant="h5" gutterBottom>
        Out of Warranty Machines Over Time
      </Typography>
      {outOfWarrantyAssets.length > 0 ? (
        <div>
          <LineChart width={800} height={400} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            {Object.keys(outOfWarrantyCountsByTypeAndYear).map((machineType, index) => (
              <Line
                key={index}
                dataKey={machineType}
                name={machineType}
                stroke={`#${Math.floor(Math.random()*16777215).toString(16)}`} // Random color
              />
            ))}
          </LineChart>
        </div>
      ) : (
        <Typography>No Out of Warranty Machines available.</Typography>
      )}
    </Paper>
  );
};

export default AssetOutOfWarrantyLineChart;
