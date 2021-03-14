
exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('blade_history').del()
        .then(function () {
            // Inserts seed entries
            return knex('blade_history').insert([
                {value: 10015},
                {value: 10132},
                {value: 10310},
                {value: 10908},
                {value: 10101},
            ]);
        });
};
