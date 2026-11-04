import { useMemo, useState } from 'react';
import { Box, Button, Stack, TextField, Typography, Table, TableRow, TableCell, TableContainer, TableBody, TableHead } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import * as XLSX from 'xlsx';

import { getDefaultDateRange } from '../../../shared/Helper';
import { useTransactions } from './api/useTransactions';
import { productName } from '../../../utils/productName';
import SkeletonRows from '../../../components/SmartTable/SkeletonRows';
import { TRANSACTION_COLUMNS } from '../gst-report/columns';

const GstReport = () => {
  const { fromDate: defaultFrom, toDate: defaultTo } = getDefaultDateRange(0);

  const [fromDate, setFromDate] = useState(defaultFrom);
  const [toDate, setToDate] = useState(defaultTo);

  const { rows, loading, refetch, search } = useTransactions({
    fromDate,
    toDate,
    initialPerPage: 1000000
  });

  // Format currency in Indian format
  const formatAmount = (value) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(Number(value) || 0);

  // Convert string amounts safely
  const toNumber = (value) => {
    const number = Number(value);
    return Number.isFinite(number) ? number : 0;
  };

  // Get service label using productName utility
  const getServiceLabel = (service) => {
    if (!service) return 'Unknown';
    return productName(service) || service?.toUpperCase();
  };

  // Normalize API response into transaction array (success only)
  const transactions = useMemo(() => {
    let data = [];

    if (Array.isArray(rows)) data = rows;
    else if (Array.isArray(rows?.data?.data)) data = rows.data.data;
    else if (Array.isArray(rows?.data)) data = rows.data;

    // Filter for successful transactions only
    return data.filter((txn) => txn.status?.toLowerCase() === 'success') || [];
  }, [rows]);

  // Get all available services
  const services = useMemo(() => {
    return [...new Set(transactions.map((transaction) => transaction.product).filter(Boolean))];
  }, [transactions]);

  // Group transactions user-wise and service-wise
  const reportData = useMemo(() => {
    const userMap = new Map();

    transactions.forEach((transaction) => {
      const userId = transaction.user?.id ?? transaction.user_id ?? 'unknown';

      const userName = transaction.user?.name || transaction.user_name || 'Unknown User';

      const service = transaction.product || 'other';

      // Initialize user
      if (!userMap.has(userId)) {
        userMap.set(userId, {
          id: userId,
          userName,
          services: {}
        });
      }

      const user = userMap.get(userId);

      // Initialize service
      if (!user.services[service]) {
        user.services[service] = {
          amount: 0,
          charges: 0,
          gst: 0,
          transactions: 0
        };
      }

      const serviceData = user.services[service];

      // Sum values in paise for accurate currency totals
      serviceData.amount += Math.round(toNumber(transaction.amount));

      serviceData.charges += Math.round(toNumber(transaction.charge));

      serviceData.gst += Math.round(toNumber(transaction.gst));

      serviceData.transactions += 1;
    });

    return Array.from(userMap.values());
  }, [transactions]);

  // Calculate totals for each service
  const serviceTotals = useMemo(() => {
    const totals = {};

    services.forEach((service) => {
      totals[service] = {
        amount: 0,
        charges: 0,
        gst: 0
      };
    });

    reportData.forEach((user) => {
      services.forEach((service) => {
        const serviceData = user.services[service];

        if (serviceData) {
          totals[service].amount += serviceData.amount;
          totals[service].charges += serviceData.charges;
        }
      });
    });

    return totals;
  }, [reportData, services]);

  // Export handler
  const handleExport = () => {
    // Prepare data for Excel export - amount and charges per user per service
    const worksheetData = [];

    // Add headers: User ID, then each service's Amount and Charges
    const headerRow = ['User ID'];
    services.forEach((service) => {
        headerRow.push(`${getServiceLabel(service)} Amount`);
        headerRow.push(`${getServiceLabel(service)} Charges`);
    });
    worksheetData.push(headerRow);

    // Add data rows: each user's amount and charges per service
    reportData.forEach((user) => {
      const row = [user.id, user.userName];
      services.forEach((service) => {
        const serviceData = user.services?.[service];
        if (!serviceData) {
          row.push('-');
          row.push('-');
        } else {
          row.push(serviceData.amount);
          row.push(serviceData.charges);
        }
      });
      worksheetData.push(row);
    });

    // Add totals row
    const totalsRow = ['Grand Total'];
    services.forEach((service) => {
      const totalAmount = serviceTotals[service]?.amount || 0;
      const totalCharges = serviceTotals[service]?.charges || 0;
      totalsRow.push(totalAmount);
      totalsRow.push(totalCharges);
    });
    worksheetData.push(totalsRow);

    // Create workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Service Wise Report Per User');

    // Generate download link
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    const excelBlob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });
    const excelUrl = URL.createObjectURL(excelBlob);
    const a = document.createElement('a');
    a.href = excelUrl;
    a.download = `Service Wise Report-${fromDate}_${toDate}.xlsx`;
    a.click();
    URL.revokeObjectURL(excelUrl);
  };

  return (
    <Box sx={{ px: 2, pb: 2 }}>
      {/* Page Header */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3} flexWrap="wrap" gap={2}>
        <Box>
          <Typography variant="h5" fontWeight={700}>
            Service Wise Report Per User
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {/* {pagination.total?.toLocaleString() ?? 0} total records */}
            {' | '}
            {reportData.length} users on this page
          </Typography>
        </Box>

        {/* Date Range Controls */}
        <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
          <TextField
            type="date"
            label="From"
            size="small"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            type="date"
            label="To"
            size="small"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />

          <Button variant="contained" startIcon={<RefreshIcon />} onClick={refetch} sx={{ mr: 1 }}>
            Fetch
          </Button>

          <Button variant="outlined" onClick={handleExport} sx={{ mr: 1 }}>
            Export
          </Button>
        </Stack>
      </Stack>

      {loading || (rows.length === 0 && !search) ? (
        <TableContainer>
          <TableHead>
            <TableRow>
              <TableCell>User Id</TableCell>
              <TableCell>User Name</TableCell>
              <TableCell>BBPS</TableCell>
              <TableCell>PAYOUT</TableCell>
              <TableCell>PG</TableCell>
              <TableCell>SILVER 1</TableCell>
              <TableCell>RUPAY UPI</TableCell>
              <TableCell>SETTLEMENTTRANSFER</TableCell>
              <TableCell>FUND TRANSFER</TableCell>
              <TableCell>FUND RETURN</TableCell>
              <TableCell>POS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <SkeletonRows columns={TRANSACTION_COLUMNS} count={10} />
          </TableBody>
        </TableContainer>
      ) : (
        <TableContainer>
          <Table size="small" aria-label="service-wise GST report">
            {/* Table Header */}
            <TableRow>
              <TableCell style={{ fontWeight: 700 }}>User Name</TableCell>
              {services.map((service) => (
                <TableCell
                  key={service}
                  style={{
                    fontWeight: 700,
                    border: '1px solid #dee2e6',
                    minWidth: 150
                  }}
                >
                  {getServiceLabel(service)}
                </TableCell>
              ))}
            </TableRow>

            {/* Table Rows - Each user individually */}
            {reportData.map((user) => (
              <TableBody key={user.id} sx={{ borderBottom: '1px solid #e0e0e0' }}>
                <TableCell style={{ fontWeight: 600 }}>
                  {user.userName} ({user.id})
                </TableCell>
                {services.map((service) => {
                  const serviceData = user.services?.[service];
                  if (!serviceData) {
                    return (
                      <TableCell
                        key={service}
                        style={{
                          fontWeight: 700,
                          border: '1px solid #dee2e6',
                          minWidth: 50
                        }}
                      >
                        —
                      </TableCell>
                    );
                  }

                  return (
                    <TableCell
                      key={service}
                      style={{
                        p: 1,
                        border: '1px solid #dee2e6',
                        minWidth: 200
                      }}
                    >
                      <Stack direction="column" alignItems="flex-start" gap={1}>
                        <Typography variant="body2" fontWeight={600}>
                          Amount: {formatAmount(serviceData.amount)}
                        </Typography>
                        <Typography variant="body2" color="primary.main" fontWeight={600}>
                          Charges: {formatAmount(serviceData.charges)}
                        </Typography>
                      </Stack>
                    </TableCell>
                  );
                })}
              </TableBody>
            ))}

            {/* Totals Row */}
            <TableBody sx={{ fontWeight: 900, borderTop: '1px solid #e0e0e0' }}>
              <TableCell>Grand Total</TableCell>
              {services.map((service) => (
                <TableCell key={service} style={{ fontWeight: 900, border: '1px solid #e0e0e0' }}>
                  <Stack direction="column" alignItems="flex-start" gap={1}>
                    <Typography variant="body2" fontWeight={800}>
                      Amount: {formatAmount(serviceTotals[service]?.amount)}
                    </Typography>
                    <Typography variant="body2" fontWeight={800} color="success.main">
                      Charges: {formatAmount(serviceTotals[service]?.charges)}
                    </Typography>
                  </Stack>
                </TableCell>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Main Table */}
    </Box>
  );
};

export default GstReport;
