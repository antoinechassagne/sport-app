const crypto = require("crypto");

/**
 * Generate a token.
 *
 * @returns {String} token
 */
const generateToken = () => {
  return crypto.randomBytes(64).toString("hex");
};

/**
 * Hash a password using a salt and a crypto algorithm.
 *
 * @param {String} password
 * @param {String} salt
 * @returns {Object} { salt, hash }
 */
const hashPassword = (password, salt = generateToken()) => {
  const hash = crypto.createHmac("sha512", password).update(salt).digest("hex");
  return { salt, hash };
};

/**
 * Compare a password against a hash.
 *
 * @param {String} password
 * @param {String} salt
 * @param {String} hash
 * @returns {Boolean} equal
 */
const comparePassword = (password, salt, hash) => {
  return crypto.timingSafeEqual(Buffer.from(hashPassword(password, salt).hash), Buffer.from(hash));
};

module.exports = { hashPassword, comparePassword, generateToken };
