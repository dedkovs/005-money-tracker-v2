import ListItem from '@material-ui/core/ListItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import {
    // setShowComments,
    toggleShowComments,
} from '../../redux/slices/showComments';

const useStyles = makeStyles((theme) => ({
    showComments: {
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

const DrawerCommentsCheckbox = () => {
    const showComments = useAppSelector((state) => state.showComments);
    const dispatch = useAppDispatch();

    const switchComments = () => {
        dispatch(toggleShowComments());
    };

    const classes = useStyles();

    return (
        <ListItem divider button onClick={switchComments}>
            <FormControlLabel
                value="show comments"
                control={
                    <Checkbox
                        checked={showComments}
                        classes={{
                            root: classes.root,
                            checked: classes.checked,
                        }}
                    />
                }
                label={'Show comments'}
                labelPlacement="end"
                className={classes.showComments}
                onClick={(e) => {
                    e.preventDefault();
                }}
            />
        </ListItem>
    );
};

export default DrawerCommentsCheckbox;
