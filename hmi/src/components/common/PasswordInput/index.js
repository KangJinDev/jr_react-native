import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {
    IconButton,
    InputAdornment,
    Input,
    InputLabel, FormControl,
} from '@material-ui/core';
import {Visibility, VisibilityOff} from '@material-ui/icons';

import TouchKeyboard from '../Keyboard';

const PasswordInput = (props) => {
    const {onChange} = props;
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = (e) => {
        e.stopPropagation();
        setShowPassword(!showPassword);
    }

    const [value, setValue] = useState('');
    const handleChange = (e) => {
        setValue(e.target.value);
        onChange(e.target.value);
    }

    const handleChangeKeyboard = (input) => {
        setValue(input);
        onChange(input);
    }

    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    }

    const [showKeyboard, setShowKeyboard] = useState(false);
    const handleFocus = (e) => {
        setShowKeyboard(true);
    }

    const hideKeyboard = () => {
        setShowKeyboard(false);
    }

    const onKeyPress = (key) => {
        if (key === '{enter}') {
            onChange({value: null, field: null, submit: true});
        }
    }

    return (
        <div>
            <FormControl>
                <InputLabel htmlFor="input-password">Password</InputLabel>
                <Input
                    id="input-password"
                    type={showPassword ? 'text' : 'password'}
                    value={value}
                    onChange={handleChange}
                    onClick={handleFocus}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>
            {showKeyboard && (
                <TouchKeyboard hideKeyboard={hideKeyboard} value={value} onChange={handleChangeKeyboard} onKeyPress={onKeyPress}/>
            )}
        </div>
    );
};

PasswordInput.propTypes = {
    onChange: PropTypes.func,
};

PasswordInput.defaultProps = {
    onChange: () => {},
};

export default PasswordInput;
