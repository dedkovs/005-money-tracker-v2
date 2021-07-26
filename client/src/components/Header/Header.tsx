import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuButton from './MenuButton';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import AddTransactionButton from './AddTransactionButton';
import Drawer from './Drawer';
import TopWallets from './TopWallets';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

const useStyles = makeStyles((theme) => ({
    toolbarMargin: {
        ...theme.mixins.toolbar,
    },
    appbar: {
        zIndex: theme.zIndex.modal + 1,
        backgroundColor: theme.palette.appBarBackgroundColor,
    },
    toolbar1: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 0,
        minWidth: 340,
    },
    toolbar2: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        // minWidth: 500,
        paddingLeft: 8,
        paddingRight: 8,
    },
    tabs1: {
        width: '100%',
        position: 'relative',
        margin: '0 auto',
        maxWidth: 520,
        minWidth: 300,
    },
    tabs2: {
        width: '100%',
        maxWidth: 800,
        position: 'relative',
        margin: '0 auto',
    },
}));

// interface Props {
/**
 * Injected by the documentation to work in an iframe.
 * You won't need it on your project.
 */
// window?: () => Window;
// children: React.ReactElement;
// }

// function ElevationScroll(props: Props) {
//     const { children } = props;
//     // Note that you normally won't need to set the window ref as useScrollTrigger
//     // will default to window.
//     // This is only being set here because the demo is in an iframe.
//     const trigger = useScrollTrigger({
//         disableHysteresis: true,
//         threshold: 0,
//         //   target: window ? window() : undefined,
//     });

//     return React.cloneElement(children, {
//         elevation: trigger ? 4 : 0,
//     });
// }

const Header = () => {
    const classes = useStyles();

    // const matches = useMediaQuery('(min-width:600px)');
    const matches = useMediaQuery('(max-width:360px)');

    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        //   target: window ? window() : undefined,
    });

    // const getToolbarClassName = () => {
    //     if (matches) return classes.toolbar2;
    //     else return classes.toolbar1;
    // };

    return (
        // <div style={{ position: 'relative', minWidth: 360 }}>
        // <ElevationScroll {...props}>
        <AppBar elevation={trigger ? 4 : 0} className={classes.appbar}>
            {/* <div className={matches ? classes.tabs1 : classes.tabs2}> */}
            <div className={matches ? classes.tabs1 : classes.tabs2}>
                {/* <div className={classes.tabs2}> */}
                <Toolbar
                    className={
                        matches ? classes.toolbar1 : classes.toolbar2
                        // classes.toolbar1
                    }
                >
                    <MenuButton />
                    <TopWallets />
                    <AddTransactionButton />
                    <Drawer />
                </Toolbar>
            </div>
        </AppBar>
        // </ElevationScroll>
        // </div>
    );
};

export default Header;
