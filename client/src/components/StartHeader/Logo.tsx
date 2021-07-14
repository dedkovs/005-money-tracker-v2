import { makeStyles, Theme } from '@material-ui/core';
import LogoSrc from '../../images/money-tracker-logo.svg';

const useStyles = makeStyles((theme: Theme) => ({
    '@keyframes animation1': {
        from: { opacity: 0 },
        to: { opacity: 1 },
    },
    logo1: {
        display: 'block',
        margin: '0 auto',
        paddingTop: '2em',
        width: 200,
        [theme.breakpoints.down('sm')]: {
            width: 150,
            paddingTop: '1em',
        },
        opacity: 0,
    },
    logo2: {
        display: 'block',
        margin: '0 auto',
        paddingTop: '2em',
        width: 200,
        [theme.breakpoints.down('sm')]: {
            width: 150,
            paddingTop: '1em',
        },
        animationName: '$animation1',
        animationDuration: '2s',
        animationIterationCount: 1,
        animationFillMode: 'forwards',
    },
    logo3: {
        display: 'block',
        margin: '0 auto',
        paddingTop: '2em',
        width: 200,
        [theme.breakpoints.down('sm')]: {
            width: 150,
            paddingTop: '1em',
        },
        opacity: 1,
    },
}));

const Logo = () => {
    const classes = useStyles();

    return (
        <img
            id="logo"
            className={classes.logo3}
            src={LogoSrc}
            alt="Money Tracker Logo"
        />
    );
};

export default Logo;
