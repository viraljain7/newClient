import {
  FileTextOutlined,
  CreditCardOutlined,
  MobileOutlined,
  WalletOutlined,
  QrcodeOutlined,
  DollarOutlined,
  FundProjectionScreenOutlined,
  BarChartOutlined
} from '@ant-design/icons';

const transactionReport = {
  id: 'transaction-report',
  title: 'Transaction Report',
  type: 'collapse',
  icon: FileTextOutlined,
  children: [
    {
      id: 'all-transaction-report',
      title: 'All Transaction Report',
      type: 'item',
      url: '/transaction-report/all',
      icon: FileTextOutlined
    },
    {
      id: 't360-pay-report',
      title: 'T360 Pay Report',
      type: 'item',
      url: '/transaction-report/t360-pay',
      icon: WalletOutlined
    },
    {
      id: 'recharge-report',
      title: 'Recharge Report',
      type: 'item',
      url: '/transaction-report/recharge',
      icon: MobileOutlined
    },
    {
      id: 'credit-card-report',
      title: 'Credit Card Report',
      type: 'item',
      url: '/transaction-report/credit-card',
      icon: CreditCardOutlined
    },
    {
      id: 'bbps-report',
      title: 'BBPS Report',
      type: 'item',
      url: '/transaction-report/bbps',
      icon: FileTextOutlined
    },
    {
      id: 'add-money-report',
      title: 'Add Money Report',
      type: 'item',
      url: '/transaction-report/add-money',
      icon: DollarOutlined
    },
    {
      id: 'upi-payout-report',
      title: 'UPI Payout Report',
      type: 'item',
      url: '/transaction-report/upi-payout',
      icon: WalletOutlined
    },
    {
      id: 'qr-collection-report',
      title: 'QR Collection Report',
      type: 'item',
      url: '/transaction-report/qr-collection',
      icon: QrcodeOutlined
    },
    {
      id: 'commission-report',
      title: 'Commission Report',
      type: 'item',
      url: '/transaction-report/commission',
      icon: DollarOutlined
    },
    {
      id: 'pos-report',
      title: 'POS Report',
      type: 'item',
      url: '/transaction-report/pos',
      icon: FundProjectionScreenOutlined
    },
    {
      id: 'summary-report',
      title: 'Summary Report',
      type: 'item',
      url: '/transaction-report/summary',
      icon: BarChartOutlined
    },
    {
      id: 'userwise-business-report',
      title: 'Userwise Bussiness',
      type: 'item',
      url: '/transaction-report/userwise-business',
      icon: BarChartOutlined
    },
    {
      id: 'commission-distribution-report',
      title: 'Commission Distribution ',
      type: 'item',
      url: '/transaction-report/commission-distribution',
      icon: DollarOutlined
    }
  ]
};

export default {
  id: 'group-transaction-report',
  title: 'Navigation',
  type: 'group',
  children: [transactionReport]
};