import prodDatabase from '../database/production'
import faultsDatabase from '../database/faults'
import { Op } from 'sequelize';
import { DateTime } from 'luxon';
import * as config from '../config'
import * as plcnext from '../plcnext'
const LifetimeHistory = prodDatabase.lifetimeHistory;
const ProductionData = prodDatabase.productionData;
const CleaningHistory = prodDatabase.cleaningHistory;
const CheeseTrend = prodDatabase.cheeseTrend;
const Faults = faultsDatabase.faults;

export const getLifetimeHistoryByAttribute = async (attribute: string, orderBy: string, order: string) => {
  return await LifetimeHistory.findAll({
    where: { Attribute: attribute },
    order: [[ orderBy, order ]]
  })
}

export const aggregateCleaningData = async (numEntries: number, startIndex: number) => {
  const pageSauce = await CleaningHistory.findAll({
    limit: numEntries,
    order: [ [ 'idx', 'ASC' ]],
    where: {
      CleaningZone: 'Sauce',
      idx: {[Op.gte]: startIndex}
    }
  });
  const pagePepp = await CleaningHistory.findAll({
    limit: numEntries,
    order: [ [ 'idx', 'ASC' ]],
    where: {
      CleaningZone: 'Pepperoni',
      idx: {[Op.gte]: startIndex}
    }
  });
  const maxSauce = await CleaningHistory.findAll({
    limit: 1,
    order: [ [ 'idx', 'DESC' ]],
    where: {
      CleaningZone: 'Sauce'
    }
  });
  const maxPepp = await CleaningHistory.findAll({
    limit: 1,
    order: [ [ 'idx', 'DESC' ]],
    where: {
      CleaningZone: 'Pepperoni'
    }
  });

  return [
    pageSauce,
    pagePepp,
    maxSauce,
    maxPepp
  ];
}

export const aggregateProductionData = async () => {
  const pizzaCountByTypes = await ProductionData.findAll({
    where: {
      UTCDate: {
        [Op.gte]: DateTime.utc().minus({days: 1}).toMillis()
      },
      PizzaType: {
        [Op.ne]: 'Dry Cycle'
      }
    },
    attributes: ['PizzaType', [prodDatabase.sequelize.fn('COUNT', 'PizzaType'), 'Qty']],
    group: 'PizzaType'
  })
  const totalDailyPizzaCount = await ProductionData.findAll({
    where: {
      UTCDate: {
        [Op.gte]: DateTime.utc().minus({days: 1}).toMillis()
      },
      PizzaType: {
        [Op.ne]: 'Dry Cycle'
      }
    },
    attributes: [[prodDatabase.sequelize.fn('COUNT', 'Idx'), 'TotalQty']],
  })
  const totalPizzaCount = await ProductionData.findAll({
    where: {
      PizzaType: {
        [Op.ne]: 'Dry Cycle'
      }
    },
    attributes: [[prodDatabase.sequelize.fn('COUNT', 'Idx'), 'TotalQty']],
  })
  const dryCycleCount = await ProductionData.findAll({
    where: {
      PizzaType: {
        [Op.eq]: 'Dry Cycle'
      }
    },
    attributes: [[prodDatabase.sequelize.fn('COUNT', 'Idx'), 'TotalQty']],
  })

  // reduce this manually to avoid extremely complicated sequelize queries from legacy node-red app
  const pizzaByHour = (await ProductionData.findAll({
    where: {
      PizzaType: {
        [Op.ne]: 'Dry Cycle'
      }
    },
    attributes: [
      'UTCDate'
    ]
  })).reduce((acc, next) => {
    const hour = DateTime.fromMillis(next.UTCDate).hour
    const dateIndex = acc.findIndex((item) => {
      if (item.Hr === hour) {
        return true
      } else {
        return false
      }
    })

    if (dateIndex >= 0) {
      acc[dateIndex].Qty++
      return acc
    } else {
      return [
        ...acc,
        {
          Hr: hour,
          Qty: 1
        }
      ]
    }
  }, [])

  const pizzaLastHour = await ProductionData.findAll({
    where: {
      PizzaType: {
        [Op.eq]: 'Dry Cycle'
      },
      UTCDate: {
        [Op.gte]: DateTime.utc().minus({ hours: 1 }).toMillis()
      }
    }
  })

  const lastCycle = await ProductionData.findAll({
    limit: 1,
    attributes: ['SauceTime', 'ChzTime', 'ChzWeight', 'PepTime', 'IndexTime'],
    order: [ [ 'UTCDate', 'DESC' ]]
  })

  return [
    pizzaCountByTypes,
    totalDailyPizzaCount,
    totalPizzaCount,
    dryCycleCount,
    pizzaByHour,
    pizzaLastHour,
    lastCycle
  ];
}

