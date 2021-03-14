
exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('production_data').del()
        .then(function () {
            // Inserts seed entries
            return knex('production_data').insert([
                {
                    base: 'cheese',
                    crust: 'original',
                    cheese: 'light',
                    sauce: 'light',
                    emb: true,
                    sauce_time: 12,
                    cheese_time: 6,
                    pep_time: 12,
                    index_time: 5,
                    cheese_weight: 8,
                    prefill_drop_weight: 5,
                    prefill_time: 2
                },
            ]);
        });
};
