import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Paper, Button, Box, Typography, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config';
import AddIcon from '@mui/icons-material/Add';

const PaymentList = () => {
  const [payments, setPayments] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch payments and clients from the backend
    axios.all([
      axios.get(`${API_URL}/payments`),
      axios.get(`${API_URL}/clients`)
    ])
    .then(axios.spread((paymentsResponse, clientsResponse) => {
      setPayments(paymentsResponse.data);
      setClients(clientsResponse.data);
      setLoading(false);
    }))
    .catch((error) => {
      console.error('There was an error fetching the payments or clients!', error);
      setLoading(false);
    });
  }, []);

  const handleApproveClick = (payment) => {
    setSelectedPayment(payment);
    setOpenDialog(true);
  };

  const handleConfirmApprove = () => {
    if (selectedPayment) {
      axios
        .patch(`${API_URL}/payments/${selectedPayment.id}`, { status: 'approved' })
        .then(() => {
          setPayments((prevPayments) =>
            prevPayments.map((payment) =>
              payment.id === selectedPayment.id
                ? { ...payment, status: 'approved' }
                : payment
            )
          );
          setOpenDialog(false);
          setSelectedPayment(null);
        })
        .catch((error) => {
          console.error('There was an error approving the payment!', error);
        });
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedPayment(null);
  };

  // Create a map of client IDs to client names
  const clientMap = clients.reduce((acc, client) => {
    acc[client.id] = client.name;
    return acc;
  }, {});

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'clientname', headerName: 'Client', width: 200 },
    { field: 'amount', headerName: 'Amount', width: 150 },
    { field: 'recipientname', headerName: 'Recipient Name', width: 200 },
    { field: 'bankname', headerName: 'Bank Name', width: 200 },
    { field: 'accountnumber', headerName: 'Account Number', width: 250 },
    { field: 'notes', headerName: 'Notes', width: 250 },
    { field: 'status', headerName: 'Status', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          disabled={params.row.status === 'approved'}
          onClick={() => handleApproveClick(params.row)}
          className="bg-blue-500 text-white hover:bg-blue-600"
        >
          Approve
        </Button>
      ),
    },
  ];

  // Map payments to include client names
  const rows = payments.map(payment => ({
    ...payment,
    clientname: clientMap[payment.clientid] || 'Unknown',
  }));

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Payment List
      </Typography>

      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => navigate('/payments/new')}
        >
          Add Payment
        </Button>
      </Box>

      {loading ? (
        <div className="flex justify-center items-center h-full">
          <CircularProgress />
        </div>
      ) : (
        <Paper sx={{ p: 2, bgcolor: (theme) => theme.palette.background.paper }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection={false}
            disableSelectionOnClick
            autoHeight
            sx={{
              '& .MuiDataGrid-root': {
                border: 'none',
              },
              '& .MuiDataGrid-cell': {
                backgroundColor: (theme) => theme.palette.background.default,
                color: (theme) => theme.palette.text.primary,
                borderColor: (theme) => theme.palette.divider,
              },
              '& .MuiDataGrid-columnHeader': {
                backgroundColor: (theme) => theme.palette.background.paper,
                color: (theme) => theme.palette.text.primary,
                borderBottomColor: (theme) => theme.palette.divider,
              },
              '& .MuiDataGrid-footerContainer': {
                backgroundColor: (theme) => theme.palette.background.paper,
                color: (theme) => theme.palette.text.primary,
              },
              '& .MuiDataGrid-toolbarContainer': {
                backgroundColor: (theme) => theme.palette.background.paper,
              },
              '& .MuiDataGrid-cellContent': {
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              },
            }}
          />
        </Paper>
      )}

      {/* Confirmation Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{ '& .MuiDialog-paper': { backgroundColor: (theme) => theme.palette.background.paper, color: (theme) => theme.palette.text.primary } }}
      >
        <DialogTitle id="alert-dialog-title">{"Approve Payment"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to approve this payment?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary" className="text-red-500 hover:bg-red-100">
            Cancel
          </Button>
          <Button onClick={handleConfirmApprove} color="primary" autoFocus className="bg-blue-500 text-white hover:bg-blue-600">
            Approve
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PaymentList;
