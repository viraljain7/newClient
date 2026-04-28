import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Skeleton
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import api from '../../../shared/BaseApi';
import { useDispatch } from 'react-redux';
import { setBBPS } from '../../../store/slices/bbpsSlice';
import { useNavigate } from 'react-router';

function BbpsService() {
  const [data, setData] = useState(null);
  const [expanded, setExpanded] = useState('Credit Cards');

const navigate = useNavigate();


const dispatch=  useDispatch();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await api.get('/service/bbpscc/c15');
      setData(res?.data?.data);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 Accordion control (only one open)
  const handleChange = (panel) => (_, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // 🔹 Card Component
  const CardItem = ({ icon, title,code }) => (
    <Card
      variant="outlined"
      sx={{
        border: '2px dashed #e0e0e0',
        borderRadius: 2,
        transition: '0.25s',
        cursor: 'pointer',
        '&:hover': {
          borderColor: '#1976d2',
          boxShadow: 2,
          transform: 'translateY(-3px)'
        }
      }}

      onClick={()=>{
        dispatch(setBBPS({title,code}))
      navigate("c15")
    }}
    >
      <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {icon}
        <Typography variant="body2" fontWeight={600}>
          {title}
        </Typography>
      </CardContent>
    </Card>
  );

  // 🔹 Accordion Section
  const SectionAccordion = ({ title, list, icon, defaultOpen = false }) => {
    if (!list || list.length === 0) return null;

    return (
      <Accordion
        expanded={expanded === title}
        onChange={handleChange(title)}
        defaultExpanded={defaultOpen}
        sx={{
          mb: 2,
          borderRadius: 2,
          border: '1px solid #eee',
          '&:before': { display: 'none' }
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Box display="flex" alignItems="center" gap={1}>
            {icon}
            <Typography fontWeight={700}>{title}</Typography>
          </Box>
        </AccordionSummary>

        <AccordionDetails>
          <Box display="flex" flexWrap="wrap" gap={2}>
            {list.map((item) => (
              <Box
                key={item.blr_id}
                sx={{
                  flex: '1 1 250px',
                  minWidth: '200px'
                }}
              >
                <CardItem icon={icon} title={item.blr_name} code={item.blr_id}/>
              </Box>
            ))}
          </Box>
        </AccordionDetails>
      </Accordion>
    );
  };

  // 🔹 Skeleton Loader
  const SkeletonLoader = () => (
    <Box>
      {Array.from({ length: 3 }).map((_, i) => (
        <Box key={i} mb={3}>
          <Skeleton variant="text" width={150} height={30} sx={{ mb: 1 }} />
          <Box display="flex" flexWrap="wrap" gap={2}>
            {Array.from({ length: 12 }).map((_, j) => (
              <Skeleton
                key={j}
                variant="rounded"
                height={80}
                sx={{
                  flex: '1 1 250px',
                  minWidth: '200px',
                  borderRadius: 2
                }}
              />
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );

  return (
    <Box p={2}>
      {!data && <SkeletonLoader />}

      {data && (
        <>
          <Typography variant="h6" fontWeight={700} mb={3}>
            BBPS Services
          </Typography>

          {[
            {
              title: 'Credit Cards',
              list: data?.creditcard,
              icon:
                'https://static.vecteezy.com/system/resources/previews/000/357/048/large_2x/vector-credit-card-icon.jpg',
              defaultOpen: true
            },
            {
              title: 'Electricity',
              list: data?.electricity,
              icon: 'https://img.icons8.com/?size=50&id=ikLKrVmLdsmi&format=png'
            },
            {
              title: 'FASTag',
              list: data?.fastag,
              icon: 'https://img.icons8.com/?size=96&id=3B1IMfcbCNeC&format=png'
            }
          ].map((section) => (
            <SectionAccordion
              key={section.title}
              title={section.title}
              list={section.list}
              defaultOpen={section.defaultOpen || false}
              icon={
                <img
                  src={section.icon}
                  alt={section.title}
                  style={{ width: 35 }}
                />
              }
            />
          ))}
        </>
      )}
    </Box>
  );
}

export default BbpsService;