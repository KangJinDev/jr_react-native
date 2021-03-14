import {makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    container: {
        width: '100%',
        height: (props) => props.fullHeight ? '100%' : theme.dimensions.containerHeight,
        background: theme.palette.base.white,
        opacity: 0.5,
        position: 'absolute',
    }
}));