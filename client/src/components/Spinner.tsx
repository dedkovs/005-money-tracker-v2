import { makeStyles } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    spinnerContainer: {
        position: 'relative',
        top: theme.spacing(3),
        maxHeight: '40vh',
    },
    spinner: {
        position: 'absolute',
        left: 0,
        right: 0,
        marginLeft: 'auto',
        marginRight: 'auto',
        color: theme.palette.common.yellow1,
    },
}));

const Spinner = () => {
    const classes = useStyles();

    return (
        <div className={classes.spinnerContainer}>
            <CircularProgress size={30} className={classes.spinner} />
        </div>
    );
};
export default Spinner;
