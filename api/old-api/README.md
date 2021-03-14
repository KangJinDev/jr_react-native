# WiFi Config Server
Lightweight REST and Websocket server for controlling WiFi on Linux-based OSes built on Node.js

## API

### REST

__Connect to WiFi Network__

REST endpoint:

`GET /connect?ssid=ssid&psk=psk`

Expected response:
```json
{ "success": true }
```

__WiFi Status__

REST endpoint:

`GET /status`

Expected response:
```json
{ "success": true }
```

__Scan WiFi Networks__

REST endpoint:

`GET /scan`

Expected response: { "success" true }
```json
[ "Network 1", "Network 2" ]
```

### Websocket

__Connect to WiFi Network__
Message type: connect

Example message:
```json
{
    "type": "connect",
    "data": {
        "ssid": "Network Name",
        "psk": "presharedkey"
    }
}
```

__WiFi Status__
Message type: status

Example message:
```json
{ "type": "status" }
```

Example responses:

```json
// Connected to WiFi network
{
    "success": true,
    "data": {
        "ieee":"802.11AC",
        "ssid":"Network name",
        "linkQuality":"87/100",
        "signalLevel":"41/100",
        "noiseLevel":"0/100"
    }
}

// Not connected to WiFi network
{
    "success": true,
    "data": {
        "ieee": null,
        "ssid": null,
        "linkQuality": null,
        "signalLevel": null,
        "noiseLevel": null
    }
}
```

__Scan WiFi Networks__
Message type: scan

Example message:
```json
{ "type": "scan" }
```

Example responses:

```json
{
    "success": true,
    "data": [ "Network 1", "Network 2" ]
}
```
