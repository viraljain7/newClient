import { Box, Grid } from '@mui/material';
import PgCharges from './PgCharges';
import { useSelector } from 'react-redux';

function AddMoney() {
  const profile = useSelector((state) => state.user.service);

  const activeServiceGroups = serviceGroups.filter((group) =>
    profile.some((service) => service.code === group.providertype && service.value === '1')
  );

  return (
    <Box sx={{ p: 1,  mx: 'auto' }}>
      <Grid sx={{display: 'flex', flexWrap: 'wrap', gap: 2 }} spacing={3}>
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
    title: 'Premium 2',
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
  {
    title: 'Platinum 2',
    providertype: 'platinumpg1',
    redirect: 'payment7'
  },
    {
    title: 'Diamond 4',
    providertype: 'premiumpg4',
    redirect: 'payment8'
  },
    {
    title: 'Silver 3',
    providertype: 'easebuzz',
    redirect: 'payment9'
  },
  // /???????????//////////////////?????????????????????????
];
