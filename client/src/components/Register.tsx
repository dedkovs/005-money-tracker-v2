import React from 'react';
import { makeStyles } from '@material-ui/core';
import EmailInput from './EmailInput';
import PasswordInput from './PasswordInput';
import SubmitButton from './SubmitButton';
import TextLink from './TextLink';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';
import Typography from '@material-ui/core/Typography';
import { setIsAuth } from '../redux/slices/user';
import { useAppDispatch } from '../redux/hooks';

const useStyles = makeStyles(() => ({
	form: {
		margin: '0 auto',
		paddingTop: 20,
	},
	loginButtonsContainer: {
		display: 'flex',
		justifyContent: 'center',
		maxWidth: '300px',
		margin: '0 auto',
	},
}));

const Register = () => {
	const recaptchaRef = React.useRef<ReCAPTCHA>(null);

	const classes = useStyles();

	const dispatch = useAppDispatch();

	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [confirmPassword, setConfirmPassword] = React.useState('');
	const [error, setError] = React.useState('');
	const [errorEmail, setErrorEmail] = React.useState('');
	const [errorPassword, setErrorPassword] = React.useState('');
	const [errorConfirmPassword, setErrorConfirmPassword] = React.useState('');
	const [showPassword, setShowPassword] = React.useState(false);

	const [loading, setLoading] = React.useState(false);

	const handleRegisterButtonClick = async () => {
		if (email.trim() === '') {
			setErrorEmail('Please enter e-mail address');
			return;
		}

		const regex =
			/^((\w[^\W]+)[.-]?){1,}@(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gm;
		const subst = ``;
		const result = email.replace(regex, subst);
		if (result.length !== 0) {
			setErrorEmail('Please provide correct e-mail address');
			return;
		}

		if (password.trim() === '') {
			setErrorPassword('Please enter password');
			return;
		}
		if (confirmPassword.trim() === '') {
			setErrorConfirmPassword('Please enter password');
			return;
		}
		if (password !== confirmPassword) {
			setErrorConfirmPassword('Password mismatch');
			return;
		}

		const node = recaptchaRef.current;
		const token = await node?.executeAsync();
		node?.reset();

		setLoading(true);
		try {
			const response = await axios.post('/register', {
				email,
				password,
				token,
			});
			if (response.data.isAuth === true) {
				// console.log('response.data:');
				// console.log(response.data);
				setLoading(false);
				dispatch(setIsAuth(true));
				setError('');
			}
			if (response.data.error.length > 0) {
				setLoading(false);
				setError(response.data.error);
				dispatch(setIsAuth(false));
			}
		} catch (err) {
			setLoading(false);
			setError(err);
			dispatch(setIsAuth(false));
		}
	};

	return (
		<div>
			<form className={classes.form}>
				<EmailInput
					email={email}
					setEmail={setEmail}
					error={error}
					setError={setError}
					errorEmail={errorEmail}
					setErrorEmail={setErrorEmail}
					autoComplete={'new-email'}
				/>
				<PasswordInput
					password={password}
					setPassword={setPassword}
					errorPassword={errorPassword}
					setErrorPassword={setErrorPassword}
					showPassword={showPassword}
					setShowPassword={setShowPassword}
					setError={setError}
					autoComplete={'new-password'}
					passwordInputId={'register-password'}
					adornmentShow={true}
					inputLabel={'Password'}
				/>
				<PasswordInput
					password={confirmPassword}
					setPassword={setConfirmPassword}
					errorPassword={errorConfirmPassword}
					setErrorPassword={setErrorConfirmPassword}
					showPassword={showPassword}
					setShowPassword={setShowPassword}
					setError={setError}
					autoComplete={'new-password'}
					passwordInputId={'register-confirmPassword'}
					adornmentShow={false}
					inputLabel={'Confirm password'}
				/>
				{error && (
					<Typography variant="body1" color="error" align="center">
						{error}
					</Typography>
				)}
				<div className={classes.loginButtonsContainer}>
					<SubmitButton
						onClick={handleRegisterButtonClick}
						loading={loading}
						text={'Register'}
					/>
				</div>
				<div className={classes.loginButtonsContainer}>
					<ReCAPTCHA
						sitekey="6Lc61WMbAAAAAMfkAK15s99yIhJhW7n-jLyEpCsi"
						size="invisible"
						ref={recaptchaRef}
					/>
				</div>
				<TextLink text={'I have an account'} to={'/login'} />
			</form>
		</div>
	);
};

export default Register;
