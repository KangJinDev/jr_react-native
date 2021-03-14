import React from "react";
import { Chip, Typography } from "@material-ui/core";
import { useQuery } from "react-query";

import LoadingSpinner from "../../../components/common/LoadingSpinner";

import { useStyles } from "../styles";
import CheeseTrendQueryTypes from "../../../utils/query-type/cheese-trend";
import { getCheeseTrends } from "../../../services/cheese-trend.service";
import CheeseTrendChart from "./CheeseTrendChart";
import moment from "moment";

const ReportsCheeseTrend = (props) => {
  const today = moment().locale("en").format("YYYY-MM-DD");
  const yesterdayDefault = new Date();
  yesterdayDefault.setDate(yesterdayDefault.getDate() - 1);
  const yesterday = moment(yesterdayDefault).locale("en").format("YYYY-MM-DD");

  const classes = useStyles();
  const { isLoading: listLoading, data: cheeseTrends } = useQuery(
    CheeseTrendQueryTypes.CHEESE_TREND_LIST,
    getCheeseTrends
  );

  const data = cheeseTrends ? cheeseTrends?.data || [] : [];

  const sortedData = data.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  const roundFloat = (value) => {
    if (!value) {
      return 0;
    }

    const num = Number(value);
    const roundedString = num.toFixed(3);
    return Number(roundedString);
  };

  const getDayAvgWeight = (day) => {
    return sortedData.find((item) => item.created_at === day);
  };
  const getAvgValue = (index) => {
    let allPrefillDropWeight = 0;
    sortedData.map((item) => {
      return (allPrefillDropWeight += roundFloat(item[index]));
    });
    return (allPrefillDropWeight / sortedData.length).toFixed(2);
  };

  const sideData = [
    {
      title: "Today's Avg Weight",
      value: getDayAvgWeight(today)?.weight || "--",
      unit: " oz",
    },
    {
      title: "Yesterday's Avg Weight",
      value: getDayAvgWeight(yesterday)?.weight || "--",
      unit: " oz",
    },
    {
      title: "30 Day Avg Prefill Drop Weight",
      value: getAvgValue("prefill_drop_weight") || "--",
      unit: " oz",
    },
    {
      title: "30 Day Avg Prefill Time",
      value: getAvgValue("prefill_time") || "--",
      unit: "s",
    },
    {
      title: "30 Day Avg Weight",
      value: getAvgValue("weight") || "--",
      unit: " oz",
    },
  ];

  if (listLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className={classes.subContent}>
      <Typography className={classes.subTitle}>
        Classic Pizza Cheese Trend
      </Typography>
      <CheeseTrendChart trendData={data} />
      {sideData && sideData.length > 0 && (
        <div className={classes.summary}>
          {sideData.map((item) => (
            <Chip
              className={classes.summaryItem}
              key={item.title}
              label={`${item.title}: ${item.value}${item.unit}`}
              variant="outlined"
              color="primary"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ReportsCheeseTrend;
