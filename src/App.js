import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Stack,
  Snackbar
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import { motion } from 'framer-motion';
import DonationSection from './components/DonationSection.js';
import RecipeSection from './components/RecipeSection.js';
import WasteSection from './components/WasteSection.js';
import './App.css';

function App() {
  const [foodItem, setFoodItem] = useState('');
  const [option, setOption] = useState('');
  const [userName, setUserName] = useState('');
  const [location, setLocation] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleOptionClick = (selectedOption) => {
    setOption(selectedOption);
    setSubmitted(true);

    if (selectedOption === 'donate') {
      setOpenSnackbar(true);
    }
  };

  const fade = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  const renderSection = () => {
    if (!submitted || !foodItem.trim()) return null;

    switch (option) {
      case 'donate':
        if (!userName.trim() || !location.trim()) return null;
        return (
          <motion.div {...fade}>
            <DonationSection foodItem={foodItem} userName={userName} location={location} />
          </motion.div>
        );
      case 'recipe':
        return (
          <motion.div {...fade}>
            <RecipeSection foodItem={foodItem} />
          </motion.div>
        );
      case 'waste':
        return (
          <motion.div {...fade}>
            <WasteSection foodItem={foodItem} />
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        className="app-container"
        sx={{
          padding: 4,
          borderRadius: 4,
          boxShadow: 3,
          background: 'linear-gradient(to right, #e0f7fa, #f1f8e9)',
          minHeight: '100vh',
        }}
      >
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{
            fontWeight: 700,
            fontFamily: 'Roboto, sans-serif',
            color: '#2e7d32',
            mb: 4,
          }}
        >
          🌱 Sustainable Food System
        </Typography>

        <TextField
          label="Enter food ingredient (e.g. Potato, milk..)"
          variant="outlined"
          fullWidth
          value={foodItem}
          onChange={(e) => {
            setFoodItem(e.target.value);
            setOption('');
            setSubmitted(false);
          }}
          sx={{ mb: 4, backgroundColor: '#ffffff', borderRadius: 1 }}
        />

        <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 3 }}>
          <Button
            variant="contained"
            color="success"
            startIcon={<VolunteerActivismIcon />}
            onClick={() => handleOptionClick('donate')}
            sx={{ fontWeight: 600, fontFamily: 'Roboto' }}
          >
           Donate  Cooked Food
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<RestaurantMenuIcon />}
            onClick={() => handleOptionClick('recipe')}
            sx={{ fontWeight: 600, fontFamily: 'Roboto' }}
          >
            Recipe Suggestion
          </Button>
          <Button
            variant="contained"
            color="error"
            startIcon={<DeleteSweepIcon />}
            onClick={() => handleOptionClick('waste')}
            sx={{ fontWeight: 600, fontFamily: 'Roboto' }}
          >
            Waste Management
          </Button>
        </Stack>

        {option === 'donate' && (
          <motion.div {...fade}>
            <TextField
              label="Your Name"
              variant="outlined"
              fullWidth
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              sx={{ mb: 2, backgroundColor: '#ffffff', borderRadius: 1 }}
            />
            <TextField
              label="Your Location"
              variant="outlined"
              fullWidth
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              sx={{ mb: 3, backgroundColor: '#ffffff', borderRadius: 1 }}
            />
          </motion.div>
        )}

        {renderSection()}

        {/* Snackbar for Donating Food */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={() => setOpenSnackbar(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <MuiAlert
            onClose={() => setOpenSnackbar(false)}
            severity="success"
            variant="filled"
            sx={{ width: '100%' }}
          >
            Donating Food is always a Good idea!
          </MuiAlert>
        </Snackbar>
      </Box>
    </Container>
  );
}

export default App;
