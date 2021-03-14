import {makeStyles} from '@material-ui/styles';

export const useStyles = makeStyles((theme) => ({
    container: {
        position: 'relative',
        width: theme.dimensions.sidebarWidth,
        height: '100%',
        padding: theme.spacing(2),
    },
    navButton: {
        margin: theme.spacing(1, 0),
        fontSize: 10,
    }
}));
