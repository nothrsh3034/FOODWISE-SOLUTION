import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  Card,
  CardContent,
  Autocomplete,
  Snackbar,
  Paper,
  CssBaseline,
  ThemeProvider,
  createTheme,
  AppBar,
  Toolbar,
  IconButton,
  useScrollTrigger,
  Slide,
  Fab,
  Zoom
} from '@mui/material';
import {
  VolunteerActivism as DonateIcon,
  RestaurantMenu as RecipeIcon,
  DeleteSweep as WasteIcon,
  KeyboardArrowUp as UpIcon
} from '@mui/icons-material';
import MuiAlert from '@mui/material/Alert';
import DonationSection from '../../components/DonationSection/DonationSection';
import RecipeSection from '../../components/RecipeSection/RecipeSection';
import WasteSection from '../../components/WasteSection/WasteSection';
import foodItems from '../../data/foodItems.json';
import './Home.css';

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#2e7d32',
    },
    secondary: {
      main: '#ff8f00',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: [
      'Poppins',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif'
    ].join(','),
    h1: {
      fontWeight: 700,
      fontSize: '3.5rem',
      lineHeight: 1.2,
    },
    h2: {
      fontWeight: 600,
      fontSize: '2.5rem',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.8rem',
    },
    subtitle1: {
      fontSize: '1.2rem',
      fontWeight: 400,
    },
  },
});

function ScrollTop(props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      '#back-to-top-anchor',
    );
    if (anchor) {
      anchor.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  };

  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Zoom>
  );
}

