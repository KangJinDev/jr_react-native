import BladeHistory from '../../models/BladeHistory';

export const getBladeHistories = (req, res) => {
    const {currentPage, pageSize} = req.query;

    if (currentPage && pageSize) {
        return BladeHistory.query()
            .orderBy('created_at', 'desc')
            .page(parseInt(currentPage), parseInt(pageSize))
            .then(data => {
                res.json(data);
            });
    }

    return BladeHistory.query()
        .then(data => {
            res.json({results: data, total: data.length});
        });
};