export const getCleaningData = async (dateOrder: string) => {
  const cleaningData = await CleaningHistory.findAll({
    limit: 1,
    order: [ [ 'UTCDate', dateOrder ]]
  })
  return cleaningData;
}

export const addCleaningData = async (cleaningZone: string) => {
  await CleaningHistory.create({
    LastUpdatedUTC: DateTime.utc().toMillis(),
    TimeZoneOffset: config.getTimezone(),
    CleaningZone: cleaningZone
  })
}

export const createLifetimeHistory = async (attribute: string, value: any) => {
  await LifetimeHistory.create({
    LastUpdatedUTC: DateTime.utc().toMillis(),
    TimeZoneOffset: config.getTimezone(),
    Attribute: attribute,
    Value: value,
    MIKESerialNum: config.getSerialNumber()
  })
}

export const findOneLifetimeHistoryByAttribute = async (attribute: string) => {
  return await LifetimeHistory.findOne({ where: {
    Attribute: attribute
  }})
}

export const aggregateCheeseTrendData = async () => {
  // TODO: refactor sqlite schema to allow for non-raw inner join
  // currently, sequelize will throw an error because CheeseTrend and ProductionData are not formally associated
  const theSQL = "SELECT * FROM (SELECT * FROM CheeseTrend " +
  "INNER JOIN ProductionData on " +
  "ProductionData.UTCDate = CheeseTrend.UTCDate) " +
  "WHERE " +
  "UTCDate <= (SELECT MAX(UTCDate) FROM CheeseTrend) AND " +
  "UTCDate >= (SELECT (MAX(UTCDate)- 30) FROM CheeseTrend)";

  return await prodDatabase.database.query(theSQL)
}

export const getTodaysPeppPizzaCount = async () => {
  return await ProductionData.findAll({
    where: {
      UTCDate: {
        [Op.gte]: DateTime.utc().minus({days: 1}).toMillis()
      },
      PizzaType: {
        [Op.ne]: 'Dry Cycle'
      }
    },
    attributes: [[prodDatabase.sequelize.fn('COUNT', 'PizzaType'), 'Qty']],
    group: 'PizzaType'
  })
}

export const getDryCycleCount = async () => {
  return await ProductionData.findAll({
    where: {
      PizzaType: {
        [Op.eq]: 'Dry Cycle'
      }
    },
    attributes: [[prodDatabase.sequelize.fn('COUNT', 'PizzaType'), 'Qty']]
  })
}

export const saveProductionData = async (
  timestamp: number,
  timezone: number,
  prodData: plcnext.PizzaData
) => {
  await ProductionData.create({
    UTCDate: timestamp,
    TimeZoneOffset: timezone,
    PizzaType: prodData.PizzaType,
    SauceTime: prodData.SauceTime,
    ChzTime: prodData.ChzTime,
    PepTime: prodData.PeppTime,
    IndexTime: prodData.IdxTime,
    ChzWeight: prodData.ChzWght
  })

  return CheeseTrend.create({
    UTCDate: timestamp,
    TimeZoneOffset: timezone,
    Weight: prodData.ChzWght,
    PrefillDropWeight: prodData.DropChzWght,
    PrefillTime: prodData.PrefillTime
  })
}

export const saveMachineFaults = async (
  timestamp: number,
  timezone: number,
  faultCode: string,
  description: string
) => {
  return Faults.create({
    UTCDate: timestamp,
    TimeZoneOffset: timezone,
    FaultCode: faultCode,
    Description: description
  })
}
