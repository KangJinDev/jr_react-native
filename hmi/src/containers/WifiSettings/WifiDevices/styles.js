import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles((theme) => ({
  container: {
    position: "relative",
    flexGrow: 1,
    height: theme.dimensions.containerHeight,
    padding: theme.spacing(1, 3, 4, 3),
    display: "flex",
    flexDirection: "column",
  },
  content: {
    padding: theme.spacing(1, 3),
    height: "100%",
  },
  connectedContent: {
    marginBottom: theme.spacing(1),
  },
  inputContent: {
    display: "flex",
    marginBottom: theme.spacing(2),
  },
  connectTitle: {
    padding: theme.spacing(2),
    background: "#EDEDED",
    textAlign: "center",
  },
  connectContent: {
    width: 400,
    background: "#EDEDED",
    padding: theme.spacing(2),
  },
  connectMSGContent: {
    width: 400,
    padding: theme.spacing(2),
  },
  image: {
    width: "100%",
  },
  connectMsg: {
    padding: theme.spacing(2),
    textAlign: "center",
  },
  input: {
    marginRight: theme.spacing(3),
  },
  subTitle: {
    padding: theme.spacing(1.5, 2),
    color: theme.palette.base[400],
    textTransform: "uppercase",
  },
  connected: {
    position: "relative",
    background: theme.palette.background.paper,
  },
  connectedInfo: {
    position: "absolute",
    width: "100%",
    padding: theme.spacing(2),
    zIndex: theme.zIndex.modal,
  },
  icon: {
    margin: theme.spacing(0, 0.5),
  },
  submitBtn: {
    color: theme.palette.base.white,
  },
}));
