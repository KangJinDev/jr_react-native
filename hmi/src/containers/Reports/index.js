import React from 'react';
import {Redirect, Route, Switch, useRouteMatch} from 'react-router-dom';
import {Grid} from '@material-ui/core';

import AppHeader from '../../components/layout/header';
import ReportsSidebar from './ReportsSidebar';
import ReportsProductionHistory from './ReportsProductionHistory';
import ReportsCleaningHistory from './ReportsCleaningHistory';
import ReportsBladeHistory from './ReportsBladeHistory';
import ReportsAlarmHistory from './ReportsAlarmHistory';
import ReportsBrowserDebug from './ReportsBrowserDebug';
import ReportsCheeseTrend from './ReportsCheeseTrend';

import {useStyles} from './styles';

const Reports = (props) => {
    const classes = useStyles();
    const match = useRouteMatch();

    return (
        <div className={classes.container}>
            <AppHeader title="Reports" />
            <Grid container className={classes.content}>
                <ReportsSidebar />
                <Switch>
                    <Redirect exact from={match.path} to={`${match.path}/production-history`}/>

                    <Route path={`${match.path}/production-history`}>
                        <ReportsProductionHistory {...props} />
                    </Route>

                    <Route path={`${match.path}/cleaning-history`}>
                        <ReportsCleaningHistory {...props} />
                    </Route>

                    <Route path={`${match.path}/blade-history`}>
                        <ReportsBladeHistory {...props} />
                    </Route>

                    <Route path={`${match.path}/alarm-history`}>
                        <ReportsAlarmHistory {...props} />
                    </Route>

                    <Route path={`${match.path}/debug`}>
                        <ReportsBrowserDebug {...props} />
                    </Route>

                    <Route path={`${match.path}/cheese-trend`}>
                        <ReportsCheeseTrend {...props} />
                    </Route>
                </Switch>
            </Grid>
        </div>
    );
}

export default Reports;
