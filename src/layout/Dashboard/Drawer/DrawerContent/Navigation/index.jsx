// // material-ui
// import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';

// // project import
// import NavGroup from './NavGroup';
// import menuItem from 'menu-items';

// // ==============================|| DRAWER CONTENT - NAVIGATION ||============================== //

// export default function Navigation() {
//   const navGroups = menuItem.items.map((item) => {
//     switch (item.type) {
//       case 'group':
//         return <NavGroup key={item.id} item={item} />;
//       default:
//         return (
//           <Typography key={item.id} variant="h6" color="error" align="center">
//             Fix - Navigation Group
//           </Typography>
//         );
//     }
//   });

//   return <Box sx={{ pt: 2 }}>{navGroups}</Box>;
// }

// material-ui
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// redux
import { useSelector } from 'react-redux';

// project import
import NavGroup from './NavGroup';
import menuItem from 'menu-items';
import filterMenuByRole from '../../../../../menu-items/filterMenuByRole';

// ==============================|| DRAWER CONTENT - NAVIGATION ||============================== //

export default function Navigation() {
  // get logged in user role
  const userRole = useSelector((state) => state?.user?.profile?.role?.name);
  const services = useSelector((state) => state?.user?.service);


  // filter menus
  const filteredMenus = filterMenuByRole(menuItem.items, userRole || 'Retailer', services);
  const navGroups = filteredMenus.map((item) => {
    switch (item.type) {
      case 'group':
        return <NavGroup key={item.id} item={item} />;

      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Fix - Navigation Group
          </Typography>
        );
    }
  });

  return <Box sx={{ pt: 2 }}>{navGroups}</Box>;
}
