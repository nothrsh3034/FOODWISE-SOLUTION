import React, { useState } from 'react';
import {
  Container, Typography, Box, TextField, Button,
  Divider, IconButton, Fab, AppBar, Toolbar,
  CssBaseline, ThemeProvider, Card, CardContent, Grid, Zoom
} from '@mui/material';
import { motion } from 'framer-motion';
import { 
  FaEnvelope, FaPhone, FaMapMarkerAlt,
  FaFacebook, FaTwitter, FaInstagram, FaLinkedin 
} from 'react-icons/fa';
import { KeyboardArrowUp as UpIcon } from '@mui/icons-material';
import { createTheme } from '@mui/material/styles';
import useScrollTrigger from '@mui/material/useScrollTrigger';

const theme = createTheme({
  palette: {
    primary: { main: '#2e7d32' },
    secondary: { main: '#ff8f00' },
    background: { default: '#f5f5f5' }
  },
  typography: {
    fontFamily: ['Poppins', 'Roboto', 'sans-serif'].join(','),
    h1: { fontWeight: 700, fontSize: '3.5rem', lineHeight: 1.2 },
    h2: { fontWeight: 600, fontSize: '2.5rem' },
    h4: { fontWeight: 600, fontSize: '1.8rem' }
  }
});

function ScrollTop(props) {
  const trigger = useScrollTrigger();
  const handleClick = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <Zoom in={trigger}>
      <Fab color="primary" size="medium" onClick={handleClick} sx={{ position: 'fixed', bottom: 16, right: 16 }}>
        <UpIcon />
      </Fab>
    </Zoom>
  );
}

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you ${formData.name}! We'll contact you soon.`);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ width: '100vw', minHeight: '100vh', overflowX: 'hidden' }}>
        <AppBar position="static" color="primary" elevation={0}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              FoodWise Solutions
            </Typography>
          </Toolbar>
        </AppBar>

        <Box sx={{ 
          width: '100%',
          py: 10,
          background: 'linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)',
          color: 'white',
          textAlign: 'center'
        }}>
          <Container maxWidth="xl">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <Typography variant="h1" gutterBottom>
                Contact <span style={{ color: '#ffeb3b' }}>Us</span>
              </Typography>
              <Typography variant="subtitle1">
                We'd love to hear from you
              </Typography>
            </motion.div>
          </Container>
        </Box>

        <Container maxWidth="xl" sx={{ px: 0 }}>
          <Grid container spacing={4} sx={{ px: { xs: 2, md: 4 }, my: 4 }}>
            <Grid item xs={12} md={6}>
              <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h4" gutterBottom>
                    Send Us a Message
                  </Typography>
                  <form onSubmit={handleSubmit}>
                    <TextField
                      fullWidth
                      label="Your Name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      sx={{ mb: 3 }}
                    />
                    <TextField
                      fullWidth
                      label="Email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      sx={{ mb: 3 }}
                    />
                    <TextField
                      fullWidth
                      label="Message"
                      multiline
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      sx={{ mb: 3 }}
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      fullWidth
                      sx={{ py: 1.5 }}
                    >
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card sx={{ borderRadius: 3, boxShadow: 3, height: '100%' }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h4" gutterBottom>
                    Contact Information
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Box sx={{ 
                      backgroundColor: 'rgba(46, 125, 50, 0.1)',
                      borderRadius: '50%',
                      width: 50,
                      height: 50,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 2
                    }}>
                      <FaEnvelope style={{ color: '#2e7d32', fontSize: '1.25rem' }} />
                    </Box>
                    <Typography>contact@foodwise.com</Typography>
                  </Box>
                  
                  <Divider sx={{ my: 3 }} />
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Box sx={{ 
                      backgroundColor: 'rgba(46, 125, 50, 0.1)',
                      borderRadius: '50%',
                      width: 50,
                      height: 50,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 2
                    }}>
                      <FaPhone style={{ color: '#2e7d32', fontSize: '1.25rem' }} />
                    </Box>
                    <Typography>+91 9265506969</Typography>
                  </Box>
                  
                  <Divider sx={{ my: 3 }} />
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Box sx={{ 
                      backgroundColor: 'rgba(46, 125, 50, 0.1)',
                      borderRadius: '50%',
                      width: 50,
                      height: 50,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 2
                    }}>
                      <FaMapMarkerAlt style={{ color: '#2e7d32', fontSize: '1.25rem' }} />
                    </Box>
                    <Typography>123, Sharda Hostel, New VV nagar</Typography>
                  </Box>

                  <Box sx={{ mt: 4, textAlign: 'center' }}>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Connect With Us</Typography>
                    <Box>
                      {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin].map((Icon, index) => (
                        <IconButton 
                          key={index}
                          sx={{ 
                            mx: 1,
                            backgroundColor: 'rgba(46, 125, 50, 0.1)',
                            '&:hover': { backgroundColor: 'rgba(46, 125, 50, 0.2)' }
                          }}
                        >
                          <Icon />
                        </IconButton>
                      ))}
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>

        <ScrollTop />
      </Box>
    </ThemeProvider>
  );
};

export default Contact;