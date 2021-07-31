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
import {
    setAllTransactions,
    setWallets,
    setWalletsTopOrder,
    setWalletsOrder,
} from '../../redux/slices/user';
import { setOpenDrawer } from '../../redux/slices/open';
import { setIsAuth } from '../../redux/slices/user';
import {
    setLogoAnimated,
    setLogoLoaded,
    setFormType,
} from '../../redux/slices/ui';
import { setPageNumber } from '../../redux/slices/user';
import {
    setExpensesSum,
    setIncomeSum,
} from '../../redux/slices/transactionForm';
import { setRecordMenuButtonAnchor } from '../../redux/slices/anchors';
import { setRecordToEdit } from '../../redux/slices/recordToEdit';

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

    const openDrawer = useAppSelector((state) => state.open.openDrawer);
    const pageNumber = useAppSelector((state) => state.user.pageNumber);
    const dispatch = useAppDispatch();
    const local_pageNumber = pageNumber;

    const logOut = () => {
        dispatch(setOpenDrawer(false));
        dispatch(setLogoAnimated(true));
        dispatch(setLogoLoaded(false));
        axios
            .get('/logout')
            .then((res) => {
                dispatch(setIsAuth(false));
                dispatch(setAllTransactions([]));
                dispatch(setWallets({}));
                dispatch(setWalletsTopOrder([]));
                dispatch(setWalletsOrder([]));
                dispatch(setExpensesSum(''));
                dispatch(setIncomeSum(''));
                dispatch(setPageNumber(local_pageNumber));
                dispatch(setFormType('expenses'));
                dispatch(setRecordMenuButtonAnchor(null));
                dispatch(setRecordToEdit(null));
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
