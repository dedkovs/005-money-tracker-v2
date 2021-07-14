import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuButton from './MenuButton';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import AddTransactionButton from './AddTransactionButton';
import Drawer from './Drawer';
// import useScrollTrigger from '@material-ui/core/useScrollTrigger';
// import Slide from '@material-ui/core/Slide';

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
        paddingLeft: 8,
        paddingRight: 8,
        minWidth: 340,
    },
    toolbar2: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 0,
        minWidth: 500,
    },
    tabs1: {
        maxWidth: 1000,
        position: 'relative',
        margin: '0 auto',
    },
    tabs2: {
        width: '100%',
        position: 'relative',
        margin: '0 auto',
        maxWidth: 520,
    },
}));

interface Props {
    children?: React.ReactElement;
}

// function HideOnScroll(props: Props) {
//     const { children } = props;
//     const trigger = useScrollTrigger();

//     return (
//         <Slide appear={false} direction="down" in={!trigger}>
//             {children}
//         </Slide>
//     );
// }

const Header = (props: Props) => {
    const classes = useStyles();

    const matches = useMediaQuery('(min-width:600px)');

    const getToolbarClassName = () => {
        if (matches) return classes.toolbar2;
        else return classes.toolbar1;
    };

    return (
        <div style={{ position: 'relative', minWidth: 360 }}>
            {/* <HideOnScroll {...props}> */}
            <AppBar className={classes.appbar}>
                <div className={matches ? classes.tabs1 : classes.tabs2}>
                    <Toolbar className={`${getToolbarClassName()}`}>
                        <MenuButton />
                        <div>TOP WALLETS</div>
                        <AddTransactionButton />
                        <Drawer />
                    </Toolbar>
                </div>
            </AppBar>
            {/* </HideOnScroll> */}
        </div>
    );
};

export default Header;
