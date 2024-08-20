// src/pages/Settings.js
import React, { useState } from 'react';
import { Box, Typography, Switch, FormControlLabel } from '@mui/material';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const theme = useTheme();

  const handleChange = (event) => {
    setDarkMode(event.target.checked);
    document.body.classList.toggle('dark-mode', event.target.checked);
  };

  const themeMode = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  return (
    <ThemeProvider theme={themeMode}>
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Settings
        </Typography>
        <FormControlLabel
          control={
            <Switch checked={darkMode} onChange={handleChange} color="primary" />
          }
          label="Dark Mode"
        />
      </Box>
    </ThemeProvider>
  );
};

export default Settings;
