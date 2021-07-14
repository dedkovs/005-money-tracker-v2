import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        fontSize: '1rem',
        display: 'block',
        margin: '0 auto',
        marginBottom: 20,
        maxWidth: 300,
        caretColor: theme.palette.text1,
        '& label': {
            color: theme.palette.inputLabelColor,
        },
        '& .MuiInput-underline:before': {
            borderBottomColor: theme.palette.inputUnderlineBeforeColor,
        },
        '& label.Mui-focused': {
            color: theme.palette.common.green5,
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: theme.palette.common.green5,
        },
        '& input:-webkit-autofill, input:-webkit-autofill:hover, input:-webkit-autofill:focus, textarea:-webkit-autofill, textarea:-webkit-autofill:hover, textarea:-webkit-autofill:focus, select:-webkit-autofill, select:-webkit-autofill:hover,select:-webkit-autofill:focus':
            {
                '-webkit-text-fill-color': `${theme.palette.text1}`,
                '-webkit-box-shadow': `0 0 0px 1000px ${theme.palette.background.paper} inset`,
                transition: 'backgroundColor 5000s ease-in-out 0s',
                fontSize: '1rem',
            },
        '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
            borderBottom: `2px solid ${theme.palette.inputUnderlineBeforeHoveredColor}`,
        },
        '& .MuiInputBase-input': {
            fontSize: '1rem',
        },
    },
}));

interface Props {
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    error: string;
    setError: React.Dispatch<React.SetStateAction<string>>;
    errorEmail: string;
    setErrorEmail: React.Dispatch<React.SetStateAction<string>>;
    autoComplete: string;
}

const EmailInput = (props: Props) => {
    const classes = useStyles();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.setEmail(e.target.value);
        props.setError('');
        props.setErrorEmail('');
    };

    return (
        <TextField
            id="email"
            name="email"
            type="email"
            label="E-mail"
            className={classes.root}
            value={props.email}
            onChange={handleChange}
            fullWidth
            autoComplete={props.autoComplete}
            error={!!props.errorEmail}
            helperText={props.errorEmail}
        />
    );
};

export default EmailInput;
