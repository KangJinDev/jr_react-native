import * as httpService from './http.service';

const getAppStatus = () => httpService
    .get('/app/status')
    .then((data) => data)
    .catch((err) => Promise.reject(err));

const getAppConfig = () => httpService
    .get('/app/config')
    .then((data) => data)
    .catch((err) => Promise.reject(err));

const configureApp = (config) => httpService
    .put('/app/config', config)
    .then((data) => data)
    .catch((err) => Promise.reject(err));

export {
    getAppStatus,
    getAppConfig,
    configureApp,
};
