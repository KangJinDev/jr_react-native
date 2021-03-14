import React from 'react';
import PropTypes from 'prop-types';
import {CircularProgress, Grid} from '@material-ui/core';

import {useStyles} from './styles';

const LoadingSpinner = (props) => {
    const {fullHeight} = props;
    const classes = useStyles({fullHeight});

    return (
        <Grid container alignItems="center" justify="center" className={classes.container}>
            <CircularProgress disableShrink />
        </Grid>
    );
};

LoadingSpinner.propTypes = {
    fullHeight: PropTypes.bool,
}

LoadingSpinner.defaultProps = {
    fullHeight: false,
}


export default LoadingSpinner;
