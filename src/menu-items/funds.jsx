import {
  DollarCircleOutlined,
  SwapOutlined,
  FileTextOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';

const fund = {
  id: 'fund',
  title: 'Fund',
  type: 'collapse',
  icon: DollarCircleOutlined,
  children: [
    {
      id: 'transfer-return',
      title: 'Transfer/Return',
      type: 'item',
      url: '/fund/transfer-return',
      icon: SwapOutlined
    },
      {
      id: 'transfer-return-report',
      title: 'Transfer Return Report',
      type: 'item',
      url: '/fund/transfer-return-report',
      icon: FileTextOutlined
    },
    // {
    //   id: 'request',
    //   title: 'Request',
    //   type: 'item',
    //   url: '/fund/request',
    //   icon: DollarCircleOutlined,
    // //   chip: {
    // //     label: '3',
    // //     color: 'success',
    // //     size: 'small'
    // //   }
    // },
    // {
    //   id: 'pos-pending-request',
    //   title: 'POS Pending Request',
    //   type: 'item',
    //   url: '/fund/pos-pending-request',
    //   icon: ClockCircleOutlined,
    // //   chip: {
    // //     label: '0',
    // //     color: 'success',
    // //     size: 'small'
    // //   }
    // },
  
    // {
    //   id: 'all-fund-report',
    //   title: 'All Fund Report',
    //   type: 'item',
    //   url: '/fund/all-fund-report',
    //   icon: FileTextOutlined
    // }
  ]
};

export default {
  id: 'group-fund',
  title: 'Navigation',
  type: 'group',
  children: [fund]
};