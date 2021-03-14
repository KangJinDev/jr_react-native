import moment from 'moment';

import {getAfterNumberOfDays, getDiffDays, removeTime} from '../../utils';
import ProductionData from '../../models/ProductionData';
import {getTimezone} from "./config";

export const parsePizzaType = (typeStr = '') => {
    if(!typeStr || typeof typeStr !== 'string') {
        return {};
    }

    const typesMapper = {
        CHE: { value: 'cheese', field: 'base' },
        PEP: { value: 'pep', field: 'base' },
        THN: { value: 'thin', field: 'crust' },
        ORG: { value: 'original', field: 'crust' },
        THK: { value: 'thick', field: 'crust' },
        CLA: { value: false, field: 'emb' },
        EMB: { value: true, field: 'emb' },
        LCH: { value: 'light', field: 'cheese' },
        RCH: { value: 'regular', field: 'cheese' },
        LSA: { value: 'light', field: 'sauce' },
        RSA: { value: 'regular', field: 'sauce' },
        ESA: { value: 'extra', field: 'sauce' },
    }

    return typeStr.split('_').reduce((result, value) => {
        if (value && typesMapper[value]) {
            return {
                ...result,
                [typesMapper[value].field]: typesMapper[value].value,
            }
        }
    }, {})
}


export const getProductionCountData = async () => {
    try {
        let oldestDate = removeTime(new Date());
        let latestDate = removeTime(new Date());
        let diffDays = 0;

        const latestData = await ProductionData.query()
            .orderBy('created_at', 'desc')
            .limit(1);
        const oldestData = await ProductionData.query()
            .orderBy('created_at', 'asc')
            .limit(1);

        if (oldestData && oldestData.length > 0) {
            oldestDate = removeTime(oldestData[0].created_at);
        }
        if (latestData && latestData.length > 0) {
            latestDate = removeTime(latestData[0].created_at);
        }

        diffDays = getDiffDays(oldestDate, latestDate);

        let result = [];
        for (let i = 1; i <= diffDays + 1; i ++) {
            const fromDate = moment.utc(getAfterNumberOfDays(oldestDate, i - 1)).format('YYYY-MM-DD');
            const toDate = moment.utc(getAfterNumberOfDays(oldestDate, i)).format('YYYY-MM-DD');

            const cheeseData = await ProductionData.query()
                .whereBetween('created_at', [fromDate, toDate])
                .select('base','emb')
                .where('base','cheese')
                .where('emb',false)
                .count();
            const cheeseDataCount = cheeseData[0]['count(*)'];

            const cheeseEMBData = await ProductionData.query()
                .whereBetween('created_at', [fromDate, toDate])
                .select('base','emb')
                .where('base','cheese')
                .where('emb',true)
                .count();
            const cheeseEMBDataCount = cheeseEMBData[0]['count(*)'];

            const pepData = await ProductionData.query()
                .whereBetween('created_at', [fromDate, toDate])
                .select('base','emb')
                .where('base','pep')
                .where('emb',false)
                .count();
            const pepDataCount = pepData[0]['count(*)'];

            const pepEMBData = await ProductionData.query()
                .whereBetween('created_at', [fromDate, toDate])
                .select('base','emb')
                .where('base','pep')
                .where('emb',true)
                .count();
            const pepEMBDataCount = pepEMBData[0]['count(*)'];

            result.push({
                Date: fromDate,
                Total: cheeseDataCount + cheeseEMBDataCount + pepDataCount + pepEMBDataCount,
                Cheese: cheeseDataCount,
                CheeseEMB: cheeseEMBDataCount,
                Pep: pepDataCount,
                PepEMB: pepEMBDataCount,
            });
        }

        return result;
    } catch (e) {
        return [];
    }

}
