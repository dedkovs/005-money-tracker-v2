import makeStyles from '@material-ui/styles/makeStyles';
import Button from '@material-ui/core/Button';
import { Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		'& > *': {
			margin: theme.spacing(1),
		},
	},
	button: {
		color: 'black',
		backgroundColor: theme.palette.common.yellow1,
		'&:hover': {
			backgroundColor: theme.palette.common.yellow2,
		},
	},
}));

const LogOutButton = () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Button className={classes.button}>Log out</Button>
		</div>
	);
};

export default LogOutButton;
