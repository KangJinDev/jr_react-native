import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
  Paper,
} from "@material-ui/core";
import { InfoOutlined, Wifi, Check } from "@material-ui/icons";

import { useStyles } from "./styles";

const WifiConnectedDevice = (props) => {
  const { data } = props;
  const { ssid } = props;
  const classes = useStyles();

  const connectedItem = {
    value: ssid || data.ssid,
    label: ssid || data.ssid,
    action: (
      <div>
        <Check color="primary" className={classes.icon} />
        <Wifi className={classes.icon} />
        <InfoOutlined className={classes.icon} />
      </div>
    ),
  };

  const [showInfo, setShowInfo] = useState(false);
  const handleClickItem = () => {
    setShowInfo(!showInfo);
  };

  return (
    <div className={classes.connected}>
      <List>
        <ListItem button role={undefined} onClick={handleClickItem}>
          <ListItemText
            id={`label-${connectedItem.value}`}
            primary={<Typography>{connectedItem.label}</Typography>}
          />
          <ListItemSecondaryAction>
            {connectedItem.action}
          </ListItemSecondaryAction>
        </ListItem>
      </List>
      {showInfo && (
        <Paper variant="outlined" className={classes.connectedInfo}>
          {Object.keys(data).map((key) => (
            <Typography key={key}>
              <strong>{key}:</strong> {data[key]}
            </Typography>
          ))}
        </Paper>
      )}
    </div>
  );
};

WifiConnectedDevice.propTypes = {
  data: PropTypes.object.isRequired,
};

export default WifiConnectedDevice;
