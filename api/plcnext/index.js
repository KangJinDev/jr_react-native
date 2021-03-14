import axios from "axios";
import https from "https";
import { base, file } from "paths.macro";
import { createLogger } from "../logger";
import appConfig from "../config";

const logger = createLogger(base, file);
const http = axios.create({
  baseURL: `${appConfig.plcBaseUrl}`,
  httpsAgent: new https.Agent({ rejectUnauthorized: false }),
});

const pathPrefix = "Arp.Plc.Eclr/";
export const faultedVar = "HMI_NR_MachineFaulted";
export const faultsVar = "HMI_BackendFaults";
const pizzaDataVar = "PizzaData";
const readyStatusVar = "HMI_Ready";
const cleaningDataVar = "HMI_CleaningData";
const bladeDataVar = "HMI_BladeData";
const bladeDataConfirmVar = "HMI_CumulativeBladeCutCount";
const wifiConnectedVar = "HMI_WifiGood";

export const getVariables = async (vars) => {
  const params = {
    pathPrefix: pathPrefix,
    paths: vars.join(","),
  };
  const query = Object.keys(params)
    .map((key) => {
      return `${key}=${params[key]}`;
    })
    .join("&");
  try {
    const { data } = await http.get(`/variables?${query}`);
    logger.info({
      line: __line,
      function: "getVariables",
      vars,
      response: data,
    });
    const values =
      data && data.variables
        ? data.variables.map((item) => {
            const name = item.path.split("/")[1];

            if (typeof item.value === "object" && !!item.value) {
              let value = item.value;
              value["name"] = name;

              return value;
            } else {
              return {
                name: name,
                value: item.value,
              };
            }
          })
        : [];

    return values;
  } catch (error) {
    logger.error({ line: __line, error });
    throw error;
  }
};

/*
 * Sets "constants" to PLCnext variables
 */
export const setVariables = async (vars) => {
  const variables = vars.map((item) => {
    return { path: item.name, value: item.value, valueType: "Constant" };
  });
  try {
    const response = await http.put(
      `/variables`,
      JSON.stringify({ pathPrefix: pathPrefix, variables: variables })
    );
    logger.info({
      line: __line,
      function: "setVariables",
      vars,
      response: response.data,
    });
    return response;
  } catch (error) {
    logger.error({ line: __line, error });
    throw error;
  }
};

export const getFaulted = async () => {
  return await getVariables([faultedVar]);
};

export const getFaults = async () => {
  return await getVariables([faultsVar]);
};

export const ackFaults = async () => {
  return await setVariables([{ name: faultedVar, value: false }]);
};

export const getReadyStatus = async () => {
  return (await getVariables([readyStatusVar]))[0].value;
};

export const getProductionData = async () => {
  return (await getVariables([pizzaDataVar]))[0];
};

export const getBladeData = async () => {
  return (await getVariables([bladeDataVar]))[0];
};

export const setProductionDataReceived = async () => {
  return await setVariables([{ name: `${pizzaDataVar}.New`, value: false }]);
};

export const setCleaningDataReceived = async () => {
  return await setVariables([{ name: `${cleaningDataVar}.New`, value: false }]);
};

export const setBladeHistoryDataReceived = async () => {
  return await setVariables([{ name: `${bladeDataVar}.New`, value: false }]);
};

export const setBladeHistoryResetDone = async () => {
  return await setVariables([{ name: `${bladeDataVar}.Reset`, value: false }]);
};

export const setBladeHistoryDataConfirm = async (value) => {
  return await setVariables([{ name: bladeDataConfirmVar, value }]);
};

export const getCleaningData = async () => {
  return (await getVariables([cleaningDataVar]))[0];
};

export const setWifiConnected = async (value) => {
  return await setVariables([{ name: wifiConnectedVar, value }]);
};
