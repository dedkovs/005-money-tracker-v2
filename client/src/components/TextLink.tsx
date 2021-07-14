import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        fontWeight: 400,
        textDecoration: 'none',
        color: theme.palette.inputLabelColor,
        marginBottom: '1em',
        '&:hover': {
            textDecorationLine: 'underline',
            cursor: 'pointer',
        },
    },
    linkContainer: {
        display: 'flex',
        justifyContent: 'center',
    },
}));

interface Props {
    text: string;
    to: string;
}

const LinkToRegister = (props: Props) => {
    const classes = useStyles();
    return (
        <div className={classes.linkContainer}>
            <Typography
                className={classes.root}
                component={Link}
                to={props.to}
                align={'center'}
                variant="body1"
            >
                {props.text}
            </Typography>
        </div>
    );
};

export default LinkToRegister;
