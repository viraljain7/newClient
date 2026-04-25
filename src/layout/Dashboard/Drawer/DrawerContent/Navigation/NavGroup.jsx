import PropTypes from 'prop-types';

// material-ui
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// icons
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

// react
import { useState } from 'react';

// project import
import NavItem from './NavItem';
import { useGetMenuMaster } from 'api/menu';

function NavCollapse({ item }) {
  const [open, setOpen] = useState(false);
  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = menuMaster.isDashboardDrawerOpened;

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  const Icon = item.icon;

  return (
    <>
      <ListItemButton
        onClick={handleToggle}
        sx={{
          minHeight: 48,
          px: 2.5,
          justifyContent: drawerOpen ? 'initial' : 'center'
        }}
      >
        {Icon && (
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: drawerOpen ? 1.5 : 'auto',
              justifyContent: 'center'
            }}
          >
            <Icon />
          </ListItemIcon>
        )}

        {drawerOpen && (
          <ListItemText
            primary={item.title}
            sx={{
              opacity: drawerOpen ? 1 : 0
            }}
          />
        )}

        {drawerOpen && (open ? <ExpandLess /> : <ExpandMore />)}
      </ListItemButton>

      <Collapse in={open && drawerOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding >
          {item.children?.map((child) => {
            if (child.type === 'item') {
              return <NavItem key={child.id} item={child} level={1.5} />;
            }

            return null;
          })}
        </List>
      </Collapse>
    </>
  );
}
// ==============================|| NAVIGATION - LIST GROUP ||============================== //

export default function NavGroup({ item }) {
  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = menuMaster.isDashboardDrawerOpened;

  const navItems = item.children?.map((menuItem) => {
    switch (menuItem.type) {
      case 'collapse':
        return <NavCollapse key={menuItem.id} item={menuItem}  />;

      case 'item':
        return <NavItem key={menuItem.id} item={menuItem} level={1} />;

      default:
        return (
          <Typography key={menuItem.id} variant="h6" color="error" align="center">
            Fix - Group Collapse or Items
          </Typography>
        );
    }
  });

  return (
    <List
  
      sx={{ mb: drawerOpen ? .5 : 0, py: 0, zIndex: 0 }}
    >
      {navItems}
    </List>
  );
}

NavCollapse.propTypes = {
  item: PropTypes.object
};

NavGroup.propTypes = {
  item: PropTypes.object
};