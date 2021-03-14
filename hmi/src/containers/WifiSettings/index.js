import React from 'react';
import {Redirect, Route, Switch, useRouteMatch} from 'react-router-dom';

import AppHeader from '../../components/layout/header';
import WifiDevices from './WifiDevices';

import {useStyles} from './styles';

const WifiSettings = (props) => {
    const classes = useStyles();
    const match = useRouteMatch();

    return (
        <div className={classes.container}>
            <AppHeader title="Wi-Fi" />
            <Switch>
                <Redirect exact from={match.path} to={`${match.path}/devices`}/>

                <Route path={`${match.path}/devices`}>
                    <WifiDevices {...props} />
                </Route>
            </Switch>
        </div>
    );
}

export default WifiSettings;
