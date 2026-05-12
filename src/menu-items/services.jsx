import {
  DeploymentUnitOutlined,
  WalletOutlined,
  ThunderboltOutlined,
  SendOutlined,
  ShopOutlined
} from '@ant-design/icons';
import QrCode2Icon from '@mui/icons-material/QrCode2';

const Services = {
  id: 'services',
  title: 'Services',
  type: 'collapse',
  icon: DeploymentUnitOutlined,
  children: [
    {
      id: 'add-money',
      title: 'Payment Gateway',
      type: 'item',
      url: '/services/add-money',        // ← fixed
      icon: WalletOutlined
    },
    {
      id: 'bbps',
      title: 'Credit Card Bill Payment',
      type: 'item',
      url: '/services/bbps',             // ← fixed
      icon: ThunderboltOutlined
    },
    {
      id: 'payout',
      title: 'Payout',
      type: 'item',
      url: '/services/payout',           // ← fixed
      icon: SendOutlined
    },
      {
      id: 'rupay-upi',
      title: 'RupayUpi',
      type: 'item',
      url: '/services/rupay-upi',           // ← fixed
      icon: QrCode2Icon

    }
  ]
};

export default {
  id: 'group-services',
  title: 'Services',                     // ← fixed
  type: 'group',
  children: [Services]
};