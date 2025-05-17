import React from 'react';
import { 
  Container, Typography, Box, Grid, Avatar,
  Card, CardContent, Fab, AppBar, Toolbar, 
  CssBaseline, ThemeProvider, Zoom
} from '@mui/material';
import { motion } from 'framer-motion';
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
    h4: { fontWeight: 600, fontSize: '1.8rem' },
    subtitle1: { fontSize: '1.2rem', fontWeight: 400 }
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

const teamMembers = [
  {
    name: 'Darshana Sangani', role: 'Frontend Developer & UI-UX Designer',   
    bio: 'Specializes in React Frontend and UI/UX design.',
    avatar: '/assets/images/darshna.jpg'
  },
  {
    name: 'Chandni Vekariya', role: 'Sustainability Logic',
    bio: 'Focuses on Sustainability and food waste management Recommendation Logic.',
    avatar: '/assets/images/chandani.jpg'
  },
  {
    name: 'Dharti Vekariya', role: 'Data pipeline & Deployment',
    bio: 'Data pipeline development & Webapp Development .',
    avatar: "/assets/images/dharti.jpg"
  }
];

const About = () => {
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
                About <span style={{ color: '#ffeb3b' }}>Our Mission</span>
              </Typography>
              <Typography variant="subtitle1">
                Creating sustainable solutions for food waste management
              </Typography>
            </motion.div>
          </Container>
        </Box>

        <Container maxWidth="xl" sx={{ px: 0 }}>
          <Box sx={{ px: { xs: 2, md: 4 } }}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }}>
              <Card sx={{ my: 6, borderRadius: 3, boxShadow: 3 }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h4" gutterBottom>
                    Our Vision
                  </Typography>
                  <Typography>
                    Our system bridges the gap between food surplus and need while providing practical solutions.
                  </Typography>
                </CardContent>
              </Card>

              <Box sx={{ mb: 8 }}>
                <Typography variant="h4" gutterBottom>Key Features</Typography>
                <Grid container spacing={4}>
                  {['Donation Network', 'Recipe Suggestions', 'Waste Management'].map((feature, index) => (
                    <Grid item xs={12} md={4} key={index}>
                      <motion.div whileHover={{ scale: 1.03 }}>
                        <Card sx={{ height: '100%', p: 3, borderRadius: 3, boxShadow: 3 }}>
                          <Typography variant="h5">{feature}</Typography>
                        </Card>
                      </motion.div>
                    </Grid>
                  ))}
                </Grid>
              </Box>

              <Box>
                <Typography variant="h4" gutterBottom>Meet The Team</Typography>
                <Grid container spacing={4}>
                  {teamMembers.map((member, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <Card sx={{ 
                          height: '100%', 
                          p: 4, 
                          borderRadius: 3, 
                          boxShadow: 3,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          textAlign: 'center'
                        }}>
                          <Avatar 
                            src={member.avatar} 
                            sx={{ 
                              width: 160, 
                              height: 160, 
                              mb: 3,
                              border: '4px solid',
                              borderColor: 'primary.main'
                            }} 
                          />
                          <Typography variant="h4" sx={{ mb: 1 }}>{member.name}</Typography>
                          <Typography variant="h6" color="primary" sx={{ mb: 2 }}>{member.role}</Typography>
                          <Typography variant="body1">{member.bio}</Typography>
                        </Card>
                      </motion.div>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </motion.div>
          </Box>
        </Container>

        <ScrollTop />
      </Box>
    </ThemeProvider>
  );
};

export default About;