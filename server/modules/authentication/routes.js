const controller = require("./controller");

module.exports = [
  {
    method: "POST",
    path: "/register",
    handler: controller.register,
  },
  {
    method: "POST",
    path: "/login",
    handler: controller.login,
  },
  {
    method: "GET",
    path: "/logout",
    handler: controller.logout,
    authenticated: true,
  },
];
