
exports.up = function(knex) {
  return knex.schema.createTable('type', function (table){
      table.increments('id').primary();
      table.string('description').notNullable();
      table.string('color').notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('type');
};
