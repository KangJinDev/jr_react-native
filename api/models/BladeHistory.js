import {Model} from 'objection';

import {initKnex} from '../knex';

Model.knex(initKnex)

class BladeHistory extends Model {
    static get tableName() {
        return 'blade_history';
    }
}

export default BladeHistory;
