import {Model} from 'objection';

import {initKnex} from '../knex';

Model.knex(initKnex)

class MachineFault extends Model {
    static get tableName() {
        return 'machine_faults';
    }
}

export default MachineFault;
