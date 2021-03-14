import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import Keyboard from "react-simple-keyboard";
import OutsideClickHandler from "react-outside-click-handler";
import { ArrowDownward } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";

import "react-simple-keyboard/build/css/index.css";

import { useStyles } from "./styles";

const TouchKeyboard = (props) => {
  const { value, onChange, hideKeyboard, onKeyPress } = props;
  const classes = useStyles();

  const [layout, setLayout] = useState("default");
  const keyboard = useRef();

  useEffect(() => {
    if (keyboard) {
      keyboard.current.setInput(value);
    }
  }, [value]);

  const handleChange = (input) => {
    onChange(input);
  };

  const handleShift = () => {
    const newLayoutName = layout === "default" ? "shift" : "default";
    setLayout(newLayoutName);
  };

  const handleKeyPress = (button) => {
    if (layout === "shift") {
      setLayout("default");
    }
    if (button === "{shift}" || button === "{lock}") {
      handleShift();
    }

    onKeyPress(button);
  };

  return (
    <OutsideClickHandler onOutsideClick={hideKeyboard}>
      <div className={classes.container}>
        <IconButton className={classes.closeButton} onClick={hideKeyboard}>
          <ArrowDownward />
        </IconButton>
        <Keyboard
          keyboardRef={(r) => (keyboard.current = r)}
          layoutName={layout}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />
      </div>
    </OutsideClickHandler>
  );
};

TouchKeyboard.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func,
  hideKeyboard: PropTypes.func,
  onKeyPress: PropTypes.func,
};

TouchKeyboard.defaultProps = {
  value: "",
  onChange: () => {},
  hideKeyboard: () => {},
  onKeyPress: () => {},
};

export default TouchKeyboard;
