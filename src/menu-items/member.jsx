import {
  UserOutlined,
  TeamOutlined,
  UsergroupAddOutlined,
  CrownOutlined,
  ApartmentOutlined,
  ShopOutlined
} from '@ant-design/icons';

const member = {
  id: 'member',
  title: 'Member',
  type: 'collapse',
  icon: UserOutlined,
      roles: ['Admin', 'Subadmin','Distributor',  'MasterDistributor', 'NSM', 'SH', 'CNF'],

  children: [
    {
      id: 'sub-admin',
      title: 'Sub Admin',
      type: 'item',
      url: '/member/sub-admin',
      roles: ['Admin'],

      icon: TeamOutlined
    },
    {
      id: 'nsm-zsh',
      title: 'NSM/ZSH',
      type: 'item',
      url: '/member/nsm-zsh',
      roles: ['Admin', 'Subadmin'],

      icon: UsergroupAddOutlined
    },
    {
      id: 'sh',
      title: 'SH',
      type: 'item',
      url: '/member/sh',
      roles: ['Admin', 'Subadmin', 'NSM'],
      
      icon: CrownOutlined
    },
    {
      id: 'cnf-asm',
      title: 'CNF/ASM',
      type: 'item',
      url: '/member/cnf-asm',
      roles: ['Admin', 'Subadmin', 'NSM', 'SH'],

      icon: ApartmentOutlined
    },
    {
      id: 'master-distributor',
      title: 'Master Distributor',
      type: 'item',
      url: '/member/master-distributor',
      roles: ['Admin', 'Subadmin',  'NSM', 'SH', 'CNF'],

      icon: TeamOutlined
    },
    {
      id: 'distributor',
      title: 'Distributor',
      type: 'item',
      url: '/member/distributor',
      roles: ['Admin', 'Subadmin',  'MasterDistributor', 'NSM', 'SH', 'CNF'],

      icon: ShopOutlined
    },
    {
      id: 'retailer',
      title: 'Retailer',
      type: 'item',
      url: '/member/retailer',
      roles: ['Admin', 'Subadmin','Distributor',  'MasterDistributor', 'NSM', 'SH', 'CNF'],

      icon: UserOutlined
    }
  ]
};

export default {
  id: 'group-member',
  title: 'Navigation',
  type: 'group',
  children: [member]
};