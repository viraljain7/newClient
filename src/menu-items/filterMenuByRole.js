

const filterMenuByRole = (
  menus,
  role,
  activeServices = []
) => {

  return menus
    .filter((menu) => {

      // role check
      if (menu.roles && !menu.roles.includes(role)) {
        return false;
      }

      // service check
      if (menu.serviceCode) {
        const hasService = activeServices?.some(
          (service) =>
            service.code === menu.serviceCode &&
            service.value === '1'
        );

        if (!hasService) {
          return false;
        }
      }

      return true;
    })

    .map((menu) => {
      if (menu.children) {
        return {
          ...menu,
          children: filterMenuByRole(
            menu.children,
            role,
            activeServices
          )
        };
      }

      return menu;
    })

    .filter((menu) => {
      if (menu.children) {
        return menu.children.length > 0;
      }

      return true;
    });
};

export default filterMenuByRole;