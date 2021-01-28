const COOKIE_NAME = "session";
const COOKIE_MAX_AGE = 3024000000; /* 5 weeks */

/**
 * Set the session cookie on Express's response.
 *
 * @param {Object} res Express's response
 * @param {String} sessionId
 */
const setCookie = (res, sessionId) => {
  return res.cookie(COOKIE_NAME, sessionId, {
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(Date.now() + COOKIE_MAX_AGE),
    signed: true,
    httpOnly: true,
    sameSite: "Strict",
  });
};

/**
 * Retrieve the session id from session cookie.
 *
 * @param {Object} req Express's request
 * @returns {String} sessionId
 */
const getCookie = (req) => {
  return req.signedCookies[COOKIE_NAME];
};

/**
 * Discard the session cookie.
 *
 * @param {Object} res Express's response
 */
const discardCookie = (res) => {
  res.cookie(COOKIE_MAX_AGE, "", { expires: new Date(0) });
};

module.exports = { COOKIE_NAME, COOKIE_MAX_AGE, setCookie, getCookie, discardCookie };
