import { makeStyles, Theme } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Switch from '@material-ui/core/Switch';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { toggleTheme } from '../../redux/slices/darkTheme';

const useStyles = makeStyles((theme: Theme) => ({
    switchBase: {
        color: theme.palette.common.yellow1,
        '&$checked': {
            color: theme.palette.common.yellow1,
        },
        '&$checked + $track': {
            backgroundColor: theme.palette.common.yellow2,
        },
        '&$checked:hover': {
            backgroundColor: theme.palette.common.yellow3,
        },
    },
    checked: {},
    track: {
        backgroundColor: theme.palette.common.yellow1,
    },
    '@keyframes animation1': {
        from: { opacity: 0 },
        to: { opacity: 1 },
    },
    iconDarkMode: {
        position: 'relative',
        opacity: 0.5,
        top: 3,
        width: 22,
        color: theme.palette.common.yellow1,
    },
    switchPosition1: {
        position: 'absolute',
        right: 0,
        top: 4,
        opacity: 0,
        animationName: '$animation1',
        animationDuration: '2s',
        animationDelay: '0.3s',
        animationIterationCount: 1,
        animationFillMode: 'forwards',
    },
    switchPosition2: {
        position: 'absolute',
        right: 0,
        top: 4,
        opacity: 1,
    },
    button: {
        minHeight: 56,
        '@media (min-width:0px) and (orientation: landscape)': {
            minHeight: 48,
        },
        '@media (min-width:600px)': { minHeight: 64 },
    },
}));

const DarkModeSwitcher = () => {
    const classes = useStyles();

    const darkTheme = useAppSelector((state) => state.darkTheme);
    const logoAnimated = useAppSelector((state) => state.logoAnimated);
    const dispatch = useAppDispatch();

    const handleToggleTheme = () => {
        dispatch(toggleTheme());
    };

    return (
        <FormControlLabel
            control={
                <Switch
                    classes={{
                        switchBase: classes.switchBase,
                        track: classes.track,
                        checked: classes.checked,
                    }}
                    checked={darkTheme}
                    onChange={handleToggleTheme}
                    name="dark"
                />
            }
            label={<Brightness4Icon className={classes.iconDarkMode} />}
            className={
                logoAnimated === true
                    ? classes.switchPosition1
                    : classes.switchPosition2
            }
        />
    );
};

export default DarkModeSwitcher;
