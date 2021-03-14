import nconf from 'nconf';
import appConfig from '../../config';

nconf.argv()
    .env()
    .file({ file: appConfig.configFile, });

nconf.load();

const configVersionKey = 'ConfigVersion';
const serialNumberKey = 'MikeSerialNum';
const timezoneKey = 'Timezone';
const locationNumberKey = 'locationNumber';
const franchiseNumberKey = 'franchiseNumber';
const storeNumberKey = 'storeNumber';
const storeIdKey = 'storeId';
const portalIdKey = 'portalId';
const plcnextPasswordKey = 'plcnextPassword';
const logLevelKey = 'CVLogLevel';
const dataRetentionDaysKey = 'dataRetentionDays';

export const getAllConfigs = nconf.get();

// ConfigVersion
export const setConfigVersion = async (version) => {
    await setConfig(configVersionKey, version);
};

// MikeSerialNum
export const setSerialNumber = async (serialNumber) => {
    await setConfig(serialNumberKey, serialNumber);
};

// Timezone
export const getTimezone = () => {
    return getConfig(timezoneKey);
}

export const setTimezone = async (timezone) => {
    await setConfig(timezoneKey, timezone);
};


// locationNumber
export const setLocationNumber = async (locationNumber) => {
    await setConfig(locationNumberKey, locationNumber);
};

export const getLocationNumber = () => {
    return getConfig(locationNumberKey);
}

// logLevel
export const setLogLevel = async (logLevel) => {
    await setConfig(logLevelKey, logLevel);
};

export const getLogLevel = () => {
    return getConfig(logLevelKey);
}

export const getDataRetentionDays = () => {
    return getConfig(dataRetentionDaysKey);
}

// franchiseNumber
export const setFranchiseNumber = async (franchiseNumber) => {
    await setConfig(franchiseNumberKey, franchiseNumber);
};


// storeNumber
export const setStoreNumber = async (storeNumber) => {
    await setConfig(storeNumberKey, storeNumber);
};


// storeId
export const setStoreId = async (storeId) => {
    await setConfig(storeIdKey, storeId);
};


// portalId
export const setPortalId = async (portalId) => {
    await setConfig(portalIdKey, portalId);
};


// Plcnext Password
export const setPlcnextPassword = async (version) => {
    await setConfig(plcnextPasswordKey, version);
};

// Data retention days
export const setDataRetentionDays = async (dataRetentionDays) => {
    await setConfig(dataRetentionDaysKey, dataRetentionDays);
};

// Helper functions
export const getConfig = (property) => {
    return nconf.get(property);
};

export const getAppConfig = () => {
    return {
        ConfigVersion: getConfig(configVersionKey),
        MikeSerialNum: getConfig(serialNumberKey),
        Timezone: getConfig(timezoneKey),
        locationNumber: getConfig(locationNumberKey),
        franchiseNumber: getConfig(franchiseNumberKey),
        logLevel: getConfig(logLevelKey),
        storeNumber: getConfig(storeNumberKey),
        storeId: getConfig(storeIdKey),
        portalId: getConfig(portalIdKey),
        plcnextPassword: getConfig(plcnextPasswordKey),
        dataRetentionDays: getConfig(dataRetentionDaysKey),
    }
}

export const setConfig = async (property, value) => {
    await nconf.set(property, value);

    await nconf.save((err) => {
        if (err) {
            console.error(err.message)
            return;
        }
    });
}
