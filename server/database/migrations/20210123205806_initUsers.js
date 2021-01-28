exports.up = (knex) => {
  return knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("email").unique().notNullable();
    table.string("password").notNullable();
    table.string("salt").notNullable();
    table.string("firstName").notNullable();
    table.string("lastName").notNullable();
  });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists("users");
};
