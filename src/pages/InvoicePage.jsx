import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Divider,
  Chip,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button
} from '@mui/material';
import { useParams } from 'react-router-dom';
import api from '../shared/BaseApi';
import { productName } from '../utils/productName';

function InvoicePage() {
  const { txnid } = useParams(); // 🔥 get txnid from URL

  const [invoiceData, setInvoiceData] = useState(null);
  const [loading, setLoading] = useState(true);


  

  // 🔥 FETCH FUNCTION
  const fetchInvoice = async () => {
    try {
      const formData = new FormData();
      formData.append('txnid', `${txnid}`);

      const res = await api.post('/service/invoice', formData);

      if (res.data?.statuscode === 'TXN') {
        setInvoiceData(res.data.data);
      } else {
        console.error(res.data?.message);
      }
    } catch (err) {
      console.error('Invoice fetch error:', err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 CALL API
  useEffect(() => {
    if (txnid) fetchInvoice();
  }, [txnid]);

  // 🔥 STATES
  if (loading) return <p>Loading...</p>;
  if (!invoiceData) return <p>No invoice found</p>;

  const data = invoiceData;
  const user = data.user;

  return (
    <Box sx={{ maxWidth: '1200px', p: 3 }}>
      <Card sx={{ borderRadius: 3 }}>
        <CardContent>
          {/* 🔹 HEADER */}
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid size={6}>
              <Typography variant="h5" fontWeight={700}>
                INVOICE
              </Typography>

              <Typography variant="body2">TXN ID: {data.txnid}</Typography>
            </Grid>

            <Grid size={6} sx={{ textAlign: 'right' }}>
              <Typography>Date: {data.created_at}</Typography>
            </Grid>
          </Grid>
          <Divider sx={{ my: 3 }} />
          {/* 🔹 AGENT + CONSUMER */}
          <Grid container spacing={2}>
            <Grid size={6}>
              <Card variant="outlined">
                <CardContent>
                  <Typography fontWeight={600}>AGENT DETAILS</Typography>
                  <hr />
                  <Typography fontWeight={600}>VD Champions</Typography>
                  <Typography fontWeight={600}>Address: T21, Pathanwadi Rd, Kurar Village, Malad East, Mumbai, Maharashtra</Typography>
                  <Typography fontWeight={600}>Mobile: 9001290012</Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={6}>
              <Card variant="outlined">
                <CardContent>
                  <Typography fontWeight={600}>CONSUMER DETAILS</Typography>
                  <hr />

                  <Typography fontWeight={600}>Name: {user.name}</Typography>
                  <Typography fontWeight={600}>shopname: {user.shopname}</Typography>
                  <Typography fontWeight={600}>Mobile: {user.mobile}</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Divider sx={{ my: 3 }} />
          {/* 🔹 TABLE */}
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>TXN ID</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell align="right">Service.</TableCell>
                <TableCell align="right">Status</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              <TableRow>
                <TableCell>{data.txnid}</TableCell>
                <TableCell align="right">₹{Number(data.amount).toFixed(2)}</TableCell>
                <TableCell align="right">{productName(data.product)}</TableCell>
                <TableCell align="right">
                  <Chip label={data.status} size="small" color={data.status === 'pending' ? 'warning' : 'success'} />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Divider sx={{ my: 2 }} />
          {/* 🔹 TOTAL */}
          <Box sx={{ maxWidth: 300, ml: 'auto' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography>Total Amount:</Typography>
              <Typography fontWeight={700}>₹{Number(data.amount).toFixed(2)}</Typography>
            </Box>
          </Box>
          <Divider sx={{ my: 3 }} />
          <Typography fontWeight={600}>Note</Typography>{' '}
          <Typography variant="body1" color="text.secondary">
            {' '}
            It was a pleasure working with you. Thank you!{' '}
          </Typography>
          {/* 🔹 ACTIONS */}
          <Box textAlign="right">
            <Button variant="outlined" sx={{ mr: 1 }} onClick={() => window.print()}>
              {' '}
              Print{' '}
            </Button>{' '}
            <Button variant="contained"> Download </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default InvoicePage;
