import { Chip,Typography } from '@mui/material';

import { colorMap } from '../../../shared/Constants';

const StatusWithActions = ({ row }) => {
  const status = row.status?.toLowerCase();

  // ---------------- Status Colors (Modern + Soft) ----------------

  const colors = colorMap[status] || {
    bg: '#6B7280',
    text: '#ffffff',
    border: '#4B5563'
  };


  
  return (<>
    <Typography  variant="body2" fontWeight={600}>
      {/* ✅ Status Chip */}

      
  Status:<Chip
        label={status}
        size="small"
        sx={{
          minWidth: 60,
          fontWeight: 600,
          textTransform: 'capitalize',
          borderRadius: 2,
          backgroundColor: "#00000000",
          color: colors.text,
        }}
      />
    </Typography>

  </>

  );
};

export default StatusWithActions;
