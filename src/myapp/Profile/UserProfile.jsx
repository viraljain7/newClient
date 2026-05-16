import React, { useState } from 'react';

import { Avatar, Box,  Card, Chip, Divider,  Stack, Tab, Tabs, TextField, Typography } from '@mui/material';

import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import SecurityRoundedIcon from '@mui/icons-material/SecurityRounded';
import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded';
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';
import DeviceHubRoundedIcon from '@mui/icons-material/DeviceHubRounded';
import RouterRoundedIcon from '@mui/icons-material/RouterRounded';
import avatar1 from 'assets/images/users/avatar-1.png';

import UserInfo from './helper/UserInfo';
import Scheme from './helper/Scheme';
import Password from './helper/Password';
import Kyc from './helper/Kyc';
import WalletLock from './helper/WalletLock';
import ParentMapping from './helper/ParentMapping';
import DeviceMapping from './helper/DeviceMapping';
import { useParams } from 'react-router';

export function TabPanel({ children, value, index }) {
  return value === index ? children : null;
}

export function CustomInput(props) {
  return (
    <TextField
      fullWidth
      size="small"
      variant="outlined"
      {...props}
      sx={{
        '& .MuiOutlinedInput-root': {
          bgcolor: '#fff',

          '& fieldset': {
            borderColor: '#E2E8F0'
          },

          '&:hover fieldset': {
            borderColor: '#CBD5E1'
          },

          '&.Mui-focused fieldset': {
            borderColor: '#2563EB'
          }
        },

        '& .MuiOutlinedInput-input': {
          py: 1.5,
          fontSize: 14
        },

        '& .MuiInputLabel-root': {
          fontSize: 13
        }
      }}
    />
  );
}

export default function UserProfile() {

    const {user_id}=useParams()

  const [tab, setTab] = useState(0);

  return (
    <Card
      elevation={0}
      sx={{
        border: '1px solid #E2E8F0',
        overflow: 'hidden',
        bgcolor: '#F8FAFC'
      }}
    >
      {/* HEADER */}
      <Box
        sx={{
          py: 3,
          px: 3,
          bgcolor: '#fff'
        }}
      >
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          justifyContent="space-between"
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar alt="profile user" src={avatar1} size="sm" sx={{ '&:hover': { outline: '1px solid', outlineColor: 'primary.main' } }} />

            <Box>
              <Typography fontSize={22} fontWeight={700}>
                Vishal Desai
              </Typography>

              <Typography fontSize={14} color="text.secondary">
                vishal.a.desai2010@gmail.com
              </Typography>

              <Stack direction="row" spacing={1} mt={1}>
                <Chip
                  size="small"
                  label="KYC Verified"
                  icon={<CheckCircleRoundedIcon />}
                  sx={{
                    bgcolor: '#DCFCE7',
                    color: '#166534',
                    fontWeight: 600
                  }}
                />
              </Stack>
            </Box>
          </Stack>
        </Stack>
      </Box>

      <Divider />

      {/* TABS */}
      <Box sx={{ bgcolor: '#fff' }}>
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            minHeight: 58,

            '& .MuiTabs-indicator': {
              bgcolor: '#2563EB'
            },

            '& .MuiTab-root': {
              minHeight: 58,
              textTransform: 'none',
              fontWeight: 600,
              fontSize: 14,
              color: '#64748B',
              gap: 1.2
            },

            '& .Mui-selected': {
              color: '#111827'
            }
          }}
        >
          <Tab icon={<PersonRoundedIcon />} iconPosition="start" label="Profile" />

          <Tab icon={<SettingsRoundedIcon />} iconPosition="start" label="Schemes" />

          <Tab icon={<SecurityRoundedIcon />} iconPosition="start" label="Security" />

          <Tab icon={<CloudUploadRoundedIcon />} iconPosition="start" label="KYC Upload" />

          <Tab icon={<AccountBalanceWalletRoundedIcon />} iconPosition="start" label="Wallet Lock" />

          <Tab icon={<DeviceHubRoundedIcon />} iconPosition="start" label="Parent Mapping" />

          <Tab icon={<RouterRoundedIcon />} iconPosition="start" label="Device Mapping" />
        </Tabs>
      </Box>

      <Divider />

      {/* CONTENT */}
      <Box sx={{ p: 3 }}>
        {/* PROFILE TAB */}
          <UserInfo tab={tab} />

        {/* SCHEMES TAB */}
          <Scheme tab={tab} />

        {/* SECURITY TAB */}
          <Password tab={tab} />

        {/* KYC TAB */}
          <Kyc tab={tab} />

        {/* WALLET LOCK TAB */}
          <WalletLock tab={tab} />

        {/* PARENT MAPPING TAB */}
          <ParentMapping tab={tab} />

        {/* DEVICE MAPPING TAB */}
          <DeviceMapping tab={tab} />

    
    
      </Box>
    </Card>
  );
}
