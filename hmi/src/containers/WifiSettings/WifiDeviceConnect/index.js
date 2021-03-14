import React, { useState } from "react";
import { Link, Redirect, useRouteMatch } from "react-router-dom";
import { useMutation } from "react-query";
import { Grid, IconButton, Paper, Typography, Button } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";

import PasswordInput from "../../../components/common/PasswordInput";
import { connectWifi } from "../../../services/wifi.service";
import CustomDialog from "../../../components/common/CustomDialog";

import wifiGif from "../../assets/wifi.gif";
import { useStyles } from "./styles";

const WifiDeviceConnect = ({ history }) => {
  const classes = useStyles();
  const match = useRouteMatch();
  const { deviceId } = match.params;
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

  const [gotoList, setGotoList] = useState(false);
  if (!isLoading && connectData?.data?.success) {
    setTimeout(() => {
      setGotoList(true);
    }, 1000);
  }

  if (gotoList) {
    return <Redirect to="/wifi/devices" />;
  }

  return (
    <div className={classes.container}>
      <Grid container direction="row" alignItems="center">
        <Link to="/wifi/devices" className={classes.backButton}>
          <IconButton color="inherit">
            <ArrowBack />
          </IconButton>
        </Link>
        <Typography variant="h6" className={classes.subTitle}>
          Enter Wi-Fi Password
        </Typography>
      </Grid>
      <Paper elevation={0} className={classes.content}>
        <Typography>{deviceId}</Typography>
        <div className={classes.password}>
          <PasswordInput onChange={handleChangePassword} />
        </div>
        <Button
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
        showActionBar={false}
        handleOpen={setOpenConnectModal}
        title={
          <Typography className={classes.connectTitle} color="inherit">
            {connected ? "Connected" : "Connecting"} to <br />
            <strong>{deviceId}</strong>
          </Typography>
        }
      >
        <div className={classes.connectContent}>
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

export default WifiDeviceConnect;
