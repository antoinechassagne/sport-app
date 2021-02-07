const crypto = require("crypto");

function comparePassword(password, salt, hash) {
  return crypto.timingSafeEqual(Buffer.from(hashPassword(password, salt).hash), Buffer.from(hash));
}

function hashPassword(password, salt = generateToken()) {
  const hash = crypto.createHmac("sha512", password).update(salt).digest("hex");
  return { salt, hash };
}

function generateToken() {
  return crypto.randomBytes(64).toString("hex");
}

module.exports = { hashPassword, comparePassword, generateToken };
