const baseChipStyle = (colors) => ({
  minWidth: 70,
  fontWeight: 600,
  textTransform: 'capitalize',
  borderRadius: 2,
  padding: 1,
  backgroundColor: colors.bg,
  color: colors.text
});

import { Button, Chip } from '@mui/material';
import { colorMap } from '../shared/Constants';

function SuccessChip({ label = 'Success', ...props }) {
  const colors = colorMap.success;

  return <Chip label={label} size="small" sx={baseChipStyle(colors)} {...props} />;
}

function PendingChip({ label = 'Pending', ...props }) {
  const colors = colorMap.pending;

  return <Chip label={label} size="small" sx={baseChipStyle(colors)} {...props} />;
}

function BlueButton({ label = 'Pending', ...props }) {
  return (
    <Button
      variant="contained"
      fullWidth
      sx={{
        mt: 2
      }}
      {...props}
    >
      {label}
    </Button>
  );
}

function OutlineButton({ label = 'Pending', ...props }) {
  return (
    <Button
      fullWidth
      variant="outlined"
      sx={{
        mt: 2
      }}
      {...props}
    >
      {label}
    </Button>
  );
}

export { PendingChip, SuccessChip, BlueButton, OutlineButton };
