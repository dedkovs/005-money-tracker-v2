import makeStyles from '@material-ui/styles/makeStyles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
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
