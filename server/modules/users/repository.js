const database = require("../../database/index");

exports.getUserById = (id) => {
  return database("users").where("id", id).first();
};

exports.getUserByEmail = (email) => {
  return database("users").where("email", email).first();
};

exports.getUserByConfirmationToken = (token) => {
  return database("users").where("confirmationToken", token).first();
};

exports.getUserByResetToken = (token) => {
  return database("users").where("resetToken", token).first();
};

exports.getUsers = (query) => {
  return database("users").where(query);
};

exports.insertUser = (user) => {
  return database("users").insert(user).returning("id");
};

exports.updateUser = (id, update) => {
  return database("users").where("id", id).update(update);
};
