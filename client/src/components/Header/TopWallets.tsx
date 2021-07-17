import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import NumberFormat from 'react-number-format';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { setOpenDrawer } from '../../redux/slices/openDrawer';

const useStyles = makeStyles(() => ({
    topWalletsContainer: {
        display: 'flex',
        maxWidth: 'calc(100% - 90px)',
        height: 50,
        overflowY: 'hidden',
        overflowX: 'auto',
    },
    walletContainer: {
        // fontFamily: 'Circe Light',
        // fontWeight: 100,
        padding: '0 10px',
        margin: '0 10px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minHeight: 50,
        minWidth: 'unset',
        textTransform: 'none',
        opacity: 0.8,
        border: '1px solid rgba(255,255,255,0.5)',
        borderRadius: 5,
    },
    scrollButtonsDesktop1: {
        display: 'none',
    },
    scrollButtonsDesktop2: {
        display: 'inline-flex',
    },
}));

const TopWallets = () => {
    const classes = useStyles();
    const matches = useMediaQuery('(max-width: 360px)');

    const dispatch = useAppDispatch();
    const showCents = useAppSelector((state) => state.showCents);
    const walletsTopOrder = useAppSelector((state) => state.walletsTopOrder);
    const wallets = useAppSelector((state) => state.wallets);

    return (
        <div className={classes.topWalletsContainer}>
            <Tabs
                // style={{ display: 'flex' }}
                value={false}
                variant="scrollable"
                scrollButtons="auto"
                indicatorColor="primary"
                classes={{
                    scrollButtonsDesktop: matches
                        ? classes.scrollButtonsDesktop1
                        : classes.scrollButtonsDesktop2,
                }}
            >
                {/* {store.user.wallets_top_order.map((wallet) => { */}

                {Object.keys(wallets).length > 0 &&
                    walletsTopOrder
                        .filter((wallet) => wallets[wallet][1] === 'show')
                        .map((wallet) => {
                            return (
                                <Tab
                                    onClick={(event) => {
                                        dispatch(setOpenDrawer(false));
                                        // store.setAnchorEl(null);
                                        // store.setAnchorEl2(event.currentTarget);
                                        // store.setWalletToEdit(wallet);
                                        // console.log(store.walletToEdit);
                                    }}
                                    key={wallet}
                                    className={classes.walletContainer}
                                    icon={
                                        <div>
                                            <Typography
                                                style={{
                                                    // fontFamily: 'Circe Light',
                                                    fontFamily: 'Roboto',
                                                    fontWeight: 300,
                                                    fontSize: '0.8rem',
                                                }}
                                                variant={'body2'}
                                                align={'center'}
                                            >
                                                {wallet}
                                            </Typography>
                                            <Typography
                                                style={{
                                                    fontFamily: 'Circe Light',
                                                    // fontWeight: 100,
                                                    // fontFamily: 'Roboto',
                                                    // fontWeight: 300,
                                                    // fontSize: '0.8rem',
                                                }}
                                                variant={'body2'}
                                                align={'center'}
                                            >
                                                <NumberFormat
                                                    value={
                                                        wallets[wallet][0] / 100
                                                    }
                                                    displayType={'text'}
                                                    thousandSeparator={' '}
                                                    decimalSeparator={'.'}
                                                    decimalScale={
                                                        showCents ? 2 : 0
                                                    }
                                                    fixedDecimalScale={true}
                                                />
                                            </Typography>
                                        </div>
                                    }
                                ></Tab>
                            );
                        })}
            </Tabs>
        </div>
    );
};

export default TopWallets;
