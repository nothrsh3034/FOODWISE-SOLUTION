import React from 'react';
import donationData from '../../data/donation.json';
import { 
  Typography, 
  Box, 
  List, 
  ListItem, 
  ListItemText, 
  Divider, 
  Avatar,
  ListItemAvatar,
  Chip
} from '@mui/material';
import { motion } from 'framer-motion';
import './DonationSection.css';

const DonationSection = ({ foodItem, userName, location }) => {
  if (!foodItem) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Box className="donation-container">
        <Typography variant="h4" className="donation-title">
          Donation Options for {foodItem}
        </Typography>
        <Typography variant="subtitle1" className="donation-subtitle">
          Thank you, {userName}! Here are organizations in your area that would appreciate your donation.
        </Typography>

        <List className="donation-list">
          {donationData.map((place, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <ListItem alignItems="flex-start" className="donation-item">
                <ListItemAvatar>
                  <Avatar alt={place.place} src="/default-donation.png" />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="h6" className="place-name">
                      {place.place}
                    </Typography>
                  }
                  secondary={
                    <>
                      <Box className="place-type">
                        <Chip 
                          label={place.type} 
                          size="small" 
                          color="primary" 
                          variant="outlined" 
                        />
                      </Box>
                      <Typography variant="body2" className="place-contact">
                        Contact: {place.contact}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
              {index < donationData.length - 1 && <Divider />}
            </motion.div>
          ))}
        </List>
      </Box>
    </motion.div>
  );
};

export default DonationSection;