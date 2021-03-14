
exports.up = function(knex) {
    return knex.schema.createTable('machine_faults', t => {
        t.increments('id');
        t.string('fault_code');
        t.string('description');
        t.timestamp('created_at').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('machine_faults');
};
