const { v4: uuidv4 } = require("uuid");
const database = require("../../database/index");

exports.getSessionById = (id) => {
  return database("sessions").where("id", id).first();
};

exports.getSessionByUserId = (userId) => {
  return database("sessions").where("userId", userId).first();
};

exports.insertSession = (session) => {
  return database("sessions")
    .insert({ id: uuidv4(), ...session })
    .returning("id");
};

exports.updateSession = (id, update) => {
  return database("sessions").where("id", id).update(update);
};

exports.deleteSession = (id) => {
  return database("sessions").where("id", id).del();
};

exports.deleteUserSessions = (userId) => {
  return database("sessions").where({ userId }).del();
};
