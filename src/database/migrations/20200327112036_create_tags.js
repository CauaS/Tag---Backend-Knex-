
exports.up = function(knex) {
  return knex.schema.createTable('tags', function(table){
      table.increments('id').primary();
      table.string('description').notNullable();
      table.integer('request_id').notNullable();

      ///relation
      table.foreign('request_id').references('id').inTable('request');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('tags');
};
