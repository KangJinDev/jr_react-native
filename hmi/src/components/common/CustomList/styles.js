import {makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        overflow: 'auto'
    },
    listItem: {
        display: 'flex',
        alignItems: 'center',
        minHeight: (props) => props.minHeight,
    }
}));