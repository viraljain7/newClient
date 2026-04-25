import { Chip, IconButton, Menu, MenuItem, Stack } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';
import { colorMap } from '../../../shared/Constants';

const StatusWithActions = ({ row }) => {
  const status = row.status?.toLowerCase();

  // ---------------- Status Colors (Modern + Soft) ----------------

  const colors = colorMap[status] || {
    bg: '#6B7280',
    text: '#ffffff',
    border: '#4B5563'
  };

  // ---------------- Menu Logic ----------------
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      {/* ✅ Status Chip */}
      <Chip
        label={status}
        size="small"
        sx={{
          minWidth: 60,
          fontWeight: 600,
          textTransform: 'capitalize',
          borderRadius: 2,

          backgroundColor: colors.bg,
          color: colors.text,
        }}
      />

      {/* ✅ Action Button */}
      <IconButton size="small" onClick={handleClick}>
        <MoreVertIcon fontSize="small" />
      </IconButton>

      {/* ✅ Dropdown Menu */}
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleClose}>check status</MenuItem>
        <MenuItem onClick={handleClose}>invoice</MenuItem>
      </Menu>
    </Stack>
  );
};

export default StatusWithActions;
