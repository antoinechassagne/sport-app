const Authenticator = require("./services/Authenticator");
const SessionCookie = require("./services/SessionCookie");

exports.register = async (req, res) => {
  const { email, password, ...userInformations } = req.body;
  try {
    const userId = await Authenticator.register(email, password, userInformations);
    if (!userId) {
      return res.status(400).send({ error: "Une erreur s'est produite lors de la création du compte." });
    }
    const sessionId = Authenticator.initializeSession(userId);
    SessionCookie.setCookie(res, sessionId);
    res.status(201).send({ id: userId });
  } catch (err) {
    res.status(500).send({ error: "Une erreur s'est produite." });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userId = await Authenticator.authenticate(email, password);
    if (!userId) {
      return res.status(400).send({ error: "L'adresse email et/ou le mot de passe est incorrecte." });
    }
    const sessionId = await Authenticator.initializeSession(userId);
    SessionCookie.setCookie(res, sessionId);
    res.status(204).send();
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Une erreur s'est produite." });
  }
};

exports.logout = async (req, res) => {
  const sessionId = SessionCookie.getCookie(req);
  await Authenticator.discardSession(sessionId);
  SessionCookie.discardCookie(res);
  res.status(204).send();
};