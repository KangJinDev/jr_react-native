import MachineFault from '../../models/MachineFault';

export const getMachineFaults = (req, res) => {
    const {currentPage, pageSize} = req.query;

    if (currentPage && pageSize) {
        return MachineFault.query()
            .orderBy('created_at', 'desc')
            .page(parseInt(currentPage), parseInt(pageSize))
            .then(data => {
                res.json(data);
            });
    }

    return MachineFault.query()
        .then(data => {
            res.json({results: data, total: data.length});
        });
};
