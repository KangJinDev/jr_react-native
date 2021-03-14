import * as config from '../services/config';

export const getConfig = async (req, res) => {
    try {
        const conf = await config.getAppConfig();
        res.json(conf);
    } catch (e) {
        res.json(null);
    }
}

export const configureApp = async (req, res) => {
    try {
        await config.setConfigVersion(req.body.ConfigVersion);
        await config.setSerialNumber(req.body.MikeSerialNum);
        await config.setTimezone(req.body.Timezone || 0);
        await config.setLocationNumber(req.body.locationNumber);
        await config.setFranchiseNumber(req.body.franchiseNumber);
        await config.setStoreNumber(req.body.storeNumber);
        await config.setStoreId(req.body.storeId);
        await config.setPortalId(req.body.portalId);
        await config.setPlcnextPassword(req.body.plcnextPassword);
        await config.setDataRetentionDays(req.body.dataRetentionDays || 30);

        res.json({
            success: true,
        });
    } catch (e) {
        console.log(e);
        res.json({
            success: false,
        });
    }
}
