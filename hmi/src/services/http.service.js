import axios from 'axios';

import config from '../config';
import storage from './storage.service';

export const http = axios.create({ baseURL: `${config.baseURL}/` });

export const get = (url, headers = {}, params = {}) => {
    const accessToken = storage.getItem(config.tokenKey);
    const authHeader = { Authorization: `Bearer ${accessToken}` };
    return http.get(url, {
        ...params,
        headers: { ...authHeader, ...headers },
    });
}

export const post = (url, data, headers = {}, params = {}) => {
    const accessToken = storage.getItem(config.tokenKey);
    const authHeader = { Authorization: `Bearer ${accessToken}` };
    return http.post(url, data, {
        ...params,
        headers: { ...authHeader, ...headers },
    });
}

export const put = (url, data, headers = {}) => {
    const accessToken = storage.getItem(config.tokenKey);
    const authHeader = { Authorization: `Bearer ${accessToken}` };
    return http.put(url, data, { headers: { ...authHeader, ...headers } });
}

export const remove = (url, data, headers = {}) => {
    const accessToken = storage.getItem(config.tokenKey);
    const authHeader = { Authorization: `Bearer ${accessToken}` };
    return http.delete(url, {
        headers: { ...authHeader, ...headers },
        data,
    });
}
