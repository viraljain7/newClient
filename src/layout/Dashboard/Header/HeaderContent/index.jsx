// material-ui
import useMediaQuery from '@mui/material/useMediaQuery';

import Box from '@mui/material/Box';

// project imports
import Search from './Search';
import Profile from './Profile';
import Notification from './Notification';
import MobileSection from './MobileSection';

// project import
import { OutlineButton } from '../../../../components/CommonComponent';

import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { useSelector } from 'react-redux';

// ==============================|| HEADER - CONTENT ||============================== //

export default function HeaderContent() {
  const downLG = useMediaQuery((theme) => theme.breakpoints.down('lg'));

  const balance = useSelector((state) => state?.user?.profile?.mainbalance);

  return (
    <>
      {!downLG && <Search />}
      {downLG && <Box sx={{ width: '100%', ml: 1 }} />}

      {balance && (
        <OutlineButton
          sx={{
            maxWidth: { xs: "250px", sm:"210px" },
            ml: { xs: 0, sm: 1 },
            fontWeight: 900
          }}
          label={
            <Stack direction="row" spacing={1} alignItems="center">
              <AccountBalanceWalletIcon
                sx={{
                  fontSize: { xs: 18, sm: 24 }
                }}
              />

              <Typography
                variant="body2"
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: '12px', sm: '17px' }
                }}
              >
                ₹ {balance}
              </Typography>
            </Stack>
          }
        />
      )}

      <Notification />
      {!downLG && <Profile />}
      {downLG && <MobileSection />}
    </>
  );
}
