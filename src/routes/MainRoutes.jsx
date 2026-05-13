import { lazy } from 'react';

// project imports
import Loadable from 'components/Loadable';
import DashboardLayout from 'layout/Dashboard';
import AddMoneyPage from '../pages/services/AddMoneyPage';
import PG1Page from '../pages/services/PG/PG1Page';
import PG2Page from '../pages/services/PG/PG2Page';
import PG3Page from '../pages/services/PG/PG3Page';
import PG4Page from '../pages/services/PG/PG4Page';
import PG5Page from '../pages/services/PG/PG5Page';
import PG6Page from '../pages/services/PG/PG6Page';
import InvoicePage from '../pages/InvoicePage';
import BBPSPage from '../pages/services/BBPSPage';
import FetchBBPSBillPage from '../pages/services/FetchBBPSBillPage';
import PayoutPage from '../pages/services/PayoutPage';
import RupayUpiLoadWalletPage from '../pages/services/RupayUpiLoadWalletPage';
import { ProtectedRoute } from './ProtectedRoute';

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
const TransferReturnReport = Loadable(lazy(() => import('pages/fund/TransferReturnReport')));
const FundRequest = Loadable(lazy(() => import('pages/fund/Request')));
const PosPendingRequest = Loadable(lazy(() => import('pages/fund/PosPendingRequest')));
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
      element: (
        <ProtectedRoute roles={['Admin', 'Subadmin', 'NSM', 'CNF', 'SH', 'MasterDistributor', 'Distributor', 'Retailer']}>
          <DashboardDefault />
        </ProtectedRoute>
      )
    },
    {
      path: 'dashboard/default',
      element: (
        <ProtectedRoute roles={['Admin', 'Subadmin', 'NSM', 'CNF', 'SH', 'MasterDistributor', 'Distributor', 'Retailer']}>
          <DashboardDefault />
        </ProtectedRoute>
      )
    },

    // master
    {
      path: 'master/scheme-manager',
      element: (
        <ProtectedRoute roles={['Admin']}>
          <SchemeManager />
        </ProtectedRoute>
      )
    },
    {
      path: 'master/api-manager',
      element: (
        <ProtectedRoute roles={['Admin']}>
          <ApiManager />
        </ProtectedRoute>
      )
    },
    {
      path: 'master/sms-master',
      element: (
        <ProtectedRoute roles={['Admin']}>
          <SmsMaster />
        </ProtectedRoute>
      )
    },
    {
      path: 'master/bank-account',
      element: (
        <ProtectedRoute roles={['Admin']}>
          <BankAccount />
        </ProtectedRoute>
      )
    },
    {
      path: 'master/provider-master',
      element: (
        <ProtectedRoute roles={['Admin']}>
          <ProviderMaster />
        </ProtectedRoute>
      )
    },
    {
      path: 'master/portal-master',
      element: (
        <ProtectedRoute roles={['Admin']}>
          <PortalMaster />
        </ProtectedRoute>
      )
    },
    {
      path: 'master/service-manager',
      element: (
        <ProtectedRoute roles={['Admin']}>
          <ServiceManager />
        </ProtectedRoute>
      )
    },
    {
      path: 'master/slider-master',
      element: (
        <ProtectedRoute roles={['Admin']}>
          <SliderMaster />
        </ProtectedRoute>
      )
    },

    // member
    {
      path: 'member/sub-admin',
      element: (
        <ProtectedRoute roles={['Admin']}>
          <SubAdmin />
        </ProtectedRoute>
      )
    },
    {
      path: 'member/nsm-zsh',
      element: (
        <ProtectedRoute roles={['Admin', 'Subadmin']}>
          <NsmZsh />
        </ProtectedRoute>
      )
    },
    {
      path: 'member/sh',
      element: (
        <ProtectedRoute roles={['Admin', 'Subadmin', 'NSM']}>
          <Sh />
        </ProtectedRoute>
      )
    },
    {
      path: 'member/cnf-asm',
      element: (
        <ProtectedRoute roles={['Admin', 'Subadmin', 'NSM', 'SH']}>
          <CnfAsm />
        </ProtectedRoute>
      )
    },
    {
      path: 'member/master-distributor',
      element: (
        <ProtectedRoute roles={['Admin', 'Subadmin', 'NSM', 'CNF', 'SH']}>
          <MasterDistributor />
        </ProtectedRoute>
      )
    },
    {
      path: 'member/distributor',
      element: (
        <ProtectedRoute roles={['Admin', 'Subadmin', 'NSM', 'CNF', 'SH', 'MasterDistributor']}>
          <Distributor />
        </ProtectedRoute>
      )
    },
    {
      path: 'member/retailer',
      element: (
        <ProtectedRoute roles={['Admin', 'Subadmin', 'NSM', 'CNF', 'SH', 'MasterDistributor', 'Distributor']}>
          <Retailer />
        </ProtectedRoute>
      )
    },

    // fund
    {
      path: 'fund/transfer-return',
      element: (
        <ProtectedRoute roles={['Admin', 'Subadmin', 'NSM', 'CNF', 'SH', 'MasterDistributor', 'Distributor', 'Retailer']}>
          <TransferReturn />
        </ProtectedRoute>
      )
    },
    {
      path: 'fund/transfer-return-report',
      element: (
        <ProtectedRoute roles={['Admin', 'Subadmin', 'NSM', 'CNF', 'SH', 'MasterDistributor', 'Distributor', 'Retailer']}>
          <TransferReturnReport />
        </ProtectedRoute>
      )
    },

    // { path: 'fund/request', element: <FundRequest /> },
    // { path: 'fund/pos-pending-request', element: <PosPendingRequest /> },
    // { path: 'fund/all-fund-report', element: <AllFundReport /> },

    // transaction report
    {
      path: 'transaction-report/all-report',
      element: (
        <ProtectedRoute roles={['Admin', 'Subadmin', 'NSM', 'CNF', 'SH', 'MasterDistributor', 'Distributor', 'Retailer']}>
          <AllTransactionReport />
        </ProtectedRoute>
      )
    },
    {
      path: 'transaction-report/payout-report',
      element: (
        <ProtectedRoute roles={['Admin', 'Subadmin', 'NSM', 'CNF', 'SH', 'MasterDistributor', 'Distributor', 'Retailer']}>
          <T360PayReport />
        </ProtectedRoute>
      )
    },
    {
      path: 'transaction-report/recharge',
      element: (
        <ProtectedRoute roles={['Admin', 'Subadmin', 'NSM', 'CNF', 'SH', 'MasterDistributor', 'Distributor', 'Retailer']}>
          <RechargeReport />
        </ProtectedRoute>
      )
    },
    {
      path: 'transaction-report/credit-card',
      element: (
        <ProtectedRoute roles={['Admin', 'Subadmin', 'NSM', 'CNF', 'SH', 'MasterDistributor', 'Distributor', 'Retailer']}>
          <CreditCardReport />
        </ProtectedRoute>
      )
    },
    {
      path: 'transaction-report/creditcard-bill-report',
      element: (
        <ProtectedRoute roles={['Admin', 'Subadmin', 'NSM', 'CNF', 'SH', 'MasterDistributor', 'Distributor', 'Retailer']}>
          <BBPSReport />
        </ProtectedRoute>
      )
    },
    {
      path: 'transaction-report/payment-gateway-report',
      element: (
        <ProtectedRoute roles={['Admin', 'Subadmin', 'NSM', 'CNF', 'SH', 'MasterDistributor', 'Distributor', 'Retailer']}>
          <AddMoneyReport />
        </ProtectedRoute>
      )
    },
    {
      path: 'transaction-report/upi-payout',
      element: (
        <ProtectedRoute roles={['Admin', 'Subadmin', 'NSM', 'CNF', 'SH', 'MasterDistributor', 'Distributor', 'Retailer']}>
          <UPIPayoutReport />
        </ProtectedRoute>
      )
    },
    {
      path: 'transaction-report/qr-collection',
      element: (
        <ProtectedRoute roles={['Admin', 'Subadmin', 'NSM', 'CNF', 'SH', 'MasterDistributor', 'Distributor', 'Retailer']}>
          <QRCollectionReport />
        </ProtectedRoute>
      )
    },
    {
      path: 'transaction-report/commission',
      element: (
        <ProtectedRoute roles={['Admin', 'Subadmin', 'NSM', 'CNF', 'SH', 'MasterDistributor', 'Distributor', 'Retailer']}>
          <CommissionReport />
        </ProtectedRoute>
      )
    },
    {
      path: 'transaction-report/pos',
      element: (
        <ProtectedRoute roles={['Admin', 'Subadmin', 'NSM', 'CNF', 'SH', 'MasterDistributor', 'Distributor', 'Retailer']}>
          <POSReport />
        </ProtectedRoute>
      )
    },
    {
      path: 'transaction-report/summary',
      element: (
        <ProtectedRoute roles={['Admin', 'Subadmin', 'NSM', 'CNF', 'SH', 'MasterDistributor', 'Distributor', 'Retailer']}>
          <SummaryReport />
        </ProtectedRoute>
      )
    },
    {
      path: 'transaction-report/userwise-business',
      element: (
        <ProtectedRoute roles={['Admin', 'Subadmin', 'NSM', 'CNF', 'SH', 'MasterDistributor', 'Distributor', 'Retailer']}>
          <UserwiseBusinessReport />
        </ProtectedRoute>
      )
    },
    {
      path: 'transaction-report/commission-distribution',
      element: (
        <ProtectedRoute roles={['Admin', 'Subadmin']}>
          <CommissionDistributionReport />
        </ProtectedRoute>
      )
    },

    // account statement
    {
      path: 'account-statement/main-ledger',
      element: (
        <ProtectedRoute roles={['Admin', 'Subadmin', 'NSM', 'CNF', 'SH', 'MasterDistributor', 'Distributor', 'Retailer']}>
          <MainLedger />
        </ProtectedRoute>
      )
    },
    {
      path: 'account-statement/vendor-logs',
      element: (
        <ProtectedRoute roles={['Admin', 'Subadmin']}>
          <VendorLogs />
        </ProtectedRoute>
      )
    },

    // roles & permission
    { path: 'roles-permission/permission', element: <Permission /> },
    { path: 'roles-permission/default-permission', element: <DefaultPermission /> },

    // service
    {
      path: 'services/add-money',
      element: (
        <ProtectedRoute roles={['Retailer']}>
          <AddMoneyPage />
        </ProtectedRoute>
      )
    },
    {
      path: 'services/add-money/payment1',
      element: (
        <ProtectedRoute roles={['Retailer']}>
          <PG1Page />
        </ProtectedRoute>
      )
    },
    {
      path: 'services/add-money/payment2',
      element: (
        <ProtectedRoute roles={['Retailer']}>
          <PG2Page />
        </ProtectedRoute>
      )
    },
    {
      path: 'services/add-money/payment3',
      element: (
        <ProtectedRoute roles={['Retailer']}>
          <PG3Page />
        </ProtectedRoute>
      )
    },
    {
      path: 'services/add-money/payment4',
      element: (
        <ProtectedRoute roles={['Retailer']}>
          <PG4Page />
        </ProtectedRoute>
      )
    },
    {
      path: 'services/add-money/payment5',
      element: (
        <ProtectedRoute roles={['Retailer']}>
          <PG5Page />
        </ProtectedRoute>
      )
    },
    {
      path: 'services/add-money/payment6',
      element: (
        <ProtectedRoute roles={['Retailer']}>
          <PG6Page />
        </ProtectedRoute>
      )
    },

    {
      path: 'invoice/:txnid',
      element: (
        <ProtectedRoute roles={['Admin', 'Subadmin', 'NSM', 'CNF', 'SH', 'MasterDistributor', 'Distributor', 'Retailer']}>
          <InvoicePage />
        </ProtectedRoute>
      )
    },
    {
      path: 'invoice/:txnid/:orderid',
      element: (
        <ProtectedRoute roles={['Admin', 'Subadmin', 'NSM', 'CNF', 'SH', 'MasterDistributor', 'Distributor', 'Retailer']}>
          <InvoicePage />
        </ProtectedRoute>
      )
    },

    {
      path: 'services/bbps',
      element: (
        <ProtectedRoute roles={['Retailer']}>
          <BBPSPage />
        </ProtectedRoute>
      )
    },
    {
      path: 'services/bbps/c15',
      element: (
        <ProtectedRoute roles={['Retailer']}>
          <FetchBBPSBillPage />
        </ProtectedRoute>
      )
    },

    {
      path: 'services/payout',
      element: (
        <ProtectedRoute roles={['Retailer']}>
          <PayoutPage />
        </ProtectedRoute>
      )
    },
    {
      path: 'services/rupay-upi',
      element: (
        <ProtectedRoute roles={['Retailer']}>
          <RupayUpiLoadWalletPage />
        </ProtectedRoute>
      )
    },

    {
      path: '/*',
      element: (
        <ProtectedRoute roles={['Admin', 'Subadmin', 'NSM', 'CNF', 'SH', 'MasterDistributor', 'Retailer']}>
          <DashboardDefault />
        </ProtectedRoute>
      )
    }
  ]
};

export default MainRoutes;
