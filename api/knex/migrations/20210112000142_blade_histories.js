
exports.up = function(knex) {
    return knex.schema.createTable('blade_history', t => {
        t.increments('id');
        t.integer('value');
        t.timestamp('created_at').defaultTo(knex.fn.now());
        t.timestamp('updated_at').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('blade_history');
};
