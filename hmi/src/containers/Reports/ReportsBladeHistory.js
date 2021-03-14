import React, {useEffect} from 'react';
import {Typography} from '@material-ui/core';
import {useQuery} from 'react-query';
import {getBladeHistories} from '../../services/blade-history.service';
import Pagination from '@material-ui/lab/Pagination';
import * as moment from 'moment';

import CustomTable from '../../components/common/CustomTable';
import LoadingSpinner from '../../components/common/LoadingSpinner';

import {useStyles} from './styles';
import BladeHistoryQueryTypes from '../../utils/query-type/blade-history';
import AppQueryTypes from '../../utils/query-type/app';
import {getAppConfig} from '../../services/app.service';

let currentPage = 0;
const ReportsBladeHistory = (props) => {
    const classes = useStyles();

    useEffect(() => {
        currentPage = 0;
    }, []);

    const {
        data: bladeHistories,
        isFetching,
        refetch,
    } = useQuery(
        BladeHistoryQueryTypes.LIFE_TIME_HISTORY_LIST,
        () => getBladeHistories({currentPage, pageSize: 50})
    );

    const {isFetching: isFetchingConfig, data: appConfig} = useQuery(AppQueryTypes.APP_CONFIG, getAppConfig);
    const configData = appConfig?.data;
    const offsetTime = configData && configData.Timezone ? configData.Timezone : '00:00';

    const handleChangePagination = (e, page) => {
        currentPage = page - 1;
        refetch();
    };

    //Todo: Temp data - need to update after api fix
    const data = bladeHistories ? bladeHistories?.data?.results || [] : [];
    const totalCount = bladeHistories ? bladeHistories?.data?.total || 0 : 0;
    const sortedData = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    const columns = [
        {
            title: 'Blade Install Date',
            key: 'created_at',
            render: (date) => moment(date).utc().utcOffset(offsetTime).format(),
        },
        {title: 'Cut Count', key: 'value'},
    ];

    if (isFetching || isFetchingConfig) {
        return <LoadingSpinner />;
    }

    const pageCount = Math.ceil(totalCount / 50);

    return (
        <div className={classes.subContent}>
            <Typography className={classes.subTitle}>Blade History</Typography>
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

export default ReportsBladeHistory;
