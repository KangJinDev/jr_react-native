import ProductionData from '../../models/ProductionData';
import {getProductionCountData} from '../services/production-data';

export const getProductionData = async (req, res) => {
    const {currentPage, pageSize} = req.query;

    try {
        if (currentPage && pageSize) {
            const result = await getProductionCountData();

            const pageData = result.slice(currentPage * pageSize, (currentPage + 1) * pageSize);

            return res.json({
                data: pageData,
                total: result.length,
            });
        }

        return ProductionData.query()
            .then(data => {
                res.json({results: data, total: data.length});
            });
    } catch (e) {
        return res.json({
            data: [],
            total: 0,
        });
    }
};
