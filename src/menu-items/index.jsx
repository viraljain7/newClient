// project import
import dashboard from './dashboard';

import master from './master';
import member from './member';
import funds from './funds';
import txnReport from './txnReport';
import accStmt from './accStmt';
import rolesNpermission from './rolesNpermission';
import services from './services';

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
  items: [dashboard,master,member, funds,services,txnReport,accStmt,rolesNpermission]
};

export default menuItems;
