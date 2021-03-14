
exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('cleaning_history').del()
        .then(function () {
            // Inserts seed entries
            return knex('cleaning_history').insert([
                {cleaning_zone: 'Sauce' },
                {cleaning_zone: 'Pepperoni' },
                {cleaning_zone: 'Sauce' },
                {cleaning_zone: 'Pepperoni' },
                {cleaning_zone: 'Sauce' },
                {cleaning_zone: 'Pepperoni' },
                {cleaning_zone: 'Sauce' },
                {cleaning_zone: 'Pepperoni' },
            ]);
        });
};
