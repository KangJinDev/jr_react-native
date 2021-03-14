import {Model} from 'objection';

import {initKnex} from '../knex';

Model.knex(initKnex)

class CleaningHistory extends Model {
    static get tableName() {
        return 'cleaning_history';
    }
}

export default CleaningHistory;
