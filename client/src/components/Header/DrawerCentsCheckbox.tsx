import ListItem from '@material-ui/core/ListItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { toggleShowCents } from '../../redux/slices/ui';

const useStyles = makeStyles((theme) => ({
    showCents: {
        marginLeft: -12,
    },
    root: {
        color: theme.palette.common.blueSwitch,
        '&:hover': {
            backgroundColor: theme.palette.common.blueSwitchHover,
        },
        '&$checked': {
            color: theme.palette.common.blueSwitch,
        },
        '&$checked:hover': {
            backgroundColor: theme.palette.common.blueSwitchHover,
        },
    },
    checked: {},
}));

const DrawerCentsCheckbox = () => {
    const showCents = useAppSelector((state) => state.ui.showCents);
    const dispatch = useAppDispatch();

    const switchCents = () => {
        dispatch(toggleShowCents());
    };

    const classes = useStyles();

    return (
        <ListItem divider button onClick={switchCents}>
            <FormControlLabel
                value="show cents"
                control={
                    <Checkbox
                        checked={showCents}
                        classes={{
                            root: classes.root,
                            checked: classes.checked,
                        }}
                    />
                }
                label={'Show cents'}
                labelPlacement="end"
                className={classes.showCents}
                onClick={(e) => {
                    e.preventDefault();
                }}
            />
        </ListItem>
    );
};

export default DrawerCentsCheckbox;
