import {makeStyles} from '@material-ui/styles';

export const useStyles = makeStyles((theme) => ({
    active: {
        textDecoration: 'none',
        color: theme.palette.primary.main,
    },
    inactive: {
        textDecoration: 'none',
        color: theme.palette.base.white,
    }
}));
