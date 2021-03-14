import CleaningHistory from '../../models/CleaningHistory';
import * as config from '../services/config';

export const getCleaningHistories = (req, res) => {
    const {currentPage, pageSize} = req.query;

    if (currentPage && pageSize) {
        return CleaningHistory.query()
            .orderBy('created_at', 'desc')
            .page(parseInt(currentPage), parseInt(pageSize))
            .then(data => {
                res.json(data);
            });
    }

    return CleaningHistory.query()
        .then(data => {
            res.json({results: data, total: data.length});
        });
};

export const getLatestTimestamp = async (req, res) => {
    const {zone} = req.query;

    try {

        let latestTime = new Date();
        if (zone) {
            const latestData = await CleaningHistory.query()
                .whereRaw('LOWER(cleaning_zone) LIKE ?', '%'+zone.toLowerCase()+'%')
                .orderBy('created_at', 'desc')
                .limit(1);

            if (latestData && latestData.length > 0) {
                latestTime = latestData[0].created_at;
                const isoStr = new Date(latestTime).toISOString();
                const timestamps = new Date(latestTime).getTime();
                const timezone = config.getTimezone();

                return res.json({
                    iso: isoStr,
                    unix: timestamps,
                    offset: timezone
                })
            }
        }

        return res.json({
            iso: null,
            unix: null,
            offset: null
        })
    } catch (e) {
        return res.json({
            iso: null,
            unix: null,
            offset: null
        })
    }
};
