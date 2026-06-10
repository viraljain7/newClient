import { BankOutlined, FileTextOutlined } from '@ant-design/icons';

const accountStatement = {
  id: 'account-statement',
  title: 'Account Statement',
  type: 'collapse',
  icon: BankOutlined,
  children: [
    {
      id: 'main-ledger',
      title: 'Main Ledger',
      type: 'item',
      url: '/account-statement/main-ledger',
      icon: BankOutlined
    },
      {
      id: 'settlement-ledger',
      title: 'Settlement Ledger',
      type: 'item',
      url: '/account-statement/settlement-ledger',
      icon: BankOutlined
    },
    {
      id: 'vendor-logs',
      title: 'Vendor Logs',
      type: 'item',
      url: '/account-statement/vendor-logs',
      icon: FileTextOutlined,
      roles: ['Admin', 'Subadmin']
    },
    {
      id: 'login-logs',
      title: 'Login Logs',
      type: 'item',
      url: '/account-statement/login-logs',
      icon: FileTextOutlined,
      roles: ['Admin', 'Subadmin']
    }
  ]
};

export default {
  id: 'group-account-statement',
  title: 'Navigation',
  type: 'group',
  children: [accountStatement]
};
