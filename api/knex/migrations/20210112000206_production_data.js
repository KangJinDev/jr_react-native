
exports.up = function(knex) {
    return knex.schema.createTable('production_data', t => {
        t.increments('id');
        t.string('base');
        t.string('crust');
        t.string('cheese');
        t.string('sauce');
        t.boolean('emb');
        t.integer('sauce_time');
        t.integer('cheese_time');
        t.integer('pep_time');
        t.integer('index_time');
        t.integer('cheese_weight');
        t.integer('prefill_drop_weight');
        t.integer('prefill_time');
        t.timestamp('created_at').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('production_data');
};
