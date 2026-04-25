import {
  SettingOutlined,
  SafetyOutlined
} from '@ant-design/icons';

const rolesAndPermission = {
  id: 'roles-and-permission',
  title: 'Roles and Permission',
  type: 'collapse',
  icon: SettingOutlined,
  children: [
    {
      id: 'permission',
      title: 'Permission',
      type: 'item',
      url: '/roles-permission/permission',
      icon: SafetyOutlined
    },
    {
      id: 'default-permission',
      title: 'Default Permission',
      type: 'item',
      url: '/roles-permission/default-permission',
      icon: SettingOutlined
    }
  ]
};

export default {
  id: 'group-roles-permission',
  title: 'Navigation',
  type: 'group',
  children: [rolesAndPermission]
};