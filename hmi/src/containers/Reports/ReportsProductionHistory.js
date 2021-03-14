import React, {useEffect} from 'react';
import {Typography} from '@material-ui/core';
import {useQuery} from 'react-query';
import Pagination from '@material-ui/lab/Pagination';
import * as moment from "moment";

import CustomTable from '../../components/common/CustomTable';
import LoadingSpinner from '../../components/common/LoadingSpinner';

import {useStyles} from './styles';
import ProductionDataQueryTypes from '../../utils/query-type/production-data';
import {getProductionData} from '../../services/production-data.service';

let currentPage = 0;
const ReportsProductionHistory = () => {
    const classes = useStyles();

    useEffect(() => {
        currentPage = 0;
    }, []);

    const {
        isFetching,
        data: productionData,
        refetch,
    } = useQuery(
        ProductionDataQueryTypes.PRODUCTION_DATA_LIST,
        () => getProductionData({currentPage, pageSize: 50})
    );

    const handleChangePagination = (e, page) => {
        currentPage = page - 1;
        refetch();
    };

    const data = productionData ? productionData?.data?.data || [] : [];
    const totalCount = productionData ? productionData?.data?.total || 0 : 0;
    const sortedData = data.sort((a, b) => new Date(b.Date) - new Date(a.Date));

    const columns = sortedData.length > 0 ? Object.keys(sortedData[0]).map((key) => ({
        title: key,
        key: key,
        render: key === 'Date' ? (date) => {
            return moment(date).utc().format('YYYY-MM-DD')
        } : false,
    })) : [];

    if (isFetching) {
        return <LoadingSpinner/>;
    }

    const pageCount = Math.ceil(totalCount / 50);

    return (
        <div className={classes.subContent}>
            <Typography className={classes.subTitle}>Production History</Typography>
            <CustomTable columns={columns} data={sortedData}/>
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

export default ReportsProductionHistory;