const Home = () => {
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
    // Scroll to results
    setTimeout(() => {
      document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="home-page">
        <AppBar position="static" color="primary" elevation={0}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              FoodWise Solutions
            </Typography>
          </Toolbar>
        </AppBar>

        <Box className="hero-section" sx={{
          background: 'linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)',
          color: 'white',
          py: 10,
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'url(/food-pattern.png)',
            opacity: 0.05,
            zIndex: 0,
          }
        }}>
          <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Typography variant="h1" component="h1" className="hero-title" gutterBottom>
                Sustainable Food Waste, <span style={{ color: '#ffeb3b' }}>Recommendation System</span>
              </Typography>
              <Typography variant="subtitle1" className="hero-subtitle"
                sx={{display: 'block',
    mx: 'auto',
    textAlign: 'center',
    maxWidth: '700px' }}>      
              
                Discover sustainable solutions for your surplus food
              </Typography>
            </motion.div>
          </Container>
        </Box>

        <Container maxWidth="lg" className="main-content" sx={{ py: 6 }}>
          <div id="back-to-top-anchor" />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="main-card" elevation={4} sx={{
              borderRadius: 4,
              overflow: 'hidden',
              mb: 6,
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 15px 35px rgba(0, 0, 0, 0.15)'
              }
            }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h4" gutterBottom className="card-title" sx={{ 
                  textAlign: 'center',
                  mb: 4,
                  fontWeight: 600,
                  color: 'primary.main'
                }}>
                  What would you like to do with your food?
                </Typography>

                <Autocomplete
                  freeSolo
                  options={foodItems}
                  getOptionLabel={(option) => option}
                  onChange={(event, newValue) => {
                    setFoodItem(newValue || '');
                    setOption('');
                    setSubmitted(false);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Enter food item (e.g., Potatoes, Milk, Bread...)"
                      variant="outlined"
                      fullWidth
                      value={foodItem}
                      onChange={(e) => {
                        setFoodItem(e.target.value);
                        setOption('');
                        setSubmitted(false);
                      }}
                      sx={{ mb: 4 }}
                      InputProps={{
                        ...params.InputProps,
                        style: {
                          fontSize: '1.1rem',
                          padding: '12px 16px'
                        }
                      }}
                    />
                  )}
                  sx={{ mb: 3 }}
                />

                <Grid container spacing={3} justifyContent="center" sx={{ mb: 3 }}>
                  <Grid item xs={12} sm={4}>
                    <Button
                      fullWidth
                      variant="contained"
                      color="success"
                      size="large"
                      startIcon={<DonateIcon />}
                      onClick={() => handleOptionClick('donate')}
                      className="action-button"
                      disabled={!foodItem.trim()}
                      sx={{
                        height: 60,
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        borderRadius: 2,
                        boxShadow: 'none',
                        '&:hover': {
                          transform: 'translateY(-3px)',
                          boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)'
                        }
                      }}
                    >
                      Donate Food
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      size="large"
                      startIcon={<RecipeIcon />}
                      onClick={() => handleOptionClick('recipe')}
                      className="action-button"
                      disabled={!foodItem.trim()}
                      sx={{
                        height: 60,
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        borderRadius: 2,
                        boxShadow: 'none',
                        '&:hover': {
                          transform: 'translateY(-3px)',
                          boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)'
                        }
                      }}
                    >
                      Get Recipes
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Button
                      fullWidth
                      variant="contained"
                      color="secondary"
                      size="large"
                      startIcon={<WasteIcon />}
                      onClick={() => handleOptionClick('waste')}
                      className="action-button"
                      disabled={!foodItem.trim()}
                      sx={{
                        height: 60,
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        borderRadius: 2,
                        boxShadow: 'none',
                        '&:hover': {
                          transform: 'translateY(-3px)',
                          boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)'
                        }
                      }}
                    >
                      Waste Solutions
                    </Button>
                  </Grid>
                </Grid>

                {option === 'donate' && (
                  <motion.div {...fade}>
                    <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                      Tell us about yourself
                    </Typography>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Your Name"
                          variant="outlined"
                          fullWidth
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                          required
                          sx={{ mb: 2 }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Your Location"
                          variant="outlined"
                          fullWidth
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          required
                          sx={{ mb: 2 }}
                        />
                      </Grid>
                    </Grid>
                  </motion.div>
                )}
              </CardContent>
            </Card>

            <div id="results-section">
              {renderSection()}
            </div>

            <Box className="stats-section" sx={{ 
              textAlign: 'center', 
              my: 8,
              py: 4,
              backgroundColor: 'rgba(46, 125, 50, 0.05)',
              borderRadius: 4
            }}>
              <Typography variant="h4" className="stats-title" sx={{ 
                mb: 4,
                fontWeight: 600,
                color: 'primary.main'
              }}>
                Food Waste By The Numbers
              </Typography>
              <Grid container spacing={4} justifyContent="center">
                {[
                  { number: '1.3', label: 'Billion tons of food wasted annually' },
                  { number: '30', label: '% of all food produced is wasted', suffix: '%' },
                  { number: '8', label: '% of global greenhouse gases', suffix: '%' },
                  { number: '690', label: 'Million people go hungry' }
                ].map((stat, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <StatCard number={stat.number} label={stat.label} suffix={stat.suffix} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </motion.div>
        </Container>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={4000}
          onClose={() => setOpenSnackbar(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <MuiAlert
            onClose={() => setOpenSnackbar(false)}
            severity="success"
            elevation={6}
            variant="filled"
          >
            Thank you for choosing to donate! Your contribution makes a difference.
          </MuiAlert>
        </Snackbar>

        <ScrollTop>
          <Fab color="primary" size="medium" aria-label="scroll back to top">
            <UpIcon />
          </Fab>
        </ScrollTop>
      </div>
    </ThemeProvider>
  );
};

const StatCard = ({ number, label, suffix = '' }) => {
  return (
    <motion.div 
      whileHover={{ scale: 1.05 }} 
      className="stat-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Paper elevation={3} sx={{ 
        padding: 3, 
        height: '100%',
        borderRadius: 3,
        transition: 'all 0.3s ease',
        '&:hover': {
          backgroundColor: 'rgba(46, 125, 50, 0.05)'
        }
      }}>
        <Typography variant="h3" className="stat-number" sx={{ 
          color: 'primary.main',
          fontWeight: 700,
          mb: 1
        }}>
          {number}
          {suffix}
        </Typography>
        <Typography variant="subtitle1" className="stat-label" sx={{ 
          color: 'text.secondary',
          fontSize: '1rem'
        }}>
          {label}
        </Typography>
      </Paper>
    </motion.div>
  );
};

export default Home;