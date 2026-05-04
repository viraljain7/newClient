import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { productName } from '../../utils/productName';
import StatusWithActions from './StatusWithActions';

export const TRANSACTION_COLUMNS = [
  // ── Date / ID ──────────────────────────────────────────────────────────────
  {
    field: 'created_at',
    headerName: 'Date',
    sortable: true,
    renderCell: (row) => (
      <Box sx={{ minWidth: 60 }}>
        <Typography variant="body2" fontWeight={600}>
          {row.id}
        </Typography>
        <Typography variant="body2" fontWeight={600}>
          {row.created_at?.split(' ')[0]}
        </Typography>
        <Typography variant="caption">{row.created_at?.split(' ')[1]}</Typography>
      </Box>
    )
  },

  // ── User ───────────────────────────────────────────────────────────────────
  {
    field: 'user',
    headerName: 'User Details',
    searchable: true,
    filter: {
      type: 'select', // ✅ change this
      key: 'user_id' // ✅ important for API
    },
    renderCell: (row) => (
      <Box sx={{ minWidth: 180 }}>
        <Typography variant="body2" fontWeight={600}>
          {row.user?.name} ({row.user_id})
        </Typography>
        <Typography variant="body2">{row.user.mobile}</Typography>
        <Typography variant="caption" color="primary.main">
          {row.user?.role?.name || 'Retailer'}
        </Typography>
      </Box>
    )
  },

  // ── Transaction Details ────────────────────────────────────────────────────
  {
    field: 'transaction',
    headerName: 'Transaction Details',
    filter: {
      type: 'select',
      key: 'product',
      options: ['fundtransfer', 'fundreturn']
    },
    renderCell: (row) => (
      <Box sx={{ minWidth: 180 }}>
        <Typography variant="body2" lineHeight={1.8} fontWeight={600}>
          {productName(row.product)}
        </Typography>
      </Box>
    )
  },

  // ── Reference ─────────────────────────────────────────────────────────────
  {
    field: 'reference',
    headerName: 'Reference Details',
    searchable: true,

    renderCell: (row) => (
      <Box sx={{ minWidth: 250 }}>
        <Typography variant="body2" fontWeight={600}>
          TXN ID: {row.txnid}
        </Typography>
      
        <Typography variant="body2" fontWeight={500}>
          Remark: {row.description || 'NA'}
        </Typography>
      </Box>
    )
  },

  // ── Amount ─────────────────────────────────────────────────────────────────
  {
    field: 'amount',
    headerName: 'Amount',
    sortable: true,
    renderCell: (row) => (
      <Box sx={{ minWidth: 150 }}>
        {[
          ['Amount', row.amount],
          ['Opening', row.opening_balance],
          ['Closing', row.closing_balance]
        ].map(([label, val]) => (
          <Typography key={label} variant="body2" fontWeight={600}>
            {label}: {Number(val ?? 0).toLocaleString('en-IN')}
          </Typography>
        ))}
      </Box>
    )
  },

  // ── Status ─────────────────────────────────────────────────────────────────
  // field name matches the API POST param: { status: "success" }
  {
    field: 'status',
    headerName: 'Status',
    sortable: true,
    filter: {
      type: 'select',
      options: ['success', 'pending', 'failed', 'refunded']
    },

    renderCell: (row) => <StatusWithActions row={row} />
  }
];
