import React from 'react';
import { makeStyles } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormHelperText from '@material-ui/core/FormHelperText';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        maxWidth: 300,
        caretColor: theme.palette.text1,
        '& input:-webkit-autofill, input:-webkit-autofill:hover, input:-webkit-autofill:focus, textarea:-webkit-autofill, textarea:-webkit-autofill:hover, textarea:-webkit-autofill:focus, select:-webkit-autofill, select:-webkit-autofill:hover,select:-webkit-autofill:focus':
            {
                '-webkit-text-fill-color': `${theme.palette.text1}`,
                '-webkit-box-shadow': `0 0 0px 1000px ${theme.palette.background.paper} inset`,
                transition: 'backgroundColor 5000s ease-in-out 0s',
            },
    },
    form: {
        display: 'flex',
        margin: '0 auto',
        marginBottom: 20,
        maxWidth: 300,
        '& label.Mui-focused': {
            color: theme.palette.common.green5,
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: theme.palette.common.green5,
        },
        '& label': {
            color: theme.palette.inputLabelColor,
        },
        '& .MuiInput-underline:before': {
            borderBottomColor: theme.palette.inputUnderlineBeforeColor,
        },
        '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
            borderBottom: `2px solid ${theme.palette.inputUnderlineBeforeHoveredColor}`,
        },
        '& .MuiInputBase-input': {
            fontSize: '1rem',
        },
    },
    adornment: {
        color: theme.palette.inputLabelColor,
    },
}));

interface Props {
    password: string;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    errorPassword: string;
    setErrorPassword: React.Dispatch<React.SetStateAction<string>>;
    showPassword: boolean;
    setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
    setError: React.Dispatch<React.SetStateAction<string>>;
    autoComplete: string;
    passwordInputId: string;
    adornmentShow: boolean;
    inputLabel: string;
}

const PasswordInput = (props: Props) => {
    const classes = useStyles();

    const handleClickShowPassword = () => {
        props.setShowPassword(!props.showPassword);
    };

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
    };

    const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.setPassword(e.target.value);
        props.setError('');
        props.setErrorPassword('');
    };

    return (
        <FormControl error={!!props.errorPassword} className={classes.form}>
            <InputLabel htmlFor={props.passwordInputId}>
                {props.inputLabel}
            </InputLabel>
            <Input
                name="password"
                className={classes.root}
                id={props.passwordInputId}
                type={props.showPassword ? 'text' : 'password'}
                value={props.password}
                onChange={handleChangePassword}
                endAdornment={
                    props.adornmentShow && (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                className={classes.adornment}
                            >
                                {props.showPassword ? (
                                    <Visibility />
                                ) : (
                                    <VisibilityOff />
                                )}
                            </IconButton>
                        </InputAdornment>
                    )
                }
                autoComplete={props.autoComplete}
            />
            <FormHelperText id="login-password-error-text">
                {props.errorPassword}
            </FormHelperText>
        </FormControl>
    );
};

export default PasswordInput;
