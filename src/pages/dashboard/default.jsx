import { useEffect, useState } from 'react';

// material-ui
import {
  Avatar,
  AvatarGroup,
  Button,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Typography,
  Box
} from '@mui/material';

// project imports
import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import MonthlyBarChart from 'sections/dashboard/default/MonthlyBarChart';
import ReportAreaChart from 'sections/dashboard/default/ReportAreaChart';
import UniqueVisitorCard from 'sections/dashboard/default/UniqueVisitorCard';
import SaleReportCard from 'sections/dashboard/default/SaleReportCard';
import OrdersTable from 'sections/dashboard/default/OrdersTable';

// icons
import EllipsisOutlined from '@ant-design/icons/EllipsisOutlined';
import GiftOutlined from '@ant-design/icons/GiftOutlined';
import MessageOutlined from '@ant-design/icons/MessageOutlined';
import SettingOutlined from '@ant-design/icons/SettingOutlined';

// avatars
import avatar1 from 'assets/images/users/avatar-1.png';
import avatar2 from 'assets/images/users/avatar-2.png';
import avatar3 from 'assets/images/users/avatar-3.png';
import avatar4 from 'assets/images/users/avatar-4.png';
import { useDispatch } from "react-redux";



import api from '../../shared/BaseApi';
import { setUserProfile,setUserActiveService } from '../../store/slices/userSlice';

  // import api from "./baseApi";


// styles
const avatarSX = { width: 32, height: 32 };
const cardSX = {
  borderRadius: 2,
  border: '1px solid',
  borderColor: 'divider',
  boxShadow: 'none'
};

export default function DashboardDefault() {
  const [orderMenuAnchor, setOrderMenuAnchor] = useState(null);
  const [analyticsMenuAnchor, setAnalyticsMenuAnchor] = useState(null);
const dispatch = useDispatch();


const getUserProfile = async () => {
  const formData = new FormData();
  formData.append("type", "profile");

  const res = await api.post("/member/transaction", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

useEffect(() => {
  const init = async () => {
    await fetchProfile();
    await fetchActiveService();
  };

  init();
}, []);

const getActiveService = async () => {
  const formData = new FormData();
  formData.append("type", "list");

  const res = await api.post("/master/portal",formData);


  return res.data;
};




const fetchProfile = async () => {
  try {
    const res = await getUserProfile();

    if (res.statuscode === "TXN") {
        dispatch(setUserProfile(res.data)); // ✅ correct
        // console.log("profile:::",res.data)
        
    }
  } catch (err) {
    console.error(err);
  }
};

const fetchActiveService = async () => {
  try {
    const res = await getActiveService();

    if (res.statuscode === "TXN") {
        dispatch(setUserActiveService(res.data)); // ✅ correct
        // console.log("service:::",res.data)

    }
  } catch (err) {
    console.error(err);
  }
};



  return (
    <Grid container rowSpacing={2} columnSpacing={2}>

      {/* HEADER */}
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

      {/* CHART SECTION */}
      <Grid size={{ xs: 12, md: 7, lg: 8 }}>
        <MainCard sx={cardSX}>
          <Typography variant="subtitle1" fontWeight={600} mb={1}>
            Visitors
          </Typography>
          <UniqueVisitorCard />
        </MainCard>
      </Grid>

      <Grid size={{ xs: 12, md: 5, lg: 4 }}>
        <MainCard sx={cardSX} content={false}>
          <Box sx={{ p: 2 }}>
            <Typography variant="subtitle1" fontWeight={600}>
              Income Overview
            </Typography>
            <Typography variant="h6" color="text.secondary">
              This Week
            </Typography>
            <Typography variant="h4" fontWeight={700}>
              $7,650
            </Typography>
          </Box>
          <MonthlyBarChart />
        </MainCard>
      </Grid>

      {/* TABLE */}
      <Grid size={{ xs: 12, md: 7, lg: 8 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="subtitle1" fontWeight={600}>
            Recent Orders
          </Typography>

          <IconButton size="small" onClick={(e) => setOrderMenuAnchor(e.currentTarget)}>
            <EllipsisOutlined style={{ fontSize: 18 }} />
          </IconButton>

          <Menu
            anchorEl={orderMenuAnchor}
            open={Boolean(orderMenuAnchor)}
            onClose={() => setOrderMenuAnchor(null)}
          >
            <MenuItem>Export CSV</MenuItem>
            <MenuItem>Export Excel</MenuItem>
          </Menu>
        </Box>

        <MainCard sx={{ ...cardSX, mt: 1 }} content={false}>
          <OrdersTable />
        </MainCard>
      </Grid>

      {/* ANALYTICS */}
      <Grid size={{ xs: 12, md: 5, lg: 4 }}>
        <MainCard sx={cardSX} content={false}>
          <List sx={{ p: 0 }}>
            <ListItemButton sx={{ py: 1.2 }}>
              <ListItemText primary="Finance Growth" />
              <Typography fontWeight={600}>+45%</Typography>
            </ListItemButton>

            <ListItemButton sx={{ py: 1.2 }}>
              <ListItemText primary="Expenses Ratio" />
              <Typography fontWeight={600}>0.58%</Typography>
            </ListItemButton>

            <ListItemButton sx={{ py: 1.2 }}>
              <ListItemText primary="Risk Cases" />
              <Typography fontWeight={600}>Low</Typography>
            </ListItemButton>
          </List>

          <ReportAreaChart />
        </MainCard>
      </Grid>

      {/* SALES */}
      <Grid size={{ xs: 12, md: 7, lg: 8 }}>
        <MainCard sx={cardSX}>
          <SaleReportCard />
        </MainCard>
      </Grid>

      {/* TRANSACTION HISTORY */}
      <Grid size={{ xs: 12, md: 5, lg: 4 }}>
        <MainCard sx={cardSX} content={false}>
          <List sx={{ p: 0 }}>
            <ListItemButton sx={{ py: 1.2 }}>
              <ListItemAvatar>
                <Avatar sx={{ ...avatarSX, bgcolor: 'success.lighter', color: 'success.main' }}>
                  <GiftOutlined />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Order #002434" secondary="Today" />
              <Typography fontWeight={600}>+$1430</Typography>
            </ListItemButton>

            <ListItemButton sx={{ py: 1.2 }}>
              <ListItemAvatar>
                <Avatar sx={{ ...avatarSX, bgcolor: 'primary.lighter', color: 'primary.main' }}>
                  <MessageOutlined />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Order #984947" secondary="5 Aug" />
              <Typography fontWeight={600}>+$302</Typography>
            </ListItemButton>
          </List>
        </MainCard>

        {/* SUPPORT */}
        <MainCard sx={{ ...cardSX, mt: 2 }}>
          <Stack spacing={2}>
            <Typography variant="subtitle1" fontWeight={600}>
              Support Chat
            </Typography>

            <AvatarGroup>
              <Avatar src={avatar1} />
              <Avatar src={avatar2} />
              <Avatar src={avatar3} />
              <Avatar src={avatar4} />
            </AvatarGroup>

            <Button variant="contained" size="small">
              Need Help?
            </Button>
          </Stack>
        </MainCard>
      </Grid>
    </Grid>
  );
}
