import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles((theme) => ({
  title: {
    padding: 0,
  },
  content: {
    padding: 0,
  },
  actions: {
    padding: 0,
  },
  btn: {
    color: theme.palette.base.white,
    margin: "auto",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3),
  },
}));
