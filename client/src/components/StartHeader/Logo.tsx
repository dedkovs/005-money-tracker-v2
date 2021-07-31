import { makeStyles, Theme } from '@material-ui/core';
import LogoSrc from '../../images/money-tracker-logo.svg';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { setLogoAnimated } from '../../redux/slices/ui';
import { setLogoLoaded } from '../../redux/slices/ui';

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

    const logoAnimated = useAppSelector((state) => state.ui.logoAnimated);
    const logoLoaded = useAppSelector((state) => state.ui.logoLoaded);
    const dispatch = useAppDispatch();

    const getLogoClassName = () => {
        if (logoAnimated === true && logoLoaded === false) return classes.logo1;
        if (logoAnimated === true && logoLoaded === true) return classes.logo2;
        if (logoAnimated === false && logoLoaded === true) return classes.logo3;
    };

    return (
        <img
            id="logo"
            className={getLogoClassName()}
            src={LogoSrc}
            alt="Money Tracker Logo"
            onLoad={() => {
                dispatch(setLogoLoaded(true));
                setTimeout(() => {
                    dispatch(setLogoAnimated(false));
                }, 2200);
            }}
        />
    );
};

export default Logo;
