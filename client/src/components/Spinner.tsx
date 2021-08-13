import makeStyles from '@material-ui/styles/makeStyles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
	spinnerContainer: {
		position: 'relative',
		// top: theme.spacing(3),
		top: 24,
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
