import {makeStyles} from '@material-ui/styles';

export const useStyles = makeStyles((theme) => ({
    container: {
        position: 'relative',
        flexGrow: 1,
        height: 'calc(100% - 64px)',
        padding: theme.spacing(1, 3, 4, 3),
        display: 'flex',
        flexDirection: 'column',
    },
    backButton: {
        color: theme.palette.base[800],
    },
    subTitle: {
        color: theme.palette.base[400],
        textTransform: 'uppercase'
    },
    content: {
        padding: theme.spacing(3),
        height: '100%',
    },
    button: {
        color: theme.palette.base.white,
        textDecoration: 'none',
    },
    password: {
        margin: theme.spacing(2, 0),
    },
    connectTitle: {
        padding: theme.spacing(2),
        background: '#EDEDED',
        textAlign: 'center',
    },
    connectContent: {
        width: 400,
        background: '#EDEDED',
        padding: theme.spacing(2),
    },
    image: {
        width: '100%',
    },
    connectMsg: {
        padding: theme.spacing(2),
        textAlign: 'center',
    },
    success: {

    }
}));