import * as httpService from './http.service';

const connectWifi = (ssid, psk) => httpService
    .put('/wifi/connect', {ssid, psk}, {'content-type': 'application/json'})
    .then((res) => res)
    .catch((err) => Promise.reject(err));

const getWifiStatus = () => httpService
    .get('/wifi/status')
    .then(({data}) => data)
    .catch((err) => Promise.reject(err));

const scanWifiDevices = () => httpService
    .get('/wifi/scan')
    .then(({data}) => data)
    .catch((err) => Promise.reject(err));

export {
    connectWifi,
    getWifiStatus,
    scanWifiDevices,
};
