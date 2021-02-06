const { v4: uuidv4 } = require("uuid");
const database = require("../../database/index");

exports.createSession = (session) => {
  return database("sessions")
    .insert({ id: uuidv4(), ...session })
    .returning("id");
};

exports.getSession = (query) => {
  return database("sessions").where(query).first();
};

exports.getSessions = (query) => {
  return database("sessions").where(query);
};

exports.updateSession = (query, update) => {
  return database("sessions").where(query).update(update);
};

exports.deleteSessions = (query) => {
  return database("sessions").where(query).del();
};
