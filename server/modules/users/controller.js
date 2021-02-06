const UsersRepository = require("./repository");

exports.getUser = async function (req, res) {
  try {
    const result = await UsersRepository.getUser({ id: req.params.id });
    if (!result) {
      return res.status(204).send();
    }
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send({ error: "Une erreur s'est produite." });
  }
};

exports.getUsers = async function (req, res) {
  try {
    const result = await UsersRepository.getUsers(req.query);
    if (!result.length) {
      return res.status(204).send();
    }
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send({ error: "Une erreur s'est produite." });
  }
};
