import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PaymentIcon from '@mui/icons-material/Payment';
import AddIcon from '@mui/icons-material/Add';
import SettingsIcon from '@mui/icons-material/Settings';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Container maxWidth="lg" className="flex justify-between items-center">
          <div className="flex items-center">
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              My App
            </Typography>
            <Button color="inherit" component={Link} to="/">
              <HomeIcon />
              Home
            </Button>
            <Button color="inherit" component={Link} to="/clients">
              <ListAltIcon />
              Clients
            </Button>
            <Button color="inherit" component={Link} to="/payments">
              <PaymentIcon />
              Payments
            </Button>
            {/*
            <Button
            color="inherit"
            component={Link}
            to="/settings"
            startIcon={<SettingsIcon />}
            >
              Settings
            </Button>
            */}
          </div>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
