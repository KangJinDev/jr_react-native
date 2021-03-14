import { Request, Response } from "express";
import * as caesarVisionService from '../services/caesarVision.service'
import * as timezoneService from '../services/timezone.service'
import * as databaseService from '../services/database.service'
import * as faultService from '../services/fault.service'
import * as buttonService from '../services/button.service'
import * as config from '../config'
import { DateTime } from 'luxon'
import * as wifi from '../wifi'
import * as plcnext from '../plcnext'
import { AuthRequest, AuthResponse } from '../models/types/auth';


// GET Requests

export const getBladeHistory =  async (req: Request, res: Response) => {
  try {
    const bladeCutHistory = await databaseService.getLifetimeHistoryByAttribute('Blade Change', 'LastUpdatedUTC', 'DESC')
    res.json(bladeCutHistory);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving CheeseTrend."
    });
  }
};

export const getCVInfo = (req: Request, res: Response) => {
    res.json({
        "name": "caesarvision",
        "MikeSerialNum": config.getSerialNumber(),
        "franchiseNumber": config.getFranchiseNumber(),
        "storeNumber": config.getStoreNumber(),
        "storeId": config.getStoreId(),
        "locationNumber": config.getLocationNumber()
    })
}

export const getTimeZone = (req: Request, res: Response) => {
    const timezone = config.getTimezone()
    const timezoneNumber = timezoneService.convertTimezoneStringToNumber(timezone)
    res.json({
        "name": "Timezone",
        "value": timezoneNumber,
        "valuestrg": timezone
    })
}

export const cheeseTrendData = async (req: Request, res: Response) => {
  try {
    const cheeseTrend = await databaseService.aggregateCheeseTrendData()
    res.json(cheeseTrend)
  } catch (error) {
    console.error(error);
    res.sendStatus(500)
  }
}

export const getMachineFaultList = async (req: Request, res: Response) => {
  try {
    const faultList = await faultService.getFaultList();
    res.json(faultList)
  } catch (error) {
    console.error(error);
    res.sendStatus(500)
  }
}

export const getBladeNumCuts = async (req: Request, res: Response) => {
  try {
    const bladeCuts = await databaseService.getLifetimeHistoryByAttribute('Blade Cuts', 'LastUpdatedUTC', 'DESC')
    res.json(bladeCuts)
  } catch (error) {
    console.error(error);
    res.sendStatus(500)
  }
}

export const getTodaysPizzPepCount = async (req: Request, res: Response) => {
  try {
    const peppPizzaCount = await databaseService.getTodaysPeppPizzaCount()
    res.json(peppPizzaCount)
  } catch (error) {
    console.error(error);
    res.sendStatus(500)
  }
}

export const getDryCyclesCount = async (req: Request, res: Response) => {
  try {
    const dryCycleCount = await databaseService.getDryCycleCount()
    res.json(dryCycleCount)
  } catch (error) {
    console.error(error);
    res.sendStatus(500)
  }
}

export const getWiFiConnectStatus = (req: Request, res: Response) => {
  wifi.status()
    .then((data: wifi.WiFiStatus) => {
      res.json(data)
    })
    .catch((error) => {
      res.status(500).send({ message: error.message })
    })
}

export const getWiFiNetworks = (req: Request, res: Response) => {
  wifi.scan()
    .then((data: string[]) => {
      const sortedList = data.filter(i => !!i).sort()
      res.json(sortedList)
    })
    .catch((error) => {
      res.status(500).send({ message: error.message })
    })
}

// PUT Requests

export const getCleaningData = async (req: Request, res: Response) => {
  try {
    const cleaningData = await databaseService.aggregateCleaningData(
      req.body[0].NumEntries,
      req.body[0].StartIdx
      );
    res.json(cleaningData);
  } catch (error) {
    console.error(error);
    res.sendStatus(500)
  }
}

export const getProdData = async (req: Request, res: Response) => {
  try {
    const prodData = await databaseService.aggregateProductionData()
    res.json(prodData);
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
}

export const getLastCleaned = async (req: Request, res: Response) => {
  try {
    const cleaningData = await databaseService.getCleaningData('DESC')
    res.json(cleaningData)
  } catch (error) {
    console.error(error);
    res.sendStatus(500)
  }
}

export const setCVInfo = (req: Request, res: Response) => {
    config.setSerialNumber(req.body.MikeSerialNum)
    config.setFranchiseNumber(req.body.franchiseNumber)
    config.setStoreNumber(req.body.storeNumber)
    config.setStoreId(req.body.storeId)
    config.setLocationNumber(req.body.locationNumber)
    res.json({ "SaveStatus": "Success" })
}

export const setTimeZone = (req: Request, res: Response) => {
    const timezone = timezoneService.ensureTimezoneIsString(req.body.timezone)
    config.setTimezone(timezone)
    res.json({ "SaveStatus": "Success" })
}

export const addCleaningData = (req: Request, res: Response) => {
  try {
    const data = req.body
    databaseService.addCleaningData(data.cleaningZone)
    res.json({ "success": true })
  } catch (error) {
    res.status(500).json({ "error": error })
  }
}

export const resetBladeCutCount = async (req: Request, res: Response) => {
  try {
    await databaseService.createLifetimeHistory('Blade Change', req.body.payload[0].button.value)

    let updated = await databaseService.findOneLifetimeHistoryByAttribute('Blade Cuts');
    if (updated) {
      updated.Value = 0;
      updated.LastUpdatedUTC = DateTime.utc().toMillis()
      await updated.save()
    } else {
      updated = await databaseService.createLifetimeHistory('Blade Cuts', 0);
    }
    res.json(updated)
  } catch (error) {
    console.error(error);
    res.sendStatus(500)
  }
}

export const setWiFiCredentials = (req: Request, res: Response) => {
  wifi.connect(req.body.ssid, req.body.psk)
    .then((data: wifi.WiFiSuccess) => {
      res.json(data)
    })
    .catch((error) => {
      res.status(500).send({ message: error.message })
    })
}

// POST Requests

export const button = async (req: Request, res: Response) => {
  const success = await buttonService.handleButton(req.body.button)
  const message = { "success": success }
  
  try {
    res.json(message)
  } catch (error) {
    res.status(500).json(message)
  }
}

export const cvLogin = async (req: Request, res: Response) => {
  const authRequest: AuthRequest = req.body
  try {
    const authResponse = await caesarVisionService.authorize(authRequest.PIN)
    res.json(authResponse)
  } catch(error) {
    console.log(`CV login error: ${error}`)
    res.status(500).json({ error: error })
  }
}

export const vars = (req: Request, res: Response) => {
  console.log(`Requested vars: ${req.body.variables}`)

  plcnext.getVariables(req.body.variables)
    .then((data) => {
      res.json(data)
    })
    .catch((error) => {
      console.log(error)
      res.status(500).send({ message: error.message })
    })
}
