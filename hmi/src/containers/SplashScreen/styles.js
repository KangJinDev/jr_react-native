import {makeStyles} from '@material-ui/styles';

export const useStyles = makeStyles((theme) => ({
    container: {
        position: 'relative',
        width: '100%',
        height: '100%',
        background: theme.palette.background.splash,
    },
}));