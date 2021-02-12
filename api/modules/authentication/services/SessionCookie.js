const COOKIE_NAME = "session";
const COOKIE_MAX_AGE = 3024000000; /* 5 weeks */

function setCookie(res, sessionId) {
  res.cookie(COOKIE_NAME, sessionId, {
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(Date.now() + COOKIE_MAX_AGE),
    signed: true,
    httpOnly: true,
    sameSite: "None",
  });
}

function getCookie(req) {
  return req.signedCookies[COOKIE_NAME];
}

function discardCookie(res) {
  res.cookie(COOKIE_MAX_AGE, "", { expires: new Date(0) });
}

module.exports = { COOKIE_NAME, COOKIE_MAX_AGE, setCookie, getCookie, discardCookie };
