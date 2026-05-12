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
        opacity: 0.55,
        filter: 'blur(5px)'
      }}
    >
      <svg
        width="1200"
        height="400"
        viewBox="0 0 1600 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="blueGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={theme.vars.palette.primary.dark} />
            <stop offset="100%" stopColor={theme.vars.palette.primary.light} />
          </linearGradient>
        </defs>

        {/* AquaPay Logo Icon */}
        <path
          d="
            M90 320
            C70 200, 130 120, 190 100
            C250 80, 310 120, 340 180
            L290 220
            C260 170, 220 145, 185 160
            C145 178, 130 230, 145 285
            C160 340, 210 370, 280 350
            C315 340, 345 325, 370 300
            C350 355, 305 400, 235 420
            C145 445, 80 400, 90 320Z
          "
          fill="url(#blueGradient)"
        />

        <path
          d="
            M140 260
            C220 220, 300 230, 370 285
            C315 265, 255 260, 185 285
            C165 292, 145 278, 140 260Z
          "
          fill={theme.vars.palette.primary.main}
        />

        {/* AQUAPAY Text */}
        <text
          x="450"
          y="240"
          fontFamily="Arial, Helvetica, sans-serif"
          fontSize="150"
          letterSpacing="12"
          fill="url(#blueGradient)"
          fontWeight="700"
        >
          AQUAPAY
        </text>

        {/* Tagline */}
        <text
          x="570"
          y="325"
          fontFamily="Arial, Helvetica, sans-serif"
          fontSize="36"
          letterSpacing="8"
          fill={theme.vars.palette.text.primary}
          fontWeight="600"
        >
          SMART PAYMENTS. SEAMLESS FUTURE.
        </text>

        {/* Bottom Features */}
        <g
          fontFamily="Arial, Helvetica, sans-serif"
          fontSize="28"
          fill={theme.vars.palette.text.secondary}
          fontWeight="600"
        >
          <text x="380" y="410">
            ▣ ACCEPT PAYMENTS
          </text>

          <text x="700" y="410">
            ↕ SEND &amp; RECEIVE
          </text>

          <text x="1030" y="410">
            ▤ PAY BILLS
          </text>

          <text x="1260" y="410">
            ◫ ALL PAYMENT SOLUTIONS
          </text>
        </g>
      </svg>
    </Box>
  );
}