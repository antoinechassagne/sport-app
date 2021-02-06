const { v4: uuidv4 } = require("uuid");
const database = require("../../database/index");

exports.createSession = function (session) {
  return database("sessions")
    .insert({ id: uuidv4(), ...session })
    .returning("id");
};

exports.getSession = function (query) {
  return database("sessions").where(query).first();
};

exports.getSessions = function (query) {
  return database("sessions").where(query);
};

exports.updateSession = function (query, update) {
  return database("sessions").where(query).update(update);
};

exports.deleteSessions = function (query) {
  return database("sessions").where(query).del();
};
