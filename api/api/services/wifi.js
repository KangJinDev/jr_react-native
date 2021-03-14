import axios from "axios";

import appConfig from "../../config";

const http = axios.create({ baseURL: `${appConfig.wifiConfigService}/` });

export const scan = () => {
  return http.get(`/scan`);
};

export const status = () => {
  return http.get(`/status`);
};

export const connect = (ssid, psk) => {
  return http.get(`/connect?ssid=${ssid}&psk=${psk}`);
};
