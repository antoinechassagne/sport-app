const database = require("../../database/index");

exports.getUserById = (id) => {
  return database("users").where("id", id).first();
};

exports.getUserByEmail = (email) => {
  return database("users").where("email", email).first();
};

exports.getUsers = (query) => {
  return database("users").where(query);
};

exports.insertUser = (user) => {
  return database("users").insert(user).returning("id");
};
