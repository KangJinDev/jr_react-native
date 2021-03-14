import * as httpService from './http.service';
import {buildQuery} from '../utils';

const getCleaningHistories = (params) => httpService
    .get(`/cleaning-histories?${buildQuery(params)}`)
    .then((data) => data)
    .catch((err) => Promise.reject(err));

export {
    getCleaningHistories,
};
