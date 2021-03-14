import React from 'react'
import PropTypes from 'prop-types';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HC_exporting from 'highcharts/modules/exporting';

HC_exporting(Highcharts);

const CheeseTrendChart = (props) => {
    const {trendData} = props;

    const sortedData = trendData.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

    const data = trendData.length > 0
        ? trendData.map((trd) => [new Date(trd.created_at).getTime(), trd.weight])
        : [];

    const latestDate = sortedData && sortedData.length > 0
        ? sortedData[sortedData.length - 1].created_at
        : '';

    const options = {
        chart: {
            type: 'column',
            height: 250,
        },
        credits: {
            enabled: false,
        },
        legend: {
            enabled: false,
        },
        title: {
            text: `Last event: ${latestDate}`,
            show: false,
            align: 'right',
        },
        exporting: {
            enabled: false,
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            },
        },
        xAxis: {
            type: 'datetime',
            title: {
                text: 'Time'
            },
            tickInterval: 12 * 3600 * 1000,
        },
        yAxis: {
            max: 10,
            title: {
                text: 'Weight (oz)'
            },
        },
        series: [{
            name: 'Weight',
            data: data,
        }]
    };

    return (
        <div>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
        </div>
    );
};

CheeseTrendChart.propTypes = {
    trendData: PropTypes.array,
};

CheeseTrendChart.defaultProps = {
    trendData: [],
};

export default CheeseTrendChart;
