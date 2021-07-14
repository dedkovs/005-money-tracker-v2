import { makeStyles } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    spinner2: {
        position: 'absolute',
        left: 0,
        right: 0,
        marginLeft: 'auto',
        marginRight: 'auto',
        top: 3,
        color: theme.palette.common.yellow1,
    },
}));

const ButtonSpinner = () => {
    const classes = useStyles();

    return <CircularProgress size={30} className={classes.spinner2} />;
};

export default ButtonSpinner;
