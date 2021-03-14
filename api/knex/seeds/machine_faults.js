
exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('machine_faults').del()
        .then(function () {
            // Inserts seed entries
            return knex('machine_faults').insert([
                {fault_code: '102', description: 'Sauce station bypassed' },
                {fault_code: '942', description: 'Sauce pan rotate servo internal limit reached' },
                {fault_code: '252', description: 'Sauce pan rotate servo following error' },
                {fault_code: '122', description: 'Cheese pepperoni lift servo axis not in remote' },
                {fault_code: '924', description: 'Auger servo internal limit reached' },
            ]);
        });
};
