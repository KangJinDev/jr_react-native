import React from 'react';
import {Redirect} from 'react-router-dom';
import {useQuery} from 'react-query';

import {getAppStatus} from '../../services/app.service';
import AppQueryTypes from '../../utils/query-type/app';

import Splash from '../../components/layout/splash';
import config from '../../config'
import {useStyles} from './styles';

const SplashScreen = () => {
    const classes = useStyles();
    const {isLoading, error, refetch, data: statusData} = useQuery(AppQueryTypes.APP_STATUS, getAppStatus);

    if (!isLoading && statusData && statusData.data && statusData.data.success) {
        if (config.env === "development") {
            return <Redirect to={`/reports`} />;
        } else if(typeof window !== 'undefined') {
            window.location.href = config.plcnextEhmiUrl
        }
    }

    if (error || (!isLoading && !statusData?.data?.success)) {
        refetch();
    }

    return (
        <div className={classes.container}>
            <Splash />
        </div>
    );
}

export default SplashScreen;
