const getMenu = (role = "USER_ROLE") => {
  const menu = [
    {
      titulo: "Dashboard",
      icono: "mdi mdi-gauge",
      submenu: [
        { titulo: "Main", url: "/" },
        { titulo: "Progress Bar", url: "/dashboard/progress" },
        { titulo: "Grafica", url: "/dashboard/grafica1" },
        { titulo: "Promesas", url: "/dashboard/promesas" },
        { titulo: "Rxjs", url: "/dashboard/rxjs" },
      ],
    },
    {
      titulo: "Mantenimiento",
      icono: "mdi mdi-folder-lock-open",
      submenu: [
        { titulo: "Hospitales", url: "hospitales" },
        { titulo: "Medicos", url: "medicos" },
      ],
    },
  ];
  if (role === "ADMIN_ROLE") {
    menu[1].submenu.push({ titulo: "Usuarios", url: "usuarios" });
  }

  return menu;
};

module.exports = {
  getMenu,
};
