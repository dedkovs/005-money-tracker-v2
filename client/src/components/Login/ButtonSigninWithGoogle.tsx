import makeStyles from '@material-ui/styles/makeStyles';
import CustomButton from '../CustomButton';
import GoogleLogo from '../../images/google-icon-black.svg';
import { Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
	linkContainer: {
		display: 'flex',
		justifyContent: 'center',
	},
	linkContainer2: {
		marginTop: '2.5em',
		marginBottom: '1.5em',
	},
	button: {
		width: '200px',
		paddingLeft: '25px',
		paddingRight: '0px',
		display: 'block',
		position: 'relative',
		margin: '0 auto',
		backgroundImage: `url(${GoogleLogo})`,
		backgroundSize: '21px auto',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: '8px 7px',
		backgroundColor: theme.palette.common.yellow1,
		'&:hover': {
			backgroundColor: theme.palette.common.yellow2,
		},
		color: 'rgb(114,80,20)',
	},
}));

const ButtonSigninWithGoogle = () => {
	const classes = useStyles();
	return (
		<div className={(classes.linkContainer, classes.linkContainer2)}>
			<a href="/auth/google" role="button" style={{ textDecoration: 'none' }}>
				<CustomButton className={classes.button}>
					{'Sign in with Google'}
				</CustomButton>
			</a>
		</div>
	);
};

export default ButtonSigninWithGoogle;
