
exports.up = function(knex) {
    return knex.schema.createTable('cleaning_history', t => {
        t.increments('id');
        t.string('cleaning_zone');
        t.timestamp('created_at').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('cleaning_history');
};
