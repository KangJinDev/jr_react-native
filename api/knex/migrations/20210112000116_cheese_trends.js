
exports.up = function(knex) {
    return knex.schema.createTable('cheese_trend', t => {
        t.increments('id');
        t.integer('weight');
        t.integer('prefill_drop_weight');
        t.integer('prefill_time');
        t.timestamp('created_at').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('cheese_trend');
};
