import * as httpService from './http.service';
import {buildQuery} from '../utils';

const getMachineFaults = (params) => httpService
    .get(`/machine-faults?${buildQuery(params)}`)
    .then((data) => data)
    .catch((err) => Promise.reject(err));

export {
    getMachineFaults,
};
