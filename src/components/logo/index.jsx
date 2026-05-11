import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// material-ui
import ButtonBase from '@mui/material/ButtonBase';

// project imports
import { APP_DEFAULT_PATH } from 'config';
import logo from "../../img/logo.jpeg"

// ==============================|| MAIN LOGO ||============================== //

export default function LogoSection({ reverse, isIcon, sx, to }) {
  return (
    <ButtonBase disableRipple component={Link} to={to || APP_DEFAULT_PATH} sx={sx} aria-label="Logo">
      {isIcon ? <img src={logo} alt="logo" width={60} height={40}/> : <img src={logo} alt="logo" width={200} height={100}/>}
    </ButtonBase>
  );
}

LogoSection.propTypes = { reverse: PropTypes.bool, isIcon: PropTypes.bool, sx: PropTypes.any, to: PropTypes.any };
