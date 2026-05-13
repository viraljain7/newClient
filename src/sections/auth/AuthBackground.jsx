// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';

// ==============================|| AUTH BLUR BACK SVG ||============================== //

export default function AuthBackground() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        zIndex: -1,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.77,
        filter: 'blur(4px)'
      }}
    >
      <svg
        width="1800"
        height="700"
        viewBox="0 0 1800 700"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          transform: 'translateX(-10%) translateY(2%) scale(1.25)'
        }}
      >
        <defs>
          <linearGradient id="mainGradient" x1="20" y1="180" x2="160" y2="20" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#001B8F" />
            <stop offset="45%" stopColor="#0B4DFF" />
            <stop offset="100%" stopColor="#24C2FF" />
          </linearGradient>

          <linearGradient id="waveGradient" x1="80" y1="120" x2="170" y2="170" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0072FF" />
            <stop offset="100%" stopColor="#3AD9FF" />
          </linearGradient>

          <linearGradient id="blueGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0B4DFF" />
            <stop offset="100%" stopColor="#24C2FF" />
          </linearGradient>
        </defs>

        {/* LOGO */}
        <g transform="translate(250 170) scale(1.5)">
          <path
            d="M40 160
           L92 35
           C97 24 112 24 118 35
           L160 125
           C165 135 158 145 148 145
           H128
           C120 145 114 141 110 134
           L99 110
           L67 160
           C62 168 52 172 40 160Z"
            fill="url(#mainGradient)"
          />

          <path
            d="M88 92
           L116 92
           L99 58
           Z"
            fill="white"
          />

          <path
            d="M98 125
           C120 118 138 122 158 135"
            stroke="url(#waveGradient)"
            strokeWidth="10"
            strokeLinecap="round"
          />

          <path
            d="M90 142
           C118 136 145 142 170 156"
            stroke="url(#waveGradient)"
            strokeWidth="8"
            strokeLinecap="round"
          />
        </g>

        {/* AQUAPAY */}
        <text
          x="760"
          y="360"
          fontFamily="Arial, Helvetica, sans-serif"
          fontSize="150"
          letterSpacing="14"
          fill="url(#blueGradient)"
          fontWeight="800"
        >
          AQUAPAY
        </text>

        {/* TAGLINE */}
        <text
          x="770"
          y="430"
          fontFamily="Arial, Helvetica, sans-serif"
          fontSize="34"
          letterSpacing="8"
          fill={theme.vars.palette.text.primary}
          fontWeight="600"
        >
          SMART PAYMENTS. SEAMLESS FUTURE.
        </text>

        {/* FEATURES */}
        <g fontFamily="Arial, Helvetica, sans-serif" fontSize="28" fill={theme.vars.palette.text.secondary} fontWeight="600">
          <text x="760" y="520">
            ▣ ACCEPT PAYMENTS
          </text>

          <text x="1110" y="520">
            ↕ SEND &amp; RECEIVE
          </text>

          <text x="1480" y="520">
            ▤ PAY BILLS
          </text>
        </g>
      </svg>
    </Box>
  );
}
