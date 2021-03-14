import {Model} from 'objection';

import {initKnex} from '../knex';

Model.knex(initKnex)

class ProductionData extends Model {
    static get tableName() {
        return 'production_data';
    }
}

export default ProductionData;
