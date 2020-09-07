exports.up = function (knex) {
  return knex.schema.createTable("cars", function (table) {
    table.increments("id");
    table.integer("brand_id").notNullable();
    table.string("name", 255).notNullable();
    table.string("year").notNullable();
    table.index("brand_id");
    table.index("name");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("cars");
};
