import React from "react";
import { Grid } from "@material-ui/core";

import NavButton from "../../../components/common/NavButton";

import { useStyles } from "./styles";

const ReportsSidebar = (props) => {
  const classes = useStyles();

  const routes = [
    {
      url: "/reports/production-history",
      title: "Production History",
    },
    {
      url: "/reports/cleaning-history",
      title: "Cleaning History",
    },
    {
      url: "/reports/blade-history",
      title: "Blade History",
    },
    {
      url: "/reports/alarm-history",
      title: "Alarm History",
    },
    {
      url: "/reports/cheese-trend",
      title: "Cheese Trend",
    },
  ];

  return (
    <Grid container direction="column" className={classes.container}>
      {routes.map((route) => (
        <NavButton
          url={route.url}
          key={route.url}
          title={route.title}
          className={classes.navButton}
        />
      ))}
    </Grid>
  );
};

export default ReportsSidebar;
