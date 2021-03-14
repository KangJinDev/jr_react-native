import { CronJob } from 'cron';
import moment from 'moment';

import ProductionData from '../models/ProductionData';
import CleaningHistory from '../models/CleaningHistory';
import BladeHistory from '../models/BladeHistory';
import MachineFault from '../models/MachineFault';
import appConfig from '../config';
import {getAfterNumberOfDays} from '../utils';
import {getDataRetentionDays} from "../api/services/config";



/**
 * Task pulls pizza production data from PLCnext periodically
 * (every 1 hour) and stores in the local production database
 */
const pizzaProdDataTask = new CronJob({
    cronTime: appConfig.cronTimeConfig,
    onTick: async () => {
        try {
            await ProductionData.query().insert({
                sauce_time: Math.floor(30 * Math.random()),
                cheese_time: Math.floor(30 * Math.random()),
                pep_time: Math.floor(30 * Math.random()),
                index_time: Math.floor(30 * Math.random()),
                cheese_weight: Math.floor(10 * Math.random()) / 4,
                prefill_drop_weight: Math.floor(8 * Math.random()) / 4,
                prefill_time: Math.floor(20 * Math.random()),
                base: Math.floor(10 * Math.random()) % 2 ? 'cheese' : 'pep',
                crust: Math.floor(10 * Math.random()) % 2 ? 'thin' : 'original',
                cheese: Math.floor(10 * Math.random()) % 2 ? 'light' : 'regular',
                sauce: Math.floor(10 * Math.random()) % 2 ? 'light' : 'regular',
                emb: Math.floor(10 * Math.random()) % 2,
            });
        } catch (err) {
            console.log(`Error getting and saving pizza production data:\n ${err}`);
        }
    }
});

/**
 * Task pulls cleaning history from PLCnext periodically
 * (every 1 hour) and stores in the local production database
 */
const cleaningHistoryTask = new CronJob({
    cronTime: appConfig.cronTimeConfig,
    onTick: async () => {
        try {
            await CleaningHistory.query().insert({
                cleaning_zone: Math.floor(300 * Math.random()) > 150 ? "Sauce" : "Cheese",
            });
        } catch (err) {
            console.log(`Error getting and saving cleaning history:\n ${err}`);
        }
    }
});

/**
 * Task pulls blade history from PLCnext periodically
 * (every 1 hour) and stores in the local production database
 */
const bladeHistoryTask = new CronJob({
    cronTime: appConfig.cronTimeConfig,
    onTick: async () => {
        try {
            await BladeHistory.query().insert({
                value: Math.floor(20 * Math.random()),
            });
        } catch (err) {
            console.log(`Error getting and saving blade history:\n ${err}`);
        }
    }
});

/**
 * Task pulls machine fault data from PLCnext periodically
 * (every 1 hour) and stores in the local production database
 */
const machineFaultTask = new CronJob({
    cronTime: appConfig.cronTimeConfig,
    onTick: async () => {
        try {
            await MachineFault.query().insert({
                fault_code: `CODE - ${new Date().getTime()}`,
                description: `Description - ${new Date().getTime()}`,
            });
        } catch (err) {
            console.log(`Error getting and saving machine fault data:\n ${err}`);
        }
    }
});

/**
 * Task remove old data
 * (every 4 hour)
 */
const removeOldData = new CronJob({
    cronTime: '0 0 */4 * * *',
    onTick: async () => {
        try {
            const dataRetentionDays = await getDataRetentionDays();
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

export const mockInitializeCronJob = () => {
    pizzaProdDataTask.start();
    cleaningHistoryTask.start();
    bladeHistoryTask.start();
    machineFaultTask.start();
    removeOldData.start();
}
