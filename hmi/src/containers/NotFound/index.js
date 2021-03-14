import React from 'react';
import PropTypes from 'prop-types';
import {Fab} from '@material-ui/core';
import {Home as HomeIcon} from '@material-ui/icons';

import {useStyles} from './styles';

const NotFound = ({ history }) => {
    const classes = useStyles();

    const backToHome = () => {
        history.push('/');
    };

    return (
        <div className={classes.container}>
            <Fab
                variant="extended"
                size="medium"
                className={classes.link}
                onClick={backToHome}
            >
                <HomeIcon className={classes.extendedIcon} />
                Back to home
            </Fab>
        </div>
    );
}

NotFound.propTypes = {
    history: PropTypes.object.isRequired,
};

export default NotFound;
