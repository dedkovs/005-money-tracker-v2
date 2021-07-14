import ListItem from '@material-ui/core/ListItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { makeStyles } from '@material-ui/core/styles';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { setCollapsedComments } from '../../redux/slices/collapsedComments';

const useStyles = makeStyles(() => ({
    showComments: {
        marginLeft: 0,
    },
}));

const DrawerSwitchComments = () => {
    const collapsedComments = useAppSelector(
        (state) => state.collapsedComments
    );
    const dispatch = useAppDispatch();

    const switchComments = () => {
        dispatch(setCollapsedComments(!collapsedComments));
    };

    const classes = useStyles();

    return (
        <ListItem divider button onClick={switchComments}>
            <FormControlLabel
                value="show comments"
                control={
                    <Switch color="primary" checked={!collapsedComments} />
                }
                label={`${
                    collapsedComments ? 'Show comments' : 'Hide comments'
                }`}
                labelPlacement="start"
                className={classes.showComments}
                onClick={(e) => {
                    e.preventDefault();
                }}
            />
        </ListItem>
    );
};

export default DrawerSwitchComments;
