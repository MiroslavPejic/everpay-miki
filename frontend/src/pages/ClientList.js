import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Box, Typography, CircularProgress, IconButton, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch clients from the backend
    axios
      .get(`${API_URL}/clients`)
      .then((response) => {
        setClients(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('There was an error fetching the clients!', error);
        setLoading(false);
      });
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'address', headerName: 'Address', width: 300 },
    { field: 'phonenumber', headerName: 'Phone Number', width: 200 },
    { field: 'bankaccountnumber', headerName: 'Bank Account Number', width: 250 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <IconButton
          color="primary"
          onClick={() => navigate(`/clients/edit/${params.id}`)}
        >
          <EditIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Client List
      </Typography>

      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => navigate('/clients/new')}
        >
          Add New Client
        </Button>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Paper sx={{ p: 2 }}>
          <DataGrid
            rows={clients}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection={false}
            disableSelectionOnClick
            autoHeight
          />
        </Paper>
      )}
    </Box>
  );
};

export default ClientList;
