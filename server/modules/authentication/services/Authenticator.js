const UsersRepository = require("../../users/repository");
const SessionsRepository = require("../repository");
const Crypto = require("./Crypto");

const SESSION_MAX_AGE = 3024000000; /* 5 weeks */

exports.register = async (email, password, userInformations) => {
  const existingUser = await UsersRepository.getUser({ email });
  if (existingUser) {
    return null;
  }
  const { salt, hash } = Crypto.hashPassword(password);
  const confirmationToken = Crypto.generateToken();
  const [userId] = await UsersRepository.createUser({
    registrationDate: new Date().toISOString(),
    email,
    salt,
    password: hash,
    confirmationToken,
    active: false,
    ...userInformations,
  });
  return userId;
};

exports.authenticate = async (email, password) => {
  const user = await UsersRepository.getUser({ email });
  if (!user) {
    return null;
  }
  const isPasswordValid = Crypto.comparePassword(password, user.salt, user.password);
  if (!isPasswordValid) return null;
  return user.id;
};

exports.initializeSession = async (userId) => {
  await SessionsRepository.deleteSessions({ userId });
  const [sessionId] = await SessionsRepository.createSession({
    userId,
    expirationDate: new Date(Date.now() + SESSION_MAX_AGE).toISOString(),
  });
  return sessionId;
};

exports.discardSession = async (sessionId) => {
  await SessionsRepository.deleteSession({ id: sessionId });
};

exports.confirmUserEmail = async (token) => {
  const user = await UsersRepository.getUser({ confirmationToken: token });
  if (!user) {
    return false;
  }
  await UsersRepository.updateUser(
    { id: user.id },
    {
      confirmationToken: null,
      confirmationDate: new Date().toISOString(),
      active: true,
    }
  );
  return true;
};

exports.generateUserResetToken = async (email) => {
  const user = await UsersRepository.getUser({ email });
  if (!user) {
    return false;
  }
  const resetToken = Crypto.generateToken();
  await UsersRepository.updateUser({ id: user.id }, { resetToken });
  return resetToken;
};

exports.resetUserPassword = async (password, token) => {
  const user = await UsersRepository.getUser({ resetToken: token });
  if (!user) {
    return false;
  }
  const { salt, hash } = Crypto.hashPassword(password);
  await UsersRepository.updateUser(
    { id: user.id },
    {
      salt,
      password: hash,
      resetToken: null,
    }
  );
  return true;
};
