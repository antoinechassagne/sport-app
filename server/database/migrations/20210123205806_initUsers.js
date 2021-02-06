exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.date("registrationDate").notNullable();
    table.date("confirmationDate");
    table.string("email").unique().notNullable();
    table.string("password").notNullable();
    table.string("salt").notNullable();
    table.string("confirmationToken");
    table.string("resetToken");
    table.boolean("active").notNullable();
    table.string("firstName").notNullable();
    table.string("lastName").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};
