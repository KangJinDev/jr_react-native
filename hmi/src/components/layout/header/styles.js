import {makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 0,
    },
    container: {
        boxShadow: 'none',
    },
    title: {
        color: theme.palette.secondary.brown,
    },
    toolbar: {
        justifyContent: 'space-between',
    }
}));
