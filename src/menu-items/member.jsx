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
  children: [
    {
      id: 'sub-admin',
      title: 'Sub Admin',
      type: 'item',
      url: '/member/sub-admin',
      icon: TeamOutlined
    },
    {
      id: 'nsm-zsh',
      title: 'NSM/ZSH',
      type: 'item',
      url: '/member/nsm-zsh',
      icon: UsergroupAddOutlined
    },
    {
      id: 'sh',
      title: 'SH',
      type: 'item',
      url: '/member/sh',
      icon: CrownOutlined
    },
    {
      id: 'cnf-asm',
      title: 'CNF/ASM',
      type: 'item',
      url: '/member/cnf-asm',
      icon: ApartmentOutlined
    },
    {
      id: 'master-distributor',
      title: 'Master Distributor',
      type: 'item',
      url: '/member/master-distributor',
      icon: TeamOutlined
    },
    {
      id: 'distributor',
      title: 'Distributor',
      type: 'item',
      url: '/member/distributor',
      icon: ShopOutlined
    },
    {
      id: 'retailer',
      title: 'Retailer',
      type: 'item',
      url: '/member/retailer',
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