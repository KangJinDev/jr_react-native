import React from 'react';
import {Typography} from '@material-ui/core';

import CustomTable from '../../components/common/CustomTable';

import {useStyles} from './styles';

const ReportsTemperatureHistory = (props) => {
    const classes = useStyles();

    const data = Array(20).fill(0).map((_, index) => ({
        date: '02/12/2021',
        time: '10:00 AM',
        temperature: '35°F',
    }));

    const columns = [
        {title: 'Date', key: 'date'},
        {title: 'Time', key: 'time'},
        {title: 'Temperature', key: 'temperature'},
        {title: 'LAST EVENT: 02/12/2021', key: 'count'},
    ];

    return (
        <div className={classes.subContent}>
            <Typography className={classes.subTitle}>Temperature History</Typography>
            <CustomTable columns={columns} data={data} />
        </div>
    );
}

export default ReportsTemperatureHistory;
