
exports.up = function(knex) {
    return knex.schema.createTable('occurrence',function(table){
        table.increments('id').primary();
        table.integer('request_id').notNullable();
        table.integer('event_id').notNullable();
        table.string('comment');
        
        table.date('created_at').notNullable().defaultTo(knex.fn.now());
        table.date('updated_at').notNullable().defaultTo(knex.fn.now());
  
        //relation
        table.foreign('event_id').references('id').inTable('event');
        table.foreign('request_id').references('id').inTable('request');
  
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('occurrence');
  };
  