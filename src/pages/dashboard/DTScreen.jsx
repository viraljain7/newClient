import { useSelector } from 'react-redux';

import { useState } from 'react';

// material-ui
import { Grid, IconButton, List, ListItemButton, ListItemText, Menu, MenuItem, Typography, Box } from '@mui/material';

// project imports
import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';

// icons
import EllipsisOutlined from '@ant-design/icons/EllipsisOutlined';

import MaxWidthDialog from '../../myapp/kyc';
import OrderTable from '../../sections/dashboard/default/OrdersTable';

// styles
const cardSX = {
  borderRadius: 2,
  border: '1px solid',
  borderColor: 'divider',
  boxShadow: 'none'
};

function DTScreen() {
  const [orderMenuAnchor, setOrderMenuAnchor] = useState(null);

  const user = useSelector((state) => state.user.profile);
  return (
    <Grid container rowSpacing={2} columnSpacing={2}>
      {/* HEADER */}
      {user?.kyc !== 'verified' && <MaxWidthDialog />}

      <Grid size={12}>
        <Typography variant="h5" fontWeight={700}>
          Dashboard
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Overview & insights
        </Typography>
      </Grid>
      {/* KPI CARDS */}
      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <AnalyticEcommerce title="Page Views" count="4,42,236" percentage={59.3} extra="35k" sx={cardSX} />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <AnalyticEcommerce title="Users" count="78,250" percentage={70.5} extra="8.9k" sx={cardSX} />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <AnalyticEcommerce title="Orders" count="18,800" percentage={27.4} color="warning" extra="1,943" sx={cardSX} />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <AnalyticEcommerce title="Sales" count="35,078" percentage={27.4} color="warning" extra="20k" sx={cardSX} />
      </Grid>

      {/* TABLE */}
      <Grid size={{ xs: 12, md: 7, lg: 8 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="subtitle1" fontWeight={600} sx={{ p: 1 }}>
            Downline Member
          </Typography>

          <IconButton size="small" onClick={(e) => setOrderMenuAnchor(e.currentTarget)}>
            <EllipsisOutlined style={{ fontSize: 18 }} />
          </IconButton>

          <Menu anchorEl={orderMenuAnchor} open={Boolean(orderMenuAnchor)} onClose={() => setOrderMenuAnchor(null)}>
            <MenuItem>Export CSV</MenuItem>
            <MenuItem>Export Excel</MenuItem>
          </Menu>
        </Box>

        <MainCard sx={{ ...cardSX, mt: 1 }} content={false}>
          <OrderTable />
        </MainCard>
      </Grid>

      {/* ANALYTICS */}
      <Grid size={{ xs: 12, md: 5, lg: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="subtitle1" fontWeight={600} sx={{ p: 1 }}>
            Commission
          </Typography>

          <IconButton size="small" onClick={(e) => setOrderMenuAnchor(e.currentTarget)}>
            <EllipsisOutlined style={{ fontSize: 18 }} />
          </IconButton>
        </Box>
        <MainCard sx={{ ...cardSX, mt: 1 }} content={false}>
          <OrderTable />
        </MainCard>
      </Grid>
    </Grid>
  );
}

export default DTScreen;
