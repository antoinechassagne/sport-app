const UsersRepository = require("./repository");

exports.getUser = async function (req, res) {
  try {
    const user = await UsersRepository.getUser({ id: req.params.id });
    if (!user) {
      return res.status(204).send();
    }
    const result = UsersRepository.getPublicFields(user);
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send({ error: "Une erreur s'est produite." });
  }
};

exports.getUsers = async function (req, res) {
  try {
    const users = await UsersRepository.getUsers(req.query);
    if (!users.length) {
      return res.status(204).send();
    }
    const result = users.map((user) => UsersRepository.getPublicFields(user));
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send({ error: "Une erreur s'est produite." });
  }
};
