import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles((theme) => ({
  container: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
  form: {
    padding: theme.spacing(2),
  },
  formContent: {},
  formFields: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: theme.spacing(1),
  },
  formLastFields: {
    display: "flex",
    marginBottom: theme.spacing(1),
  },
  field: {
    marginRight: theme.spacing(7),
  },
  formActions: {
    display: "flex",
    justifyContent: "flex-end",
    margin: theme.spacing(2, 0),
  },
  submitBtn: {
    color: theme.palette.base.white,
  },
  connectMsg: {
    width: 400,
    padding: theme.spacing(2),
    textAlign: "center",
  },
  connectTitle: {
    padding: theme.spacing(2),
    background: "#EDEDED",
    textAlign: "center",
  },
}));
