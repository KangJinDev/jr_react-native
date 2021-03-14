import React, { useEffect, useState } from "react";
import { Button, Typography } from "@material-ui/core";

import { useMutation, useQuery } from "react-query";

import { useStyles } from "./styles";
import AppHeader from "../../components/layout/header";
import CustomInput from "../../components/common/CustomInput";
import { configureApp, getAppConfig } from "../../services/app.service";
import AppQueryTypes from "../../utils/query-type/app";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import CustomDialog from "../../components/common/CustomDialog";

const ConfigurationScreen = () => {
  const classes = useStyles();
  const {
    mutate: config,
    isLoading: configLoading,
    data: configRes,
  } = useMutation(({ data }) => configureApp(data));

  const { isFetching, data: appConfig } = useQuery(
    AppQueryTypes.APP_CONFIG,
    getAppConfig
  );
  const configData = appConfig?.data;

  const [state, setState] = useState({
    ConfigVersion: "",
    MikeSerialNum: "",
    Timezone: "",
    locationNumber: 0,
    franchiseNumber: 0,
    portalId: 0,
    plcnextPassword: "",
    dataRetentionDays: 0,
  });

  useEffect(() => {
    if (configData) {
      setState(configData);
    }
  }, [configData]);

  console.log("configRes -  -- - -- -", configRes);

  const [successModal, setSuccessModal] = useState(false);
  useEffect(() => {
    if (configRes && configRes?.data?.success) {
      setSuccessModal(true);
    }
  }, [configRes]);

  const handleSubmit = (e) => {
    if (e) {
      e.preventDefault();
    }
    config({ data: state });
  };

  const handleChangeField = (e) => {
    setState({
      ...state,
      [e.field]: e.value,
    });
  };

  return (
    <div className={classes.container}>
      {(isFetching || configLoading || !configData) && (
        <LoadingSpinner fullHeight />
      )}
      <AppHeader title="Configuration" />
      {configData && (
        <form
          onSubmit={handleSubmit}
          autoComplete="off"
          className={classes.form}
        >
          <div className={classes.formContent}>
            <div className={classes.formFields}>
              <CustomInput
                defaultValue={configData.ConfigVersion}
                name="ConfigVersion"
                label="Config version"
                onChange={handleChangeField}
              />
              <CustomInput
                defaultValue={configData.MikeSerialNum}
                name="MikeSerialNum"
                label="Mike Serial number"
                onChange={handleChangeField}
              />
              <CustomInput
                defaultValue={parseInt(`${configData.Timezone}`)}
                name="Timezone"
                label="Timezone Offset"
                type="number"
                onChange={handleChangeField}
              />
            </div>
            <div className={classes.formFields}>
              <CustomInput
                defaultValue={configData.locationNumber}
                name="locationNumber"
                label="Location number"
                type="number"
                onChange={handleChangeField}
              />
              <CustomInput
                defaultValue={configData.franchiseNumber}
                name="franchiseNumber"
                label="Franchise number"
                type="number"
                onChange={handleChangeField}
              />
              <CustomInput
                defaultValue={configData.portalId}
                name="portalId"
                label="Portal ID"
                type="number"
                onChange={handleChangeField}
              />
            </div>
            <div className={classes.formLastFields}>
              <CustomInput
                className={classes.field}
                defaultValue={configData.plcnextPassword}
                name="plcnextPassword"
                label="PLCnext Password"
                onChange={handleChangeField}
              />
              <CustomInput
                defaultValue={configData.dataRetentionDays}
                name="dataRetentionDays"
                label="Data retention days"
                type="number"
                onChange={handleChangeField}
              />
            </div>
          </div>
          <div className={classes.formActions}>
            <Button
              className={classes.submitBtn}
              onSubmit={handleSubmit}
              type="submit"
              variant="contained"
              color="primary"
            >
              Submit
            </Button>
          </div>
        </form>
      )}
      <CustomDialog
        open={successModal}
        showActionBar={true}
        handleOpen={setSuccessModal}
        title={
          <Typography className={classes.connectTitle} color="inherit">
            Configuration
          </Typography>
        }
        okButton="OK"
        cancelButton={false}
      >
        <Typography className={classes.connectMsg} variant="h2" color="primary">
          Success
        </Typography>
      </CustomDialog>
    </div>
  );
};

export default ConfigurationScreen;
