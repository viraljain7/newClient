import { Box, Chip, Typography } from '@mui/material';
import { colorMap } from '../../../shared/Constants';

const formatDate = (iso) => new Date(iso).toLocaleDateString('en-IN', { dateStyle: 'medium' });

const formatTime = (iso) =>
  new Date(iso).toLocaleTimeString('en-IN', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

const LoginStatusChip = ({ status }) => {
  const key = status?.toLowerCase();
  const colors = colorMap[key] || {
    bg: '#6B7280',
    text: '#ffffff'
  };

  return (
    <Chip
      label={status}
      size="small"
      sx={{
        minWidth: 50,
        fontWeight: 500,
        textTransform: 'lowercase',
        borderRadius: 2,
        backgroundColor: colors.bg,
        color: colors.text
      }}
    />
  );
};
export const TRANSACTION_COLUMNS = [
  // ── ID + DATE + TIME ─────────────────────────────
  {
    field: 'id',
    headerName: 'ID & Date & Time',
    sortable: true,
    renderCell: (row) => (
      <Box>
        <Typography fontWeight={600} variant="body2">
          {row.id}
        </Typography>
        <Typography variant="body2" fontWeight={600}>
          {row.created_at ? formatDate(row.created_at) : '—'}
        </Typography>
        <Typography variant="body2" fontWeight={600}>{row.created_at ? formatTime(row.created_at) : ''}</Typography>
      </Box>
    )
  },

  // ── MOBILE ───────────────────────────────────────
  {
    field: 'mobile',
    headerName: 'Mobile',
    searchable: true,
    renderCell: (row) => (
      <Typography variant="body2" fontWeight={600}>
        {row.mobile ?? '—'}
      </Typography>
    )
  },

  // ── DEVICE / BROWSER ─────────────────────────────
  {
    field: 'device',
    headerName: 'Device / Browser',
    renderCell: (row) => (
      <Box>
        <Typography variant="body2" fontWeight={600}>
          {[row.device, row.browser].filter(Boolean).join(' / ') || '—'}
        </Typography>
        <Typography variant="body2" fontWeight={600}>{row.platform ?? ''}</Typography>
      </Box>
    )
  },

  // ── IP ADDRESS + LOCATION ─────────────────────────
  {
    field: 'ip_address',
    headerName: 'IP Address & Location',
    searchable: true,
    renderCell: (row, { onIpClick } = {}) => (
      <Box sx={{ cursor: 'pointer' }} onClick={() => onIpClick?.(row.ip_address)}>
        <Typography variant="body2" fontWeight={600} color="primary.main" sx={{ textDecoration: 'underline dotted' }}>
          {row.ip_address ?? '—'}
        </Typography>
        <Typography variant="body2" fontWeight={600}>{[row.city, row.state, row.country].filter(Boolean).join(', ') || '—'}</Typography>
      </Box>
    )
  },

  // ── STATUS ───────────────────────────────────────
  {
    field: 'status',
    headerName: 'Status',
    renderCell: (row) => <LoginStatusChip status={row.status} />
  },

  // ── MESSAGE ──────────────────────────────────────
  {
    field: 'message',
    headerName: 'Message',
    renderCell: (row) => (
      <Typography variant="body2" fontWeight={600}>
        {row.message ?? '—'}
      </Typography>
    )
  }
];
