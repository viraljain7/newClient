import PropTypes from 'prop-types';
// material-ui
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';


import UserOutlined from '@ant-design/icons/UserOutlined';
import {PercentageOutlined} from '@ant-design/icons';

// ==============================|| HEADER PROFILE - PROFILE TAB ||============================== //

export default function ProfileTab() {
  return (
    <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32 } }}>
    
      <ListItemButton>
        <ListItemIcon>
          <UserOutlined />
        </ListItemIcon>
        <ListItemText primary="My Profile" />
      </ListItemButton>

      <ListItemButton>
        <ListItemIcon>
          <PercentageOutlined />
        </ListItemIcon>
        <ListItemText primary="Charges" />
      </ListItemButton>
    
    </List>
  );
}

ProfileTab.propTypes = { handleLogout: PropTypes.func };
