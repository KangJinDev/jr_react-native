import React, { useState, useEffect } from "react";
import { Button, Paper, Typography } from "@material-ui/core";
import { useMutation, useQuery } from "react-query";

import WifiConnectedDevice from "./WifiConnectedDevice";
import { getWifiStatus, connectWifi } from "../../../services/wifi.service";
import LoadingSpinner from "../../../components/common/LoadingSpinner";
import WifiQueryTypes from "../../../utils/query-type/wifi";
import PasswordInput from "../../../components/common/PasswordInput";
import CustomDialog from "../../../components/common/CustomDialog";
import CustomInput from "../../../components/common/CustomInput";
import wifiGif from "../../assets/wifi.gif";

import { useStyles } from "./styles";

const WifiDevices = (props) => {
  const classes = useStyles();
  const { isLoading: statusLoading, data: statusData } = useQuery(
    WifiQueryTypes.WIFI_STATUS,
    getWifiStatus
  );
  const status = statusData ? statusData.data : null;

  const [deviceId, setDeviceId] = useState(null);
  const [deviceIdFlag, setDeviceIdFlag] = useState(null);
  const handleChangeDeviceId = (e) => {
    setDeviceId(e.value);
  };

  const {
    mutate: connectDevice,
    isLoading,
    data: connectData,
  } = useMutation(({ ssid, psk }) => connectWifi(ssid, psk));
  const connected = !isLoading && connectData?.data?.success;

  const [password, setPassword] = useState("");

  const [openConnectModal, setOpenConnectModal] = useState(false);
  const handleConnect = () => {
    connectDevice({ ssid: deviceId, psk: password });
    setOpenConnectModal(true);
  };

  const handleChangePassword = (value) => {
    if (!!value.submit) {
      handleConnect();
      return;
    }
    setPassword(value);
  };

  useEffect(() => {
    if (connected) {
      setDeviceIdFlag(deviceId);

      // TODO
      // refetch();
    }
  }, [connected, deviceId]);

  if (statusLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className={classes.container}>
      {status && status.ssid && (
        <div className={classes.connectedContent}>
          <Typography variant="h6" className={classes.subTitle}>
            My network
          </Typography>
          <WifiConnectedDevice data={status} ssid={deviceIdFlag} />
        </div>
      )}
      <Paper elevation={0} className={classes.content}>
        <div className={classes.inputContent}>
          <div className={classes.input}>
            <CustomInput
              defaultValue=""
              name="deviceId"
              label="SSID"
              onChange={(e) => handleChangeDeviceId(e)}
            />
          </div>
          <div className={classes.input}>
            <PasswordInput onChange={handleChangePassword} />
          </div>
        </div>
        <Button
          className={classes.submitBtn}
          variant="contained"
          color="primary"
          disabled={!password}
          onClick={handleConnect}
        >
          Connect
        </Button>
      </Paper>
      <CustomDialog
        open={openConnectModal}
        showActionBar={connected ? true : false}
        okButton={"Ok"}
        cancelButton={false}
        handleOpen={setOpenConnectModal}
        title={
          <Typography className={classes.connectTitle} color="inherit">
            {connected ? "Connected" : "Connecting"} to <br />
            <strong>{deviceId}</strong>
          </Typography>
        }
      >
        <div
          className={
            connected ? classes.connectMSGContent : classes.connectContent
          }
        >
          {isLoading ? (
            <img
              className={classes.image}
              src={wifiGif}
              alt="wifi connecting"
            />
          ) : (
            <Typography
              className={classes.connectMsg}
              variant="h2"
              color={connected ? "primary" : "error"}
            >
              {connected ? "Success" : "Failed"}
            </Typography>
          )}
        </div>
      </CustomDialog>
    </div>
  );
};

export default WifiDevices;
