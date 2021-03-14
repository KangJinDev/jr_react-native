import * as wifi from "../services/wifi";
import { uniq } from "lodash"
import * as plcNext from "../../plcnext";

export const setWiFiCredentials = (req, res) => {
  wifi
    .connect(req.body.ssid, req.body.psk)
    .then((data) => {
      plcNext.setWifiConnected(true)
      res.json({
        success: true,
        data: data.data,
      });
    })
    .catch((error) => {
      plcNext.setWifiConnected(false)
      res.status(500).send({ message: error.message });
    });
};

export const getWiFiConnectStatus = (req, res) => {
  wifi
    .status()
    .then((data) => {
      res.json({
        success: true,
        data: data.data,
      });
    })
    .catch((error) => {
      res.status(500).send({ message: error.message });
    });
};

export const getWiFiNetworks = (req, res) => {
  wifi
    .scan()
    .then((data) => {
      const sortedList = uniq(data.data.filter((i) => !!i).sort());
      res.json({
        success: true,
        data: sortedList,
      });
    })
    .catch((error) => {
      res.status(500).send({ message: error.message });
    });
};

export const mockSetWiFiCredentials = (req, res) => {
  setTimeout(() => {
    res.json({
      success: true,
    });
  }, 10000);
};

export const mockGetWiFiConnectStatus = (req, res) => {
  setTimeout(() => {
    res.json({
      success: true,
      data: {
        ieee: "802.11AC",
        ssid: "Test-Connected-Device",
        linkQuality: "87/100",
        signalLevel: "41/100",
        noiseLevel: "0/100",
      },
    });
  }, 2000);
};

export const mockGetWiFiNetworks = (req, res) => {
  const data = [
    "EA6900SET5-guest",
    "Linksys077803-5GHz",
    "TestNetwork-123",
    "Test 5GHz",
    "EA6900SET5-se32",
    "EA6900SET5-team",
    "Wifi-DV-1",
    "WWifi-DV-2",
    "Wifi-DV-3",
  ];

  setTimeout(() => {
    res.json({
      success: true,
      data,
    });
  }, 2000);
};
