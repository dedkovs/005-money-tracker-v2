import React from 'react';
import { makeStyles } from '@material-ui/core';
import EmailInput from '../EmailInput';
import PasswordInput from '../PasswordInput';
import SubmitButton from '../SubmitButton';
import ButtonSigninWithGoogle from './ButtonSigninWithGoogle';
import TextLink from '../TextLink';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import { setIsAuth } from '../../redux/slices/isAuth';
import { useAppDispatch } from '../../redux/hooks';

const useStyles = makeStyles(() => ({
    form: {
        margin: '0 auto',
        paddingTop: 20,
    },
    loginButtonsContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        maxWidth: '300px',
        margin: '0 auto',
    },
}));

const Login = () => {
    const classes = useStyles();

    const dispatch = useAppDispatch();

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');
    const [errorEmail, setErrorEmail] = React.useState('');
    const [errorPassword, setErrorPassword] = React.useState('');
    const [showPassword, setShowPassword] = React.useState(false);

    const [loading, setLoading] = React.useState(false);

    const handleButtonSigninClick = () => {
        if (email.trim() === '') {
            setErrorEmail('Please enter e-mail address');
            return;
        }
        if (password.trim() === '') {
            setErrorPassword('Please enter password');
            return;
        }
        setLoading(true);
        axios
            .post('/login', {
                email,
                password,
            })
            .then((response) => {
                setLoading(false);
                if (response.data.isAuth === false) {
                    setError(
                        'There is no user with this combination of e-mail and password.'
                    );
                }
                dispatch(setIsAuth(response.data.isAuth));
            })
            .catch((err) => {
                setLoading(false);
                setError(err);
                dispatch(setIsAuth(false));
            });
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
                    autoComplete={'email'}
                />
                <PasswordInput
                    password={password}
                    setPassword={setPassword}
                    errorPassword={errorPassword}
                    setErrorPassword={setErrorPassword}
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                    setError={setError}
                    autoComplete={'password'}
                    passwordInputId={'login-password'}
                    adornmentShow={true}
                    inputLabel={'Password'}
                />
                {error && (
                    <Typography variant="body1" color="error" align="center">
                        {error}
                    </Typography>
                )}

                <div className={classes.loginButtonsContainer}>
                    <SubmitButton
                        onClick={handleButtonSigninClick}
                        loading={loading}
                        text={'Sign in'}
                    />
                    <ButtonSigninWithGoogle />
                </div>

                <TextLink text={'Register'} to={'/register'} />
            </form>
        </div>
    );
};

export default Login;
