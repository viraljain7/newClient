// material-ui
import List from '@mui/material/List';
import Link from '@mui/material/Link';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

// assets

import { PhoneOutlined } from '@ant-design/icons';

// ==============================|| HEADER PROFILE - SETTING TAB ||============================== //

export default function SettingTab() {
  return (
    <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32 } }}>
      <Link underline="none" sx={{ color: 'inherit' }} target="_blank" href="https://codedthemes.support-hub.io/">
        <ListItemButton>
          <ListItemIcon>
            <PhoneOutlined />
          </ListItemIcon>
          <ListItemText primary="Support: (+91) 9001290012" />
        </ListItemButton>
      </Link>
    
    </List>
  );
}
