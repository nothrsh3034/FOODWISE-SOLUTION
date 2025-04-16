import React from 'react';
import wasteData from '../data/grouped_waste_management.json';
import { Typography, Box } from '@mui/material';

const WasteSection = ({ foodItem }) => {
  if (!foodItem) return null;

  const matched = wasteData.find(item =>
    item.example_items
      .toLowerCase()
      .split(',')
      .includes(foodItem.toLowerCase())
  );

  return (
    <Box mt={4}>
      <Typography variant="h5">
        Waste Management Suggestion for "{foodItem}"
      </Typography>
      <Typography variant="body1" mt={2}>
        {matched ? matched.suggestion : 'No suggestion available for this item.'}
      </Typography>
    </Box>
  );
};

export default WasteSection;
