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
  return navItems
    .map((item) => {
      // Jika ada children (sub-menu)
      if (item.items) {
        const filteredItems = item.items.filter((child) => !child.roles || child.roles.includes(role));

        // Jika tidak ada child yang boleh ditampilkan, sembunyikan item parent
        if (filteredItems.length === 0) return null;

        return { ...item, items: filteredItems };
      }

      // Untuk item tanpa children
      if (!item.roles || item.roles.includes(role)) {
        return item;
      }

      return null; // Tidak cocok, jangan tampilkan
    })
    .filter(Boolean); // Hapus nilai null
};
