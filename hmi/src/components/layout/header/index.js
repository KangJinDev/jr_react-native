import React from 'react';
import PropTypes from 'prop-types';
import {AppBar, Toolbar, IconButton} from '@material-ui/core';
import {Close} from '@material-ui/icons';

import {useStyles} from './styles';

const AppHeader = (props) => {
    const { title } = props;
    const classes = useStyles();

    const handleClickClose = () => {
        window.close();
    }

    return (
        <div className={classes.root}>
            <AppBar position="static" color="inherit" className={classes.container}>
                <Toolbar className={classes.toolbar}>
                    <IconButton className={classes.title} edge="start" color="inherit" aria-label="menu">
                        {title}
                    </IconButton>
                    <IconButton color="inherit" onClick={handleClickClose}>
                        <Close />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </div>
    );
}

AppHeader.propTypes = {
    title: PropTypes.node,
}

AppHeader.defaultProps = {
    title: '',
}

export default AppHeader;
