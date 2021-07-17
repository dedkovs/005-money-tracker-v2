import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DrawerSwitchTheme from './DrawerSwitchTheme';
import DrawerCommentsCheckbox from './DrawerCommentsCheckbox';
import DrawerCentsCheckbox from './DrawerCentsCheckbox';
import axios from 'axios';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
// import { setAllTransactions } from '../../redux/slices/transactions';
import { setAllTransactions } from '../../redux/slices/transactions2';
import { setOpenDrawer } from '../../redux/slices/openDrawer';
import { setIsAuth } from '../../redux/slices/isAuth';
import { setLogoAnimated } from '../../redux/slices/logoAnimated';
import { setLogoLoaded } from '../../redux/slices/logoLoaded';

const useStyles = makeStyles((theme) => ({
    toolbarMargin: {
        ...theme.mixins.toolbar,
    },
    drawer: {
        minWidth: 280,
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text2,
        '& .MuiListItem-divider': {
            borderBottomColor: theme.palette.dividerColor,
        },
    },
}));

const Drawer1 = () => {
    const classes = useStyles();

    const openDrawer = useAppSelector((state) => state.openDrawer);
    const dispatch = useAppDispatch();

    const logOut = () => {
        dispatch(setOpenDrawer(false));
        dispatch(setLogoAnimated(true));
        dispatch(setLogoLoaded(false));
        axios
            .get('/logout')
            .then((res) => {
                dispatch(setIsAuth(res.data.isAuth));
                dispatch(setAllTransactions([]));
            })
            .catch((err) => {
                console.log(
                    'Something went wrong. Try to reload the page.',
                    err
                );
            });
    };

    return (
        <Drawer
            open={openDrawer}
            onClose={() => dispatch(setOpenDrawer(false))}
            classes={{ paper: classes.drawer }}
        >
            <div className={classes.toolbarMargin} />
            <List disablePadding>
                <DrawerSwitchTheme />
                <DrawerCommentsCheckbox />
                <DrawerCentsCheckbox />
                {/* <ListItem
                    onClick={() => {
                        dispatch(setOpenDrawer(false));
                    }}
                    divider
                    button
                    // component={Link}
                    // to="/data"
                >
                    <ListItemText>Charts</ListItemText>
                </ListItem> */}
                {/* <DrawerSwitchComments /> */}
                {/* <DrawerSwitchCents /> */}
                {/* <ListItem
                    onClick={() => {
                        // store.setOpenDialogRenameWallet(false);
                        dispatch(setOpenDrawer(false));
                        // store.setOpenEditWalletsForm(true);
                    }}
                    divider
                    button
                    // component={Link}
                    // to="/data/edit-wallets"
                >
                    <ListItemText>Edit wallets</ListItemText>
                </ListItem> */}
                <ListItem onClick={logOut} divider button>
                    <ListItemText>Log out</ListItemText>
                </ListItem>
            </List>
        </Drawer>
    );
};

export default Drawer1;
