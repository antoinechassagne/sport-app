const controller = require("./controller");

module.exports = [
  {
    method: "GET",
    path: "/users/:id",
    handler: controller.getUser,
    authenticated: true,
  },
  {
    method: "GET",
    path: "/users",
    handler: controller.getUsers,
    authenticated: true,
  },
];
