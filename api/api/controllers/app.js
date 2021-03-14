import * as plcNext from "../../plcnext";

export const getAppStatus = (req, res) => {
    plcNext.getReadyStatus()
        .then((ready) => {
            res.json({
                success: ready
            });
        })
        .catch((error) => {
            res.status(500).send({ message: error.message })
        })
};


export const mockGetAppStatus = (req, res) => {
    setTimeout(() => {
        res.json({
            success: true,
        });
    }, 2000);
};
