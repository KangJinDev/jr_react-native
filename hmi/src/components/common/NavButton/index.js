import React, {useRef} from 'react';
import PropTypes from 'prop-types';
import {Button, withStyles} from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import {useStyles} from './styles';

const CustomButton = withStyles({
    outlined: {
        background: 'white',
    },
})(Button);

const NavButton = (props) => {
    const {className, url, title} = props;
    const history = useHistory();
    const classes = useStyles();
    const ref = useRef();

    const active = window.location.pathname === url;

    const handleClick = (e) => {
        e.stopPropagation();

        history.push(url);
    };

    return (
        <CustomButton
            variant={active ? 'outlined' : 'contained'}
            color="primary"
            className={className}
            onClick={handleClick}
        >
            <div className={active ? classes.active : classes.inactive} ref={ref}>
                {title}
            </div>
        </CustomButton>
    );
};

NavButton.propTypes = {
    url: PropTypes.string,
    title: PropTypes.string,
    className: PropTypes.string,
}

NavButton.defaultProps = {
    title: '',
    url: '/',
    className: null,
}

export default NavButton;
