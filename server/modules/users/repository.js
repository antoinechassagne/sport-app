const database = require("../../database/index");

exports.createUser = (user) => {
  return database("users").insert(user).returning("id");
};

exports.getUser = (query) => {
  return database("users").where(query).first();
};

exports.getUsers = (query) => {
  return database("users").where(query);
};

exports.updateUser = (query, update) => {
  return database("users").where(query).update(update);
};

exports.deleteUsers = (query) => {
  return database("users").where(query).del();
};
