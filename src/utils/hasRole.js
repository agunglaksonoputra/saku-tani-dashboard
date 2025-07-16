import Cookies from "js-cookie";

export const getUserRole = () => {
  const user = JSON.parse(Cookies.get("user") || "{}");

  if (!user.role) return null;

  return typeof user.role === "string" ? user.role : user.role.name;
};

export const hasRole = (roles = []) => {
  const role = getUserRole();
  return roles.includes(role);
};

export const filterNavByRole = (navItems, role) => {
  return navItems.filter((item) => {
    if (!item.roles) return true;
    return item.roles.includes(role);
  });
};
