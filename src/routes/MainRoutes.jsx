import { lazy } from 'react';

// project imports
import Loadable from 'components/Loadable';
import DashboardLayout from 'layout/Dashboard';
import AddMoneyPage from '../pages/services/AddMoneyPage';
import PG1Page from '../pages/services/PG1Page';
import PG2Page from '../pages/services/PG2Page';
import PG3Page from '../pages/services/PG3Page';
import PG4Page from '../pages/services/PG4Page';
import PG5Page from '../pages/services/PG5Page';
import PG6Page from '../pages/services/PG6Page';
import InvoicePage from '../pages/InvoicePage';
// import SchemeManager from '../pages/master/SchemeManager';

// dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/default')));

// master
const SchemeManager = Loadable(lazy(() => import('pages/master/SchemeManager')));
const ApiManager = Loadable(lazy(() => import('pages/master/ApiManager')));
const SmsMaster = Loadable(lazy(() => import('pages/master/SmsMaster')));
const BankAccount = Loadable(lazy(() => import('pages/master/BankAccount')));
const ProviderMaster = Loadable(lazy(() => import('pages/master/ProviderMaster')));
const PortalMaster = Loadable(lazy(() => import('../pages/master/PortalMaster')));
const ServiceManager = Loadable(lazy(() => import('pages/master/ServiceManager')));
const SliderMaster = Loadable(lazy(() => import('pages/master/SliderMaster')));

// member
const SubAdmin = Loadable(lazy(() => import('pages/member/SubAdmin')));
const NsmZsh = Loadable(lazy(() => import('pages/member/NsmZsh')));
const Sh = Loadable(lazy(() => import('pages/member/Sh')));
const CnfAsm = Loadable(lazy(() => import('pages/member/CnfAsm')));
const MasterDistributor = Loadable(lazy(() => import('pages/member/MasterDistributor')));
const Distributor = Loadable(lazy(() => import('pages/member/Distributor')));
const Retailer = Loadable(lazy(() => import('pages/member/Retailer')));

// fund
const TransferReturn = Loadable(lazy(() => import('pages/fund/TransferReturn')));
const FundRequest = Loadable(lazy(() => import('pages/fund/Request')));
const PosPendingRequest = Loadable(lazy(() => import('pages/fund/PosPendingRequest')));
const TransferReturnReport = Loadable(lazy(() => import('pages/fund/TransferReturnReport')));
const AllFundReport = Loadable(lazy(() => import('pages/fund/AllFundReport')));

// transaction report
const AllTransactionReport = Loadable(lazy(() => import('pages/transaction-report/AllTxn')));
const T360PayReport = Loadable(lazy(() => import('pages/transaction-report/T360Pay')));
const RechargeReport = Loadable(lazy(() => import('pages/transaction-report/Recharge')));
const CreditCardReport = Loadable(lazy(() => import('pages/transaction-report/CreditCard')));
const BBPSReport = Loadable(lazy(() => import('pages/transaction-report/Bbps')));
const AddMoneyReport = Loadable(lazy(() => import('pages/transaction-report/AddMoney')));
const UPIPayoutReport = Loadable(lazy(() => import('pages/transaction-report/UpiPayout')));
const QRCollectionReport = Loadable(lazy(() => import('pages/transaction-report/QrCollection')));
const CommissionReport = Loadable(lazy(() => import('pages/transaction-report/Commission')));
const POSReport = Loadable(lazy(() => import('pages/transaction-report/Pos')));
const SummaryReport = Loadable(lazy(() => import('pages/transaction-report/Summary')));
const UserwiseBusinessReport = Loadable(lazy(() => import('pages/transaction-report/UserwiseBusiness')));
const CommissionDistributionReport = Loadable(lazy(() => import('pages/transaction-report/CommissionDistribution')));

// account statement
const MainLedger = Loadable(lazy(() => import('pages/account-statement/MainLedger')));
const VendorLogs = Loadable(lazy(() => import('pages/account-statement/VendorLogs')));

// roles & permission
const Permission = Loadable(lazy(() => import('pages/roles-permission/Permission')));
const DefaultPermission = Loadable(lazy(() => import('pages/roles-permission/DefaultPermission')));

const MainRoutes = {
  path: '/',
  element: <DashboardLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard/default',
      element: <DashboardDefault />
    },

    // master
    { path: 'master/scheme-manager', element: <SchemeManager /> },
    { path: 'master/api-manager', element: <ApiManager /> },
    { path: 'master/sms-master', element: <SmsMaster /> },
    { path: 'master/bank-account', element: <BankAccount /> },
    { path: 'master/provider-master', element: <ProviderMaster /> },
    { path: 'master/portal-master', element: <PortalMaster /> },
    { path: 'master/service-manager', element: <ServiceManager /> },
    { path: 'master/slider-master', element: <SliderMaster /> },

    // member
    { path: 'member/sub-admin', element: <SubAdmin /> },
    { path: 'member/nsm-zsh', element: <NsmZsh /> },
    { path: 'member/sh', element: <Sh /> },
    { path: 'member/cnf-asm', element: <CnfAsm /> },
    { path: 'member/master-distributor', element: <MasterDistributor /> },
    { path: 'member/distributor', element: <Distributor /> },
    { path: 'member/retailer', element: <Retailer /> },

    // fund
    { path: 'fund/transfer-return', element: <TransferReturn /> },
    { path: 'fund/request', element: <FundRequest /> },
    { path: 'fund/pos-pending-request', element: <PosPendingRequest /> },
    { path: 'fund/transfer-return-report', element: <TransferReturnReport /> },
    { path: 'fund/all-fund-report', element: <AllFundReport /> },

    // transaction report
    { path: 'transaction-report/all', element: <AllTransactionReport /> },
    { path: 'transaction-report/t360-pay', element: <T360PayReport /> },
    { path: 'transaction-report/recharge', element: <RechargeReport /> },
    { path: 'transaction-report/credit-card', element: <CreditCardReport /> },
    { path: 'transaction-report/bbps', element: <BBPSReport /> },
    { path: 'transaction-report/add-money', element: <AddMoneyReport /> },
    { path: 'transaction-report/upi-payout', element: <UPIPayoutReport /> },
    { path: 'transaction-report/qr-collection', element: <QRCollectionReport /> },
    { path: 'transaction-report/commission', element: <CommissionReport /> },
    { path: 'transaction-report/pos', element: <POSReport /> },
    { path: 'transaction-report/summary', element: <SummaryReport /> },
    { path: 'transaction-report/userwise-business', element: <UserwiseBusinessReport /> },
    { path: 'transaction-report/commission-distribution', element: <CommissionDistributionReport /> },

    // account statement
    { path: 'account-statement/main-ledger', element: <MainLedger /> },
    { path: 'account-statement/vendor-logs', element: <VendorLogs /> },

    // roles & permission
    { path: 'roles-permission/permission', element: <Permission /> },
    { path: 'roles-permission/default-permission', element: <DefaultPermission /> },

    // service
    { path: 'services/add-money', element: <AddMoneyPage /> },
    { path: 'services/add-money/payment1', element: <PG1Page /> },
    { path: 'services/add-money/payment2', element: <PG2Page /> },
    { path: 'services/add-money/payment3', element: <PG3Page /> },
    { path: 'services/add-money/payment4', element: <PG4Page /> },
    { path: 'services/add-money/payment5', element: <PG5Page /> },
    { path: 'services/add-money/payment6', element: <PG6Page /> },

    { path: 'invoice/:txnid', element: <InvoicePage /> },
    { path: 'invoice/:txnid/:orderid', element: <InvoicePage /> }




    // { path: 'services/bbps', element: <Bbps /> },
    // { path: 'services/payout', element: <Payout /> },
    // { path: 'services/pos-money-request', element: <PosMoneyRequest /> },
  ]
};

export default MainRoutes;
