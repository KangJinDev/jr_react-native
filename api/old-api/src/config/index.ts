const nconf = require('nconf')
const configFile = "./config/config.json"

nconf.use('file', { file: configFile })
nconf.load()

const configVersionKey = "ConfigVersion"
const serialNumberKey = "MikeSerialNum"
const timezoneKey = "Timezone"
const messageTypeKey = "messageType"
const locationNumberKey = "locationNumber"
const franchiseNumberKey = "franchiseNumber"
const storeNumberKey = "storeNumber"
const storeIdKey = "storeId"
const portalIdKey = "portalId"
const cvPathKey = "CVPath"

export const getAllConfigs = nconf.get()

// ConfigVersion

export const getConfigVersion = (): string => {
    return getConfig(configVersionKey) as string
}

export const setConfigVersion = (version: string) => {
    setConfig(configVersionKey, version)
}

// MikeSerialNum

export const getSerialNumber = (): string => {
    return getConfig(serialNumberKey) as string
}

export const setSerialNumber = (serialNumber: string) => {
    setConfig(serialNumberKey, serialNumber)
}

// Timezone

export const getTimezone = (): string => {
    return getConfig(timezoneKey) as string
}

export const setTimezone = (timezone: string) => {
    setConfig(timezoneKey, timezone)
}

// messageType

export const getMessageType = (): string => {
    return getConfig(messageTypeKey) as string
}

export const setMessageType = (messageType: string) => {
    setConfig(messageTypeKey, messageType)
}

// locationNumber

export const getLocationNumber = (): number => {
    return getConfig(locationNumberKey) as number
}

export const setLocationNumber = (locationNumber: string) => {
    setConfig(locationNumberKey, locationNumber)
}

// franchiseNumber

export const getFranchiseNumber = (): number => {
    return getConfig(franchiseNumberKey) as number
}

export const setFranchiseNumber = (franchiseNumber: number) => {
    setConfig(franchiseNumberKey, franchiseNumber)
}

// storeNumber

export const getStoreNumber = (): number => {
    return getConfig(storeNumberKey) as number
}

export const setStoreNumber = (storeNumber: number) => {
    setConfig(storeNumberKey, storeNumber)
}

// storeId

export const getStoreId = (): number => {
    return getConfig(storeIdKey) as number
}

export const setStoreId = (storeId: number) => {
    setConfig(storeIdKey, storeId)
}

// portalId

export const getPortalId = (): number => {
    return getConfig(portalIdKey) as number
}

export const setPortalId = (portalId: number) => {
    setConfig(portalIdKey, portalId)
}

// CVPath

export const getCVPath = (): string => {
    return getConfig(cvPathKey) as string
}

export const setCVPath = (version: string) => {
    setConfig(cvPathKey, version)
}

// Helper functions

function getConfig (property: string): any  {
    return nconf.get(property)
}

function setConfig(property: string, value: any) {
    nconf.set(property, value)

    nconf.save(function (err) {
        if (err) {
            console.error(err.message)
            return
        }
        console.log('Configs saved successfully')
    });
}
