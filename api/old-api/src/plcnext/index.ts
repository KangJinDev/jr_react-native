import fetch from 'node-fetch'
import https from 'https'
import { URLSearchParams } from "url"

// Bypass SSL issues with self-signed cert on PLCnext
const agent = new https.Agent({ rejectUnauthorized: false })

const baseUrl = 'https://192.168.1.10/_pxc_api/api'
const variablesPath = '/variables'
const pathPrefix = 'Arp.Plc.Eclr/'

const faultedVar = 'HMI_NR_MachineFaulted'
const faultAckVar = 'HMI_NR_MachineFaultedAck'
const pizzaDataVar = 'PizzaData'
const alarmsCriticalVar = 'AlarmsCritical'

// PLCnext REST verbs:
// GET: get variables
// POST: get variables
// PUT: set variables as constants or variable

// Example query params:
//    ?pathPrefix=Arp.Plc.Eclr/
//    & paths=PizzaData” or “& paths=HMI_NR_MachineFaulted, HMI_NR_MachineFaultedAck”)

// Example body of setting constant:
// {
//     "pathPrefix": "Arp.Plc.Eclr/",
//     "variables": [
//         {
//             "path": flow.get("name") + '.OnPB',
//             "value": false,
//             "valueType": "Constant"
//         }
//     ]
// }

interface PlcnextVarValue {
    "apiVersion": string,
    "projectCRC": number,
    "userAuthenticationRequired": boolean,
    variables: [
        {
            path: string,
            value: any
        }
    ]
}

export interface PizzaData {
    New: boolean,
    ChzWght: number,
    DropChzWght: number,
    PrefillTime: number,
    SauceTime: number,
    ChzTime: number,
    PeppTime: number,
    IdxTime: number,
    PizzaType: string
}

export interface AlarmData {
    NoAlarms: boolean,
    Reset: boolean,
    Messages: number[],
    name: string
}

export const getVariables = async (vars: string[]): Promise<any> => {
    const params = {
        pathPrefix: pathPrefix,
        paths: vars.join(',')
    }
    const query = Object.keys(params).map((key) => {
        return `${key}=${params[key]}`
    }).join('&')
    const options = {  method: 'GET', agent: agent }
    const response = await fetch(`${baseUrl}${variablesPath}?${query}`, options)
    const data = await response.json() as PlcnextVarValue

    const values = data.variables.map((item) => {
        const name = item.path.split("/")[1]
        if (typeof item.value === 'object' && !!item.value) {
            let value = item.value
            value['name'] = name
            return value
        } else {
            let value = {
                name: name,
                value: item.value
            }
            return value
        }
    })

    return { values: values }
}

/*
 * Sets "constants" to PLCnext variables
 */
export const setVariables = async (vars: [{ name: string, value: any }]): Promise<any> => {
    const variables = vars.map((item) => {
        return { path: item.name, value: item.value, valueType: "Constant" }
    })
    const response = await fetch(`${baseUrl}${variablesPath}`, {
        method: 'PUT',
        body: JSON.stringify({ pathPrefix: pathPrefix, variables: variables }),
        headers: {
            "Content-Type": "application/json"
        },
        agent: agent
    })

    var data
    if (response.ok) {
        data = await response.json()
    } else {
        data = await response.text()
    }
    return data.variables
}

// Specific variable calls

export const getFaults = async (): Promise<any> => {
    return (await getVariables([faultedVar, faultAckVar])).values
}

export const getAlarms = async (): Promise<[AlarmData]> => {
    return (await getVariables([alarmsCriticalVar])).values as [AlarmData]
}

export const ackFaults = async (): Promise<boolean> => {
    return await setVariables([{ name: faultAckVar, value: true }])
}

export const setPushButton = async (name: string, value: any): Promise<any> => {
    const data = await setVariables([{ name: name, value: value }])
    return data
}

export const getProductionData = async (): Promise<PizzaData>  => {
    return await getVariables([pizzaDataVar])
}
