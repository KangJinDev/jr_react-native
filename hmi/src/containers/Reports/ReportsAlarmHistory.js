import React, {useEffect} from 'react';
import {useQuery} from 'react-query';
import * as moment from 'moment';
import {Typography} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';

import CustomTable from '../../components/common/CustomTable';
import LoadingSpinner from '../../components/common/LoadingSpinner';

import {useStyles} from './styles';
import {getMachineFaults} from '../../services/machine-fault.service';
import {getAppConfig} from '../../services/app.service';
import MachineFaultQueryTypes from '../../utils/query-type/machine-fault';
import AppQueryTypes from '../../utils/query-type/app';

let currentPage = 0;
const ReportsAlarmHistory = (props) => {
    const classes = useStyles();

    useEffect(() => {
        currentPage = 0;
    }, []);

    const {isFetching: isFetchingConfig, data: appConfig} = useQuery(AppQueryTypes.APP_CONFIG, getAppConfig);
    const configData = appConfig?.data;
    const offsetTime = configData && configData.Timezone ? configData.Timezone : '00:00';

    const {
        data: alarmHistories,
        isFetching,
        refetch,
    } = useQuery(
        MachineFaultQueryTypes.MACHINE_FAULT_LIST,
        () => getMachineFaults({currentPage, pageSize: 50})
    );

    const handleChangePagination = (e, page) => {
        currentPage = page - 1;
        refetch();
    };

    const data = alarmHistories ? alarmHistories?.data?.results || [] : [];
    const totalCount = alarmHistories ? alarmHistories?.data?.total || 0 : 0;
    const sortedData = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    const columns = [
        {
            title: 'Date',
            key: 'created_at',
            render: (date) => moment(date).utc().utcOffset(offsetTime).format(),
        },
        {title: 'Fault code', key: 'fault_code'},
        {title: 'Description', key: 'description'},
    ];

    if (isFetching || isFetchingConfig) {
        return <LoadingSpinner />;
    }

    const pageCount = Math.ceil(totalCount / 50);

    return (
        <div className={classes.subContent}>
            <Typography className={classes.subTitle}>Alarm History</Typography>
            <CustomTable columns={columns} data={sortedData} />
            {pageCount > 1 && (
                <Pagination
                    className={classes.pagination}
                    count={pageCount}
                    onChange={handleChangePagination}
                    disabled={isFetching}
                    page={currentPage + 1}
                />
            )}
        </div>
    );
};

export default ReportsAlarmHistory;
