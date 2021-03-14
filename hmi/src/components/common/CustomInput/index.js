import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { TextField } from "@material-ui/core";

import TouchKeyboard from "../Keyboard";

import { useStyles } from "./styles";

const CustomInput = (props) => {
  const { className, defaultValue, name, label, type, onChange } = props;
  const classes = useStyles();

  const fieldRef = useRef();

  const [value, setValue] = useState(defaultValue);
  useEffect(() => {
    if (defaultValue) {
      setValue(defaultValue);
    }
  }, [defaultValue]);

  const handleChange = (e) => {
    setValue(e.target.value);
    onChange({
      value:
        type === "number"
          ? parseInt(e.target.value.replace(/\D-/g, ""))
          : e.target.value,
      field: name,
    });
  };

  const handleChangeKeyboard = (input) => {
    setValue(type === "number" ? input.replace(/\D-/g, "") : input);
    onChange({
      value: type === "number" ? parseInt(input.replace(/\D-/g, "")) : input,
      field: name,
    });
  };

  const [showKeyboard, setShowKeyboard] = useState(false);
  const handleFocus = (e) => {
    setShowKeyboard(true);
  };

  const hideKeyboard = () => {
    setShowKeyboard(false);
  };

  const handleKeyPress = () => {
    if (fieldRef) {
      fieldRef.current.focus();
    }
  };

  return (
    <div className={className}>
      <TextField
        inputProps={{ className: classes.input }}
        inputRef={fieldRef}
        autoComplete="off"
        type={type}
        name={name}
        label={label}
        value={value}
        onChange={handleChange}
        onClick={handleFocus}
      />
      {showKeyboard && (
        <TouchKeyboard
          hideKeyboard={hideKeyboard}
          value={`${value}`}
          onChange={handleChangeKeyboard}
          onKeyPress={handleKeyPress}
        />
      )}
    </div>
  );
};

CustomInput.propTypes = {
  className: PropTypes.string,
  defaultValue: PropTypes.any,
  type: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
};

CustomInput.defaultProps = {
  className: null,
  defaultValue: null,
  type: "string",
  label: undefined,
  name: undefined,
  onChange: () => {},
};

export default CustomInput;
