import * as httpService from './http.service';
import {buildQuery} from '../utils';

const getProductionData = (params) => httpService
    .get(`/production-data?${buildQuery(params)}`)
    .then((data) => data)
    .catch((err) => Promise.reject(err));

export {
    getProductionData,
};
