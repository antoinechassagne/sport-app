exports.up = (knex) => {
  return knex.schema.createTable("sessions", (table) => {
    table.uuid("id").primary();
    table.integer("userId").references("id").inTable("users").notNull();
    table.date("expirationDate").notNullable();
  });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists("sessions");
};
