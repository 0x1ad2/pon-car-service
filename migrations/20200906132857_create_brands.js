exports.up = function (knex) {
  return knex.schema.createTable("brands", function (table) {
    table.increments("id");
    table.string("name", 255).notNullable();
    table.string("country", 255).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("brands");
};
