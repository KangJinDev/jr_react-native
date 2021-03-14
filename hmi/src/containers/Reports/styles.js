import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles((theme) => ({
  container: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
  content: {
    width: "100%",
    height: theme.dimensions.containerHeight,
  },
  subContent: {
    width: theme.dimensions.sidebarContentWidth,
    height: "100%",
    padding: theme.spacing(2, 2, 2, 0),
    display: "flex",
    flexDirection: "column",
  },
  subTitleContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  subTitle: {
    padding: theme.spacing(1, 0),
  },
  summary: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    padding: theme.spacing(1, 0),
    fontSize: 14,
  },
  summaryItem: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(0.5),
    fontSize: "11px",
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    margin: theme.spacing(1, 0),
  },
}));
