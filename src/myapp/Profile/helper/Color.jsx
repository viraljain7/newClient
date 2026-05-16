export const kycStyles = {
  verified: {
    bgcolor: '#DCFCE7',
    color: '#166534',
  },

  submitted: {
    bgcolor: '#DBEAFE',
    color: '#1D4ED8',
  },

  pending: {
    bgcolor: '#FEF3C7',
    color: '#92400E',
  },

  rejected: {
    bgcolor: '#FEE2E2',
    color: '#B91C1C',
  },
};

export const getKycStyle = (status) => {
  return (
    kycStyles?.[status?.toLowerCase()] || {
      bgcolor: '#E5E7EB',
      color: '#374151',
    }
  );
};