import {
  DeploymentUnitOutlined,
  WalletOutlined,
  ThunderboltOutlined,
  SendOutlined,
  ShopOutlined
} from '@ant-design/icons';

const Services = {
  id: 'services',
  title: 'Services',
  type: 'collapse',
  icon: DeploymentUnitOutlined,
  children: [
    {
      id: 'add-money',
      title: 'Add Money',
      type: 'item',
      url: '/services/add-money',        // ← fixed
      icon: WalletOutlined
    },
    {
      id: 'bbps',
      title: 'BBPS',
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
    }
  ]
};

export default {
  id: 'group-services',
  title: 'Services',                     // ← fixed
  type: 'group',
  children: [Services]
};