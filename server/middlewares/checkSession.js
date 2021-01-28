const SessionsRepository = require("../modules/authentication/repository");
const SessionCookie = require("../modules/authentication/services/SessionCookie");

module.exports = async (req, res, next) => {
  const sessionId = req.signedCookies[SessionCookie.COOKIE_NAME];
  if (!sessionId) return res.status(403).send();
  try {
    const session = await SessionsRepository.getSessionById(sessionId);
    if (!session || (session && new Date(session.expirationDate) <= new Date(Date.now()))) {
      return res.status(403).send();
    }
    req.session = session;
    SessionCookie.setCookie(res, sessionId);
    await SessionsRepository.updateSession(sessionId, {
      expirationDate: new Date(Date.now() + SessionCookie.COOKIE_MAX_AGE).toISOString(),
    });
    next();
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Une erreur s'est produite." });
  }
};
