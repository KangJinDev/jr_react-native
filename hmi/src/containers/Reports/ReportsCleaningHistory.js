import React, {useEffect} from 'react';
import {useQuery} from 'react-query';
import {Typography} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import * as moment from 'moment';

import CustomTable from '../../components/common/CustomTable';
import LoadingSpinner from '../../components/common/LoadingSpinner';

import {useStyles} from './styles';
import CleaningHistoryQueryTypes from '../../utils/query-type/cleaning-history';
import {getCleaningHistories} from '../../services/cleaning-history.service';
import AppQueryTypes from "../../utils/query-type/app";
import {getAppConfig} from '../../services/app.service';

let currentPage = 0;
const ReportsCleaningHistory = (props) => {
    const classes = useStyles();

    useEffect(() => {
        currentPage = 0;
    }, []);

    const {
        data: cleaningHistories,
        isFetching,
        refetch,
    } = useQuery(
        CleaningHistoryQueryTypes.CLEANING_HISTORY_LIST,
        () => getCleaningHistories({currentPage, pageSize: 50})
    );

    const {isFetching: isFetchingConfig, data: appConfig} = useQuery(AppQueryTypes.APP_CONFIG, getAppConfig);
    const configData = appConfig?.data;
    const offsetTime = configData && configData.Timezone ? configData.Timezone : '00:00';

    const handleChangePagination = (e, page) => {
        currentPage = page - 1;
        refetch();
    };

    const data = cleaningHistories ? cleaningHistories?.data?.results || [] : [];
    const totalCount = cleaningHistories ? cleaningHistories?.data?.total || 0 : 0;
    const sortedData = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    const latestDate = sortedData.length > 0 ? sortedData[0].created_at : '';

    const columns = [
        {
            title: 'Date',
            key: 'created_at',
            render: (date) => moment(date).utc().utcOffset(offsetTime).format(),
        },
        {title: 'Cleaning zone', key: 'cleaning_zone'},
    ];

    if (isFetching || isFetchingConfig) {
        return <LoadingSpinner />;
    }

    const pageCount = Math.ceil(totalCount / 50);

    return (
        <div className={classes.subContent}>
            <div className={classes.subTitleContainer}>
                <Typography className={classes.subTitle}>Cleaning History</Typography>
                <Typography className={classes.subTitle}>LAST EVENT: {latestDate}</Typography>
            </div>
            <CustomTable columns={columns} data={sortedData} />
            {totalCount > 50 && (
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

export default ReportsCleaningHistory;
