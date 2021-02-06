const UsersRepository = require("../../users/repository");
const SessionsRepository = require("../repository");
const Crypto = require("./Crypto");

const SESSION_MAX_AGE = 3024000000; /* 5 weeks */

async function register(email, password, userInformations) {
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
}

async function authenticate(email, password) {
  const user = await UsersRepository.getUser({ email });
  if (!user) {
    return null;
  }
  const isPasswordValid = Crypto.comparePassword(password, user.salt, user.password);
  if (!isPasswordValid) return null;
  return user.id;
}

async function initializeSession(userId) {
  await SessionsRepository.deleteSessions({ userId });
  const [sessionId] = await SessionsRepository.createSession({
    userId,
    expirationDate: new Date(Date.now() + SESSION_MAX_AGE).toISOString(),
  });
  return sessionId;
}

async function discardSession(sessionId) {
  await SessionsRepository.deleteSession({ id: sessionId });
}

async function confirmUserEmail(token) {
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
}

async function generateUserResetToken(email) {
  const user = await UsersRepository.getUser({ email });
  if (!user) {
    return false;
  }
  const resetToken = Crypto.generateToken();
  await UsersRepository.updateUser({ id: user.id }, { resetToken });
  return resetToken;
}

async function resetUserPassword(password, token) {
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
}

module.exports = {
  register,
  authenticate,
  initializeSession,
  discardSession,
  confirmUserEmail,
  generateUserResetToken,
  resetUserPassword,
};
