
exports.up = function(knex) {
  return knex.schema.createTable('request', function(table){
      table.increments('id').primary();
      table.string('description').notNullable();
      table.integer('number').notNullable();
      table.string('date').notNullable();
      table.string('tags').notNullable();

      table.integer('type_id').notNullable();
      table.integer('consultant_id').notNullable();

      //relation
      table.foreign('type_id').references('id').inTable('type');
      table.foreign('consultant_id').references('id').inTable('consultant');
  })
};

exports.down = function(knex) {
    return knex.schema.dropTable('request');
};
