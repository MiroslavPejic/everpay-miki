import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const Home = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box sx={{ p: 3, bgcolor: (theme) => theme.palette.background.default, borderRadius: 1 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Mikis payment app
        </Typography>
        <Typography variant="body1">
          Use the navigation bar to access different sections of the app. You can view and manage clients, 
          add and review payments, and configure settings as needed.
        </Typography>
      </Box>
    </Container>
  );
};

export default Home;
