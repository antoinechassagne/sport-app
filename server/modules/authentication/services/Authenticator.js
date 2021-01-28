const UsersRepository = require("../../users/repository");
const SessionsRepository = require("../repository");
const Crypto = require("./Crypto");

const SESSION_MAX_AGE = 3024000000; /* 5 weeks */

/**
 * Register a new user.
 *
 * @param {String} email
 * @param {String} password
 * @param {Object} userInformations Additional user informations from form.
 * @returns {String} userId
 */
const register = async (email, password, userInformations) => {
  const existingUser = await UsersRepository.getUserByEmail(email);
  if (existingUser) return null;
  const { salt, hash } = Crypto.hashPassword(password);
  const [userId] = await UsersRepository.insertUser({
    email,
    salt,
    password: hash,
    ...userInformations,
  });
  return userId;
};

/**
 * Retrieve a user from his credentials.
 *
 * @param {String} email
 * @param {String} password
 * @returns {String} userId
 */
const authenticate = async (email, password) => {
  const user = await UsersRepository.getUserByEmail(email);
  if (!user) return null;
  const isPasswordValid = Crypto.comparePassword(password, user.salt, user.password);
  if (!isPasswordValid) return null;
  return user.id;
};

/**
 * Delete previous session and create a new one.
 *
 * @param {String} userId
 * @returns {String} sessionId
 */
const initializeSession = async (userId) => {
  await SessionsRepository.deleteUserSessions(userId);
  const [sessionId] = await SessionsRepository.insertSession({
    userId,
    expirationDate: new Date(Date.now() + SESSION_MAX_AGE).toISOString(),
  });
  return sessionId;
};

/**
 * Delete the user session.
 *
 * @param {String} sessionId
 */
const discardSession = async (sessionId) => {
  await SessionsRepository.deleteSession(sessionId);
};

module.exports = { register, authenticate, initializeSession, discardSession };
