require('dotenv').config()
const http = require('http')
const url = process.env.WIFI_CONFIG_REST_SERVER_URL
const port = process.env.WIFI_CONFIG_REST_SERVER_PORT

export interface WiFiStatus {
    ieee: string,
    ssid: string,
    linkQuality: string,
    signalLevel: string,
    noiseLevel: string
}

export interface WiFiSuccess {
    success: boolean
}

export const scan = (): Promise<string[]> => {
    return new Promise<string[]>((resolve, reject) => {
        http.get(`${url}:${port}/scan`, (req) => {
            req.on('data', (data) => {
                data = JSON.parse(data) as string[]
                console.log(data)
                resolve(data)
            })
        }).on("error", (err) => {
            console.log("Error: " + err.message);
            reject(err)
        })
    })
}

export const status = (): Promise<WiFiStatus> => {
    return new Promise<WiFiStatus>((resolve, reject) => {
        http.get(`${url}:${port}/status`, (req) => {
            req.on('data', (data) => {
                data = JSON.parse(data) as WiFiStatus
                console.log(data)
                resolve(data)
            })
        }).on("error", (err) => {
            console.log("Error: " + err.message);
            // If there is an error, log the error and return a default value
            resolve({
              ieee: 'NA',
              ssid: 'NA',
              linkQuality: '0/0',
              signalLevel: '0/0',
              noiseLevel: '0/0'
            })
        })
    })
}

export const connect = (ssid: string, psk: string): Promise<WiFiSuccess> => {
    return new Promise<WiFiSuccess>((resolve, reject) => {
        http.get(`${url}:${port}/connect?ssid=${ssid}&psk=${psk}`, (req) => {
            req.on('data', (data) => {
                data = JSON.parse(data) as WiFiSuccess
                console.log(data)
                resolve(data)
            })
        }).on("error", (err) => {
            console.log("Error: " + err.message);
            reject(err)
        })
    })
}
