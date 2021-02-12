const controller = require("./controller");
const registerSchema = require("./schemas/register");
const loginSchema = require("./schemas/login");
const resetPasswordSchema = require("./schemas/resetPassword");

module.exports = [
  {
    method: "POST",
    path: "/register",
    handler: controller.register,
    schema: registerSchema,
  },
  {
    method: "POST",
    path: "/login",
    handler: controller.login,
    schema: loginSchema,
  },
  {
    method: "GET",
    path: "/logout",
    handler: controller.logout,
    authenticated: true,
  },
  {
    method: "GET",
    path: "/logged-user",
    handler: controller.getLoggedUser,
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
    schema: resetPasswordSchema,
  },
];
