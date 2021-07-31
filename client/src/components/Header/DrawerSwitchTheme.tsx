import ListItem from '@material-ui/core/ListItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import { makeStyles } from '@material-ui/core/styles';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { toggleTheme } from '../../redux/slices/ui';

const useStyles = makeStyles((theme) => ({
    switchBase: {
        color: theme.palette.common.blueSwitch,
        '&$checked': {
            color: theme.palette.common.blueSwitch,
        },
        '&$checked + $track': {
            backgroundColor: theme.palette.common.blueSwitch,
        },
        '&$checked:hover': {
            backgroundColor: theme.palette.common.blueSwitchHover,
        },
    },
    checked: {},
    track: {
        backgroundColor: theme.palette.common.blueSwitch,
    },
    iconDarkMode: {
        position: 'relative',
        opacity: 0.5,
        top: 3,
        width: 22,
        color: theme.palette.common.blueSwitch,
    },
}));

const DrawerSwitchTheme = () => {
    const classes = useStyles();

    const darkTheme = useAppSelector((state) => state.ui.darkTheme);
    const dispatch = useAppDispatch();

    const switchDark = () => {
        dispatch(toggleTheme());
    };

    return (
        <ListItem divider button onClick={switchDark}>
            <FormControlLabel
                control={
                    <Switch
                        checked={darkTheme}
                        name="dark"
                        classes={{
                            switchBase: classes.switchBase,
                            track: classes.track,
                            checked: classes.checked,
                        }}
                    />
                }
                label={
                    <Brightness4Icon
                        className={classes.iconDarkMode}
                        onClick={(e) => {
                            e.preventDefault();
                        }}
                    />
                }
            />
        </ListItem>
    );
};

export default DrawerSwitchTheme;
