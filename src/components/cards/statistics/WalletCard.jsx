
import PropTypes from 'prop-types';

// Material UI
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// Project imports
import MainCard from 'components/MainCard';

// Assets
import RiseOutlined from '@ant-design/icons/RiseOutlined';
import FallOutlined from '@ant-design/icons/FallOutlined';

const iconSX = {
  fontSize: '0.75rem',
  color: 'inherit',
  marginLeft: 0,
  marginRight: 0
};

export default function WalletCard({
  color = 'primary',
  title,
  count,
  percentage,
  isLoss,
  extra,
  icon: Icon
}) {
  return (
    <MainCard
      contentSX={{ p: 2.25 }}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s ease',

        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.08)',

          '& .wallet-bg-icon': {
            opacity: 0.15,
            transform: 'rotate(-15deg) scale(1.1)'
          }
        }
      }}
    >
      {/* BACKGROUND ICON - TOP RIGHT CORNER */}
      {Icon && (
        <Box
          className="wallet-bg-icon"
          sx={{
            position: 'absolute',
            top: -15,
            right: -15,
            opacity: 0.08,
            color: `${color}.main`,
            pointerEvents: 'none',
            transform: 'rotate(-15deg)',
            transition: 'all 0.3s ease',
            zIndex: 0
          }}
        >
          <Icon style={{ fontSize: 100 }} />
        </Box>
      )}

      {/* CARD CONTENT */}
      <Stack sx={{ gap: 0.5, position: 'relative', zIndex: 1 }}>
        <Typography variant="h6" color="text.secondary" fontWeight={"bolder"}>
          {title}
        </Typography>

        <Grid container sx={{ alignItems: 'center' }}>
          <Grid>
            <Typography variant="h4" color="inherit">
              {count}
            </Typography>
          </Grid>

          {percentage && (
            <Grid>
              <Chip
                variant="combined"
                color={color}
                icon={
                  isLoss
                    ? <FallOutlined style={iconSX} />
                    : <RiseOutlined style={iconSX} />
                }
                label={`${percentage}%`}
                sx={{ ml: 1.25, pl: 1 }}
                size="small"
              />
            </Grid>
          )}
        </Grid>
      </Stack>

      {/* FOOTER */}
      <Box sx={{ pt: 2.25, position: 'relative', zIndex: 1 }}>
        <Typography variant="caption" color="text.secondary">
          <Typography
            component="span"
            variant="caption"
            sx={{
              color: `${color}.main`,
              fontSize: '16px',
              fontWeight: 'bolder'
            }}
          >
            {extra}
          </Typography>
        </Typography>
      </Box>
    </MainCard>
  );
}

WalletCard.propTypes = {
  color: PropTypes.string,
  title: PropTypes.string,
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  percentage: PropTypes.number,
  isLoss: PropTypes.bool,
  extra: PropTypes.string,
  icon: PropTypes.elementType
};
