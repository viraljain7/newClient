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
      url: '/transaction-report/all-report',
      icon: FileTextOutlined,
      roles: ['Admin', 'Subadmin', 'Retailer']
    },
    {
      id: 'payout-report',
      title: 'Payout Report',
      type: 'item',
      url: '/transaction-report/payout-report',
      icon: WalletOutlined,
      roles: ['Admin', 'Subadmin', 'Retailer']
    },
    // {
    //   id: 'recharge-report',
    //   title: 'Recharge Report',
    //   type: 'item',
    //   url: '/transaction-report/recharge',
    //   icon: MobileOutlined
    // },
    // {
    //   id: 'credit-card-report',
    //   title: 'Credit Card Report',
    //   type: 'item',
    //   url: '/transaction-report/credit-card',
    //   icon: CreditCardOutlined
    // },
    {
      id: 'creditcard-bill-report',
      title: 'Creditcard Bill Payment Report',
      type: 'item',
      url: '/transaction-report/creditcard-bill-report',
      icon: FileTextOutlined,
      roles: ['Admin', 'Subadmin', 'Retailer']
    },
    {
      id: 'payment-gateway-report',
      title: 'Payment Gateway Report',
      type: 'item',
      url: '/transaction-report/payment-gateway-report',
      icon: DollarOutlined,
      roles: ['Admin', 'Subadmin', 'Retailer']
    },
    {
      id: 'pos-report',
      title: 'POS Report',
      type: 'item',
      url: '/transaction-report/pos',
      icon: FundProjectionScreenOutlined,
      roles: ['Admin', 'Subadmin', 'Retailer']
    },
    // {
    //   id: 'upi-payout-report',
    //   title: 'UPI Payout Report',
    //   type: 'item',
    //   url: '/transaction-report/upi-payout',
    //   icon: WalletOutlined
    // },
    // {
    //   id: 'qr-collection-report',
    //   title: 'QR Collection Report',
    //   type: 'item',
    //   url: '/transaction-report/qr-collection',
    //   icon: QrcodeOutlined
    // },
    {
      id: 'commission-report',
      title: 'Commission Report',
      type: 'item',
      url: '/transaction-report/commission',
      roles: ['Admin', 'Subadmin', 'Distributor', 'MasterDistributor', 'NSM', 'SH', 'CNF'],

      icon: DollarOutlined
    },

    {
      id: 'summary-report',
      title: 'Summary Report',
      type: 'item',
      url: '/transaction-report/summary',
      roles: ['Admin', 'Subadmin'],

      icon: BarChartOutlined
    },
    {
      id: 'userwise-business-report',
      title: 'Userwise Bussiness',
      type: 'item',
      url: '/transaction-report/userwise-business',
      icon: BarChartOutlined,
      roles: ['Admin', 'Subadmin', 'Distributor', 'MasterDistributor', 'NSM', 'SH', 'CNF']
    },

    {
      id: 'commission-distribution-report',
      title: 'Commission Distribution ',
      type: 'item',
      url: '/transaction-report/commission-distribution',
      roles: ['Admin', 'Subadmin'],

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
