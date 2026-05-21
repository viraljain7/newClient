import { DeploymentUnitOutlined, WalletOutlined, ThunderboltOutlined, SendOutlined, ShopOutlined } from '@ant-design/icons';
import QrCode2Icon from '@mui/icons-material/QrCode2';

const Services = {
  id: 'services',
  title: 'Services',
  type: 'collapse',
  icon: DeploymentUnitOutlined,
  roles: ['Retailer'],

  children: [
    {
      id: 'add-money',
      title: 'Add Money',
      type: 'item',
      url: '/services/add-money',
      roles: ['Retailer'],
      serviceCode: 'addmoney',

      icon: WalletOutlined
    },
    {
      id: 'bbps',
      title: 'Credit Card Bill Payment',
      type: 'item',
      url: '/services/bbps', // ← fixed
      roles: ['Retailer'],
      serviceCode: 'creditcard-online',

      icon: ThunderboltOutlined
    },
    {
      id: 'payout',
      title: 'Payout',
      type: 'item',
      url: '/services/payout', // ← fixed
      roles: ['Retailer'],
      serviceCode: 'domesticrem',

      icon: SendOutlined
    },
    {
      id: 'rupay-upi',
      title: 'RupayUpi',
      type: 'item',
      url: '/services/rupay-upi', // ← fixed
      roles: ['Retailer'],
      serviceCode: 'rupayupi',
      icon: QrCode2Icon
    }
  ]
};

export default {
  id: 'group-services',
  title: 'Services', // ← fixed
  type: 'group',
  children: [Services]
};
