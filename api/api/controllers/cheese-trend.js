import {getAfterNumberOfDays, getDiffDays, removeTime} from "../../utils";
import ProductionData from "../../models/ProductionData";
import moment from "moment";

export const getCheeseTrends = async (req, res) => {
    let latestDate = removeTime(new Date());

    const latestData = await ProductionData.query()
        .orderBy('created_at', 'desc')
        .limit(1);

    if (latestData && latestData.length > 0) {
        latestDate = removeTime(latestData[0].created_at);
    }

    let result = [];
    for (let i = 1; i <= 30; i ++) {
        const fromDate = moment.utc(getAfterNumberOfDays(latestDate, 1 - i)).format('YYYY-MM-DD');
        const toDate = moment.utc(getAfterNumberOfDays(latestDate, 2 - i)).format('YYYY-MM-DD');

        const cheeseWeightData = await ProductionData.query()
            .whereBetween('created_at', [fromDate, toDate])
            .andWhere('cheese', 'regular')
            .andWhere('emb', 0)
            .andWhereNot('cheese_weight', 0)
            .avg('cheese_weight');
        const cheeseWeight = cheeseWeightData[0]['avg(`cheese_weight`)'];

        const prefillDropWeightData = await ProductionData.query()
            .whereBetween('created_at', [fromDate, toDate])
            .andWhere('cheese', 'regular')
            .andWhere('emb', 0)
            .andWhereNot('cheese_weight', 0)
            .avg('prefill_drop_weight');
        const prefillDropWeight = prefillDropWeightData[0]['avg(`prefill_drop_weight`)'];

        const prefillTimeData = await ProductionData.query()
            .whereBetween('created_at', [fromDate, toDate])
            .andWhere('cheese', 'regular')
            .andWhere('emb', 0)
            .andWhereNot('cheese_weight', 0)
            .avg('prefill_time');
        const prefillTime = prefillTimeData[0]['avg(`prefill_time`)'];

        result.push({
            created_at: fromDate,
            weight: cheeseWeight,
            prefill_drop_weight: prefillDropWeight,
            prefill_time: prefillTime,
        })
    }

    return res.json(result);
};
