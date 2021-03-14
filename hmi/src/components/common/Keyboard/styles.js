import {makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    container: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
        left: 0,
        zIndex: theme.zIndex.touchPad
    },
    closeButton: {
        width: theme.spacing(4),
        height: theme.spacing(4),
        borderRadius: '50%',
        position: 'absolute',
        top: theme.spacing(-4.5),
        right: theme.spacing(1),
        color: theme.palette.base.white,
        background: theme.palette.background.splash,
    }
}));