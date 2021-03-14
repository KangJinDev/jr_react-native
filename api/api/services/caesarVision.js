import axios from 'axios';
import fs from 'fs';

import appConfig from '../../config';
import * as config from './config';

const http = axios.create({ baseURL: `${appConfig.cvBaseUrl}` });

export const authorize = async (pin) => {
  const savedPin = getOnboardPin();

  if (pin && savedPin === pin) {
    return {
      errorCode: '',
      errorDescription: '',
      accessLevel: 2
    }
  }

  const { data } = await http.post(`/mike`, getCvMessage(1018, {
    PIN: pin || 0
  }));

  return {
    errorCode: data.errorCode,
    errorDescription: data.errorDescription,
    accessLevel: data.accessLevel,
  };
};

export const log = async (logs) => {
  const currentLogLevel = config.getLogLevel()
  const filteredLogs = logs.filter(l => parseInt(l.logLevel) <=  currentLogLevel )
  const { data } = await http.post(`/mike`, getCvMessage(1020, {
    logs: filteredLogs
  }));
  return {
    acknowledged: data.acknowledged
  };
};

export const getConfigFromCv = async (logs) => {
  const { data } = await http.post(`/mike`, getCvMessage(1004));
  console.log(JSON.stringify(data))
  return parseInt(data)
};

const getCvMessage = (messageType, data) => {
  const date = new Date();
  const message = {
    messageType,
    locationNumber: config.getLocationNumber(),
    dateTimeStampUTC: `${date.getUTCFullYear()}-${date.getUTCMonth()}-${date.getUTCDay()} ${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()}`,
    ...data
  };
  console.log(JSON.stringify(message))
  return message;
}

export const getOnboardPin = () => {
  try {
    const data = fs.readFileSync(appConfig.pinFile);

    return parseInt(JSON.parse(data), 10);
  } catch {
    return 0;
  }
}
