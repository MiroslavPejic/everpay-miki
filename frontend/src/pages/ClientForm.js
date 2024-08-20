import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Box, Typography, CircularProgress } from '@mui/material';
import { API_URL } from '../config';

const ClientForm = () => {
  const [client, setClient] = useState({
    name: '',
    address: '',
    phonenumber: '',
    bankaccountnumber: '',
  });
  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      // Fetch client details for editing
      setIsEditMode(true);
      setLoading(true);
      axios
        .get(`${API_URL}/clients/${id}`)
        .then((response) => {
          console.log('client: ', response.data)
          setClient(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('There was an error fetching the client!', error);
          setLoading(false);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClient((prevClient) => ({
      ...prevClient,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (isEditMode) {
      // Update existing client
      axios
        .put(`${API_URL}/clients/${id}`, client)
        .then(() => {
          setLoading(false);
          navigate('/clients');
        })
        .catch((error) => {
          console.error('There was an error updating the client!', error);
          setLoading(false);
        }).finally(() => {
          navigate('/clients')
        });
    } else {
      // Create a new client
      axios
        .post(`${API_URL}/clients`, client)
        .then(() => {
          setLoading(false);
          navigate('/clients');
        })
        .catch((error) => {
          console.error('There was an error creating the client!', error);
          setLoading(false);
        }).finally(() => {
          navigate('/clients');
        });
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        {isEditMode ? 'Edit Client' : 'Add New Client'}
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            name="name"
            value={client.name}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Address"
            name="address"
            value={client.address}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Phone Number"
            name="phonenumber"
            value={client.phonenumber}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Bank Account Number"
            name="bankaccountnumber"
            value={client.bankaccountnumber}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />

          <Box sx={{ mt: 3 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {isEditMode ? 'Update Client' : 'Create Client'}
            </Button>
          </Box>
        </form>
      )}
    </Box>
  );
};

export default ClientForm;
