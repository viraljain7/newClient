import { Box, Grid } from '@mui/material';
import PgCharges from './PgCharges';
import { useSelector } from 'react-redux';

function AddMoney() {
  const profile = useSelector((state) => state.user.service);

  const activeServiceGroups = serviceGroups.filter((group) =>
    profile.some((service) => service.code === group.providertype && service.value === '1')
  );

  return (
    <Box sx={{ p: 1, maxWidth: '1200px', mx: 'auto' }}>
      <Grid container spacing={3}>
        {activeServiceGroups.map((group) => (
          <PgCharges group={group} />
        ))}
      </Grid>
    </Box>
  );
}

export default AddMoney;

const serviceGroups = [
  {
    title: 'Silver 1',
    providertype: 'payueducation',
    redirect: 'payment1'
  },
  {
    title: 'Diamond 3',
    providertype: 'zwitch',
    redirect: 'payment2'
  },
  {
    title: 'Premium 3',
    providertype: 'premiumpg3',
    redirect: 'payment3'
  },
  {
    title: 'Premium 4',
    providertype: 'diamondpg1',
    redirect: 'payment4'
  },
  {
    title: 'Silver 2',
    providertype: 'diamondpg2',
    redirect: 'payment5'
  },
  {
    title: 'Diamond 2',
    providertype: 'diamondpg3',
    redirect: 'payment6'
  },
// /???????????//////////////////?????????????????????????
  {
    title: 'Silver 2',
    providertype: 'easebuzz',
    redirect: 'payment7'
  },
  {
    title: 'Diamond 2',
    providertype: 'payucruise',
    redirect: 'payment8'
  },

  {
    title: 'Premium 2',
    providertype: 'nixacfpg5',
    redirect: 'payment9'
  },
  {
    title: 'Premium 2',
    providertype: 'nixapremium2',
    redirect: 'payment10'
  }
];
