import React from 'react';
import donationData from '../data/donation.json';
import { Typography, Box, List, ListItem, ListItemText, Divider } from '@mui/material';

const DonationSection = ({ foodItem, userName, location }) => {
  if (!foodItem) return null;

  // You can later filter donationData based on foodItem/type if required
  return (
    <Box mt={4} p={3} sx={{ backgroundColor: '#f9fbe7', borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
        Thank you, {userName}!
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        You’re donating <strong>{foodItem}</strong> from <strong>{location}</strong>.
        Here are some places you can contact:
      </Typography>

      <List>
        {donationData.map((place, index) => (
          <React.Fragment key={index}>
            <ListItem alignItems="flex-start">
              <ListItemText
                primary={
                  <Typography variant="h6" sx={{ fontWeight: 500 }}>
                    {place.place}
                  </Typography>
                }
                secondary={`Type: ${place.type} | Contact: ${place.contact}`}
              />
            </ListItem>
            {index < donationData.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default DonationSection;
