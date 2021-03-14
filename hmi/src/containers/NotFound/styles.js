import {makeStyles} from '@material-ui/styles';

export const useStyles = makeStyles((theme) => ({
    container: {
        position: 'relative',
        width: '100%',
        height: '100%',
    },
    link: {
        position: 'absolute',
        top: theme.spacing(5),
        right: theme.spacing(5),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
}));