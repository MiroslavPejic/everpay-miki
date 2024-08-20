import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { Link, useNavigate  } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PaymentIcon from '@mui/icons-material/Payment';
import AddIcon from '@mui/icons-material/Add';
import SettingsIcon from '@mui/icons-material/Settings';
import { supabase } from '../supabaseClient';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';


const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      navigate('/login'); // Redirect to login page after logout
    } else {
      console.error('Error logging out:', error.message);
    }
  };

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
            <Button
            color="inherit"
            onClick={handleLogout}
            startIcon={<ExitToAppIcon />}
            sx={{ ml: 2 }}
          >
            Logout
          </Button>
          </div>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
