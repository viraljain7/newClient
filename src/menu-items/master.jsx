import {
  DashboardOutlined,
  AppstoreOutlined,
  ApiOutlined,
  MessageOutlined,
  BankOutlined,
  TeamOutlined,
  GlobalOutlined,
  SettingOutlined,
  PictureOutlined
} from '@ant-design/icons';

const icons = {
  DashboardOutlined,
  AppstoreOutlined,
  ApiOutlined,
  MessageOutlined,
  BankOutlined,
  TeamOutlined,
  GlobalOutlined,
  SettingOutlined,
  PictureOutlined
};

const master = {
  id: 'master',
  title: 'Master',
  type: 'collapse',
  icon: icons.AppstoreOutlined,
  children: [
    {
      id: 'scheme-manager',
      title: 'Scheme Manager',
      type: 'item',
      url: '/master/scheme-manager',
      icon: icons.SettingOutlined
    },
    {
      id: 'api-manager',
      title: 'API Manager',
      type: 'item',
      url: '/master/api-manager',
      icon: icons.ApiOutlined
    },
    {
      id: 'sms-master',
      title: 'SMS Master',
      type: 'item',
      url: '/master/sms-master',
      icon: icons.MessageOutlined
    },
    {
      id: 'bank-account',
      title: 'Bank Account',
      type: 'item',
      url: '/master/bank-account',
      icon: icons.BankOutlined
    },
    {
      id: 'provider-master',
      title: 'Provider Master',
      type: 'item',
      url: '/master/provider-master',
      icon: icons.TeamOutlined
    },
    {
      id: 'portal-master',
      title: 'Portal Master',
      type: 'item',
      url: '/master/portal-master',
      icon: icons.GlobalOutlined
    },
    {
      id: 'service-manager',
      title: 'Service Manager',
      type: 'item',
      url: '/master/service-manager',
      icon: icons.SettingOutlined
    },
    {
      id: 'slider-master',
      title: 'Slider Master',
      type: 'item',
      url: '/master/slider-master',
      icon: icons.PictureOutlined
    }
  ]
};

export default {
  id: 'group-master',
  title: 'Navigation',
  type: 'group',
  children: [master]
};