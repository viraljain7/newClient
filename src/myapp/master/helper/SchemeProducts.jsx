import { Drawer, Box, Card, CardContent, Typography, IconButton, TextField } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';

import { useEffect, useMemo, useState } from 'react';

import useSchemeManager from './useSchmeManager';

import { OutlineButton } from '../../../components/CommonComponent';
import { setProductName } from '../../../store/slices/schemeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router';

function SchemeProducts({ open, onClose }) {
  const { products = [], getSchemeProducts } = useSchemeManager();
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { scheme_id } = useSelector((state) => state.scheme);

  useEffect(() => {
    if (open) {
      getSchemeProducts();
    }
  }, [open]);

  const filteredProducts = useMemo(() => {
    return products.filter((item) => (item?.name || item)?.toLowerCase()?.includes(search.toLowerCase()));
  }, [products, search]);

  const getProductName = (name) => {
    const up = name.toLowerCase();
    switch (up) {
      case 'payueducation':
        return 'Silver 1';

      case 'zwitch':
        return 'Diamond 3';

      case 'premiumpg3':
        return 'Premium 2';

      case 'diamondpg1':
        return 'Premium 4';

      case 'diamondpg2':
        return 'Silver 2';

      case 'diamondpg3':
        return 'Diamond 2';

      case 'dmt':
        return 'Payout';

      default:
        return name;
    }
  };
  

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box
        sx={{
          width: {
            xs: '100vw',
            sm: 500,
            md: 700,
            lg: 800
          },
          height: '100%'
        }}
      >
        <Card
          sx={{
            height: '100%',
            borderRadius: 0
          }}
        >
          <CardContent>
            {/* HEADER */}

            <Box position="relative" mb={3}>
              <Typography fontWeight={700} fontSize={18}>
                Products
              </Typography>

              <TextField
                placeholder="Search Products"
                size="small"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                sx={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', width: '100%', maxWidth: 300 }}
              />

              <IconButton
                onClick={onClose}
                sx={{
                  position: 'absolute',
                  right: 0,
                  top: '50%',
                  transform: 'translateY(-50%)'
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>

            {/* PRODUCTS */}

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: 'repeat(2, 1fr)',
                  md: 'repeat(3, 1fr)',
                  lg: 'repeat(4, 1fr)'
                },
                gap: 2,
                width: '100%'
              }}
            >
              {filteredProducts.map((item) => (
                <OutlineButton
                  key={item}
                  size="large"
                  label={getProductName(item)}
                  sx={{
                    width: '100%',
                    height: 45,
                    fontWeight: 600
                  }}
                  onClick={() => {
                    dispatch(setProductName(item));
                    navigate(`${scheme_id}`);
                  }}
                />
              ))}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Drawer>
  );
}

export default SchemeProducts;
