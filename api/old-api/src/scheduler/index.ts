import { CronJob } from 'cron'
import { DateTime } from 'luxon';
import * as config from '../config'
import * as plcnext from '../plcnext'
import * as faultService from '../services/fault.service'
import * as databaseService from '../services/database.service'
import * as timezoneService from '../services/timezone.service'
import db from '../database/production'

const ProductionData = db.productionData
const CheeseTrend = db.cheeseTrend

/**
 * Task pulls pizza production data from PLCnext periodically
 * (every 10 seconds) and stores in the local production database
 */
const pizzaProdDataTask = new CronJob({
    cronTime: `*/10 * * * * *`,
    onTick: async () => {
        try {
            const prodData = await plcnext.getProductionData()

            // Only save production data if a new pizza has been made
            if (prodData.New || true) {
                const timestamp = DateTime.utc().toMillis()
                const timezoneNumber = timezoneService.convertTimezoneStringToNumber(config.getTimezone())
                
                await databaseService.saveProductionData(timestamp, timezoneNumber, prodData)
            }
        } catch (err) {
            console.log(`Error getting and saving pizza production data:\n ${err}`)
        }
    }
})

/**
 * Task pulls machine fault data from PLCnext periodically
 * (every 1 minute) and stores in the local production database
 */
const machineFaultDataTask = new CronJob({
    cronTime: `0 * * * * *`,
    onTick: async () => {
        try {
            // Get and parse fault values
            const faultData = await plcnext.getFaults()
            const faulted = faultData.find((item) => {
                return item.name === 'HMI_NR_MachineFaulted'
            }).value
            const faultedAck = faultData.find((item) => {
                return item.name === 'HMI_NR_MachineFaultedAck'
            }).value

            if (faulted && !faultedAck) {
                // Get and parse alarm data
                const alarmData = await plcnext.getAlarms()
                const alarms = alarmData.find((item) => {
                    return item.name === 'AlarmsCritical'
                })?.Messages ?? []
                const faults = await faultService.parseFaults(alarms)
                console.log(faults)

                // Store in database
                const timestamp = DateTime.utc().toMillis()
                const timezoneNumber = timezoneService.convertTimezoneStringToNumber(config.getTimezone())
                for (const fault of faults) {
                    await databaseService.saveMachineFaults(timestamp, timezoneNumber, fault.code, fault.description)
                }

                // Acknowledge machine faults
                await plcnext.ackFaults()
            }
        } catch (err) {
            console.log(`error getting production data ${err}`)
        }
    }
})

export const initialize = () => {
    pizzaProdDataTask.start()
    machineFaultDataTask.start()
}
