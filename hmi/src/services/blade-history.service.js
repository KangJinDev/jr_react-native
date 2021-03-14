import * as httpService from './http.service';
import {buildQuery} from '../utils';

const getBladeHistories = (params) => httpService
    .get(`/blade-histories?${buildQuery(params)}`)
    .then((data) => data)
    .catch((err) => Promise.reject(err));

export {
    getBladeHistories,
};
