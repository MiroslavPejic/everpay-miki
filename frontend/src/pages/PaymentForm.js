import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, MenuItem, Box, Typography, CircularProgress, FormControl, InputLabel, Select } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config';

const PaymentForm = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [payment, setPayment] = useState({
    clientid: '',
    amount: '',
    recipientname: '',
    bankname: '',
    accountnumber: '',
    notes: '',
    status: 'pending',
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch clients for dropdown
    axios.get(`${API_URL}/clients`)
      .then(response => {
        setClients(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('There was an error fetching clients!', error);
        setLoading(false);
      });
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPayment(prevPayment => ({
      ...prevPayment,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post(`${API_URL}/payments`, payment)
      .then(response => {
        navigate('/payments'); // Redirect to payments list after submission
      })
      .catch(error => {
        console.error('There was an error creating the payment!', error);
      });
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ width: '100%', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Create Payment
      </Typography>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="client-label">Client</InputLabel>
          <Select
            labelId="client-label"
            name="clientid"
            value={payment.clientid}
            onChange={handleChange}
            required
          >
            {clients.map(client => (
              <MenuItem key={client.id} value={client.id}>
                {client.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Amount"
          name="amount"
          type="number"
          value={payment.amount}
          onChange={handleChange}
          fullWidth
          required
          sx={{ mb: 2 }}
        />

        <TextField
          label="Recipient's Name"
          name="recipientname"
          value={payment.recipientname}
          onChange={handleChange}
          fullWidth
          required
          sx={{ mb: 2 }}
        />

        <TextField
          label="Recipient's Bank Name"
          name="bankname"
          value={payment.bankname}
          onChange={handleChange}
          fullWidth
          required
          sx={{ mb: 2 }}
        />

        <TextField
          label="Recipient's Account Number"
          name="accountnumber"
          value={payment.accountnumber}
          onChange={handleChange}
          fullWidth
          required
          sx={{ mb: 2 }}
        />

        <TextField
          label="Notes"
          name="notes"
          value={payment.notes}
          onChange={handleChange}
          fullWidth
          multiline
          rows={4}
          sx={{ mb: 2 }}
        />

        <Button
          variant="contained"
          color="primary"
          type="submit"
        >
          Submit Payment
        </Button>
      </form>
    </Box>
  );
};

export default PaymentForm;
