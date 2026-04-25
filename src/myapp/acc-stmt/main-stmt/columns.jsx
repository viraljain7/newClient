import { Box, Chip, MenuItem, MenuList, Typography } from '@mui/material';
import TxnDetails from './TxnDetails';
import { productName } from '../../../utils/productName';
import StatusWithActions from './StatusWithAction';

/**
 * Column definitions for the Transaction Report table.
 *
 * ── How to add a column ─────────────────────────────────────────────────────
 *   1. Add a new object to the array below.
 *   2. Nothing else needs to change.
 *
 * ── How to remove a column ──────────────────────────────────────────────────
 *   1. Delete the object from the array.
 *   2. Nothing else needs to change.
 *
 * ── Column contract (SmartTable props) ─────────────────────────────────────
 *   field       – dot-notation path into the row object
 *   headerName  – column header label
 *   sortable    – enable click-to-sort on this column
 *   searchable  – include in global search
 *   filter      – { type: "text" | "select", options?: string[] }
 *   renderCell  – (row) => ReactNode
 */
/**
 * Column definitions for the Transaction Report table.
 *
 * ── How to add a column ─────────────────────────────────────────────────────
 *   1. Add a new object to the array below.
 *   2. Nothing else needs to change.
 *
 * ── How to remove a column ──────────────────────────────────────────────────
 *   1. Delete the object from the array.
 *   2. Nothing else needs to change.
 *
 * ── Column contract (SmartTable props) ─────────────────────────────────────
 *   field       – dot-notation path into the row object
 *   headerName  – column header label
 *   sortable    – enable click-to-sort on this column
 *   searchable  – include in global search
 *   filter      – { type: "text" | "select", options?: string[] }
 *   renderCell  – (row) => ReactNode
 */
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
    type: 'select',     // ✅ change this
    key: 'user_id',     // ✅ important for API
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



  // ── Reference ─────────────────────────────────────────────────────────────
  {
    field: 'reference',
    headerName: 'Reference Details',
    searchable: true,
    filter: {
      type: 'select',
      key: 'product',
      options: [
        'recharge',
        'upipayout',
        'dmt',
        'mtb',
        'qrmtb',
        'bbps',
        'credit-card',
        'dynamic-qr',
        'fundrequest',
        'fundtransfer',
        'fundreturn',
        'fundloadwallet',
        'payout',
        'tds',
        'paytm_pos'
      ]
    },

    renderCell: (row) => (
      <Box sx={{ minWidth: 250 }}>
        <Typography variant="body2" fontWeight={600}>
          TXN ID: {row.txnid}
        </Typography>
        <Typography variant="body2" fontWeight={600}>
          UTR: {row.utr || 'NA'}
        </Typography>
        <Typography variant="body2" fontWeight={600}>
          Product: {productName(row.product)}
        </Typography>
          <Typography variant="body2" fontWeight={600}>
          Desc: {row.description}
        </Typography>
      </Box>
    )
  },

  // ── Amount ─────────────────────────────────────────────────────────────────
  {
    field: 'amount',
    headerName: 'Amount Details',
    sortable: true,
    renderCell: (row) => (
      <Box sx={{ minWidth: 150 }}>
        {[
          ['Amount', row.amount],
          ['Charge', row.charge],
        
        ].map(([label, val]) => (
          <Typography key={label} variant="body2" fontWeight={600}>
            {label}: {Number(val ?? 0).toLocaleString('en-IN')}
          </Typography>
        ))}
      <StatusWithActions row={row} />
      </Box>
    )
  },

    {
    field: 'amount',
    headerName: 'Opening',
    sortable: true,
    renderCell: (row) => (
      <Box sx={{ minWidth: 150 }}>
        {[
        
          ['Opening', row.opening_balance],
          
        ].map(([label, val]) => (
          <Typography key={label}  fontWeight={700} color='success.main'>
             {Number(val ?? 0).toLocaleString('en-IN')}
          </Typography>
        ))}
      </Box>
    )
  },

    {
    field: 'amount',
    headerName: 'Closing',
    sortable: true,
    renderCell: (row) => (
      <Box sx={{ minWidth: 150 }}>
        {[
      
          ['Closing', row.closing_balance]
        ].map(([label, val]) => (
          <Typography key={label}  fontWeight={700} color='error.main'>
             {Number(val ?? 0).toLocaleString('en-IN')}
          </Typography>
        ))}
      </Box>
    )
  },


];
