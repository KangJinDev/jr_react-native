import * as httpService from './http.service';

const getCheeseTrends = () => httpService
    .get('/cheese-trends')
    .then((data) => data)
    .catch((err) => Promise.reject(err));

export {
    getCheeseTrends,
};
