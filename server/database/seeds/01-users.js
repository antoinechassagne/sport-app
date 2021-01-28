const chance = require("chance").Chance();
const Crypto = require("../../modules/authentication/services/Crypto");

const ROWS_TO_INSERT = 10;

const createUser = () => {
  const { salt, hash } = Crypto.hashPassword(chance.word({ length: 8 }));
  return { password: hash, salt, email: chance.email(), firstName: chance.first(), lastName: chance.last() };
};

exports.seed = (database) => {
  const rows = [];
  for (let i = 0; i < ROWS_TO_INSERT; i++) {
    const user = createUser();
    rows.push(user);
  }
  return database("users")
    .del()
    .insert(rows)
    .then(() => {
      console.log(`[SEEDS] Table \`users\` has been populated with ${ROWS_TO_INSERT} rows.`);
    });
};
