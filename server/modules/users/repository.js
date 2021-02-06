const database = require("../../database/index");

exports.createUser = function (user) {
  return database("users").insert(user).returning("id");
};

exports.getUser = function (query) {
  return database("users").where(query).first();
};

exports.getUsers = function (query) {
  return database("users").where(query);
};

exports.updateUser = function (query, update) {
  return database("users").where(query).update(update);
};

exports.deleteUsers = function (query) {
  return database("users").where(query).del();
};
