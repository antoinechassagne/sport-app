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
  {
    method: "GET",
    path: "/email-verification",
    handler: controller.verifyEmail,
  },
  {
    method: "GET",
    path: "/reset-token",
    handler: controller.getResetToken,
  },
  {
    method: "POST",
    path: "/reset-password",
    handler: controller.resetPassword,
  },
];
