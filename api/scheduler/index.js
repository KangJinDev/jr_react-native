import {CronJob} from "cron";

import * as plcNext from "../plcnext";
import * as cvService from "../api/services/caesarVision";
import moment from 'moment';

import * as configService from "../api/services/config";
import * as wifiService from "../api/services/wifi";
import appConfig from "../config";
import ProductionData from "../models/ProductionData";
import CleaningHistory from "../models/CleaningHistory";
import MachineFault from "../models/MachineFault";
import BladeHistory from "../models/BladeHistory";
import {parseFaults} from "../api/services/machine-fault";
import {getAfterNumberOfDays} from "../utils";
import {getDataRetentionDays} from "../api/services/config";
import {parsePizzaType} from "../api/services/production-data";

/**
 * Task pulls pizza production data from PLCnext periodically
 * and stores in the local production database
 */
const pizzaProdDataTask = new CronJob({
  cronTime: appConfig.cronTimeConfig,
  onTick: async () => {
    try {
      const prodData = await plcNext.getProductionData();

      // Only save production data if a new pizza has been made
      if (!prodData?.New) {
        return;
      }

      const pizzaType = parsePizzaType(prodData.PizzaType);

      await ProductionData.query().insert({
        sauce_time: prodData.SauceTime,
        cheese_time: prodData.ChzTime,
        pep_time: prodData.PeppTime,
        index_time: prodData.IdxTime,
        cheese_weight: prodData.ChzWght,
        prefill_drop_weight: prodData.DropChzWght,
        prefill_time: prodData.PrefillTime,
        ...pizzaType,
      });

      await plcNext.setProductionDataReceived();
    } catch (err) {
      console.log(`Error getting and saving pizza production data:\n ${err}`);
    }
  },
});

/**
 * Task pulls cleaning history data from PLCnext periodically
 * and stores in the local database
 */
const cleaningDataTask = new CronJob({
  cronTime: appConfig.cronTimeConfig,
  onTick: async () => {
    try {
      const cleaningData = await plcNext.getCleaningData();
      if (!cleaningData?.New) {
        return;
      }
      // Only save production data if a new pizza has been made
      await CleaningHistory.query().insert({
        cleaning_zone: cleaningData.Zone,
      });

      await plcNext.setCleaningDataReceived();
    } catch (err) {
      console.log(`Error getting and saving cleaning history data:\n ${err}`);
    }
  },
});

/**
 * Task pulls log level and location number from CV server periodically
 * and stores in the local config
 * (every 1 hour)
 */
const cvConfigTask = new CronJob({
  cronTime: "0 0 */1 * * *",
  onTick: async () => {
    try {
      const cvConfig = await cvService.getConfigFromCv();
      await configService.setLogLevel(cvConfig.logLevel);
      await configService.setLocationNumber(cvConfig.locationNumber);
    } catch (err) {
      console.log(`Error getting and saving config (log level and location number) from CV:\n ${err}`);
    }
  },
});

/**
 * Task pulls machine fault data from PLCnext periodically
 * and stores in the local database
 */
const machineFaultDataTask = new CronJob({
  cronTime: appConfig.cronTimeConfig,
  onTick: async () => {
    try {
      // Get and parse fault values
      const faultedData = await plcNext.getFaulted();

      const hasFaulted = faultedData.find(
        (item) => item.name === plcNext.faultedVar
      )?.value;

      if (hasFaulted) {
        // Get and parse fault data
        const faultsData = await plcNext.getFaults();
        const faultsMessages =
          faultsData.find((item) => item.name === plcNext.faultsVar)?.Messages ??
          [];

        const faults = await parseFaults(faultsMessages);

        for (const fault of faults) {
          await MachineFault.query().insert({
            fault_code: fault.code,
            description: fault.description,
          });
        }

        // Acknowledge machine faults
        await plcNext.ackFaults();
      }
    } catch (err) {
      console.log(`error getting fault data ${err}`);
    }
  },
});

/**
 * Task pulls blade history data from PLCnext periodically
 * (every 5 seconds)
 */
const bladeHistoryDataTask = new CronJob({
  cronTime: '*/5 * * * * *',
  onTick: async () => {
    try {
      const bladeData = await plcNext.getBladeData();

      // Check for New blade cuts
      if (bladeData?.New) {
        const latestData = await BladeHistory.query()
          .orderBy('updated_at', 'desc')
          .limit(1);

        if (latestData && latestData.length > 0) {
          const latestDataId = latestData[0].id;

          let cumulativeCuts = latestData[0].value + bladeData.Cuts

          await BladeHistory.query()
            .findById(latestDataId)
            .patch({
              value: cumulativeCuts,
              updated_at: moment(new Date).format('YYYY-MM-DD HH:mm:ss')
            });

          await plcNext.setBladeHistoryDataConfirm(cumulativeCuts);
        } else {
          await BladeHistory.query().insert({ value: bladeData.Cuts });
          await plcNext.setBladeHistoryDataConfirm(bladeData.Cuts);
        }

        await plcNext.setBladeHistoryDataReceived();
      }

      // Check for blade Reset
      if (bladeData?.Reset) {
        await BladeHistory.query().insert({ value: 0 });
        await plcNext.setBladeHistoryResetDone();
        await plcNext.setBladeHistoryDataConfirm(0);
      }
    } catch (err) {
      console.log(`Error getting and saving blade history data:\n ${err}`);
    }
  },
});

/**
 * Task sending blade history data to PLCnext periodically
 * (every 15 seconds)
 */
const sendBladeHistoryDataTask = new CronJob({
  cronTime: '*/15 * * * * *',
  onTick: async () => {
    try {
      const latestData = await BladeHistory.query()
          .orderBy('updated_at', 'desc')
          .limit(1);

      if (latestData && latestData.length > 0) {
        await plcNext.setBladeHistoryDataConfirm(latestData[0].value);
      }
    } catch (err) {
      console.log(`Error sending blade history data:\n ${err}`);
    }
  },
});

/**
 * Task remove old data
 * (every 4 hour)
 */
const removeOldDataTask = new CronJob({
  cronTime: '0 0 */4 * * *',
  onTick: async () => {
    try {
      let dataRetentionDays = await getDataRetentionDays();
      dataRetentionDays = dataRetentionDays ? dataRetentionDays : 180
      const fromDate = '2000-01-01';
      const toDate = moment.utc(getAfterNumberOfDays(new Date(), -1 * (dataRetentionDays - 1))).format('YYYY-MM-DD');

      await CleaningHistory.query().whereBetween('created_at', [fromDate, toDate]).del();
      await ProductionData.query().whereBetween('created_at', [fromDate, toDate]).del();
      await MachineFault.query().whereBetween('created_at', [fromDate, toDate]).del();
      await BladeHistory.query().whereBetween('created_at', [fromDate, toDate]).del();
    } catch (err) {
      console.log(`Error getting and remove old data:\n ${err}`);
    }
  }
});

/**
 * Task to update wifi status on PLCnext
 * (every 1 minute)
 */
const updateWiFiStatusTask = new CronJob({
  cronTime: '0 */1 * * * *',
  onTick: async () => {
    const wifiStatus = await wifiService.status()
    plcNext.setWifiConnected(!!wifiStatus.ieee)
  }
});

export const initializeCronJob = () => {
  pizzaProdDataTask.start();
  machineFaultDataTask.start();
  cleaningDataTask.start();
  cvConfigTask.start();
  removeOldDataTask.start();
  bladeHistoryDataTask.start();
  sendBladeHistoryDataTask.start();
  updateWiFiStatusTask.start();
};
