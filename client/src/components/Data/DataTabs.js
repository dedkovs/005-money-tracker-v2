// import React, { useEffect } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {
    // Switch,
    // Route,
    Link,
    // BrowserRouter
} from 'react-router-dom';
import { useHistory, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
// import Pagination from '@material-ui/lab/Pagination';
// import WalletMenu from '../Header/WalletMenu';
import Menu from '../Record/Menu';
// import DialogRemoveRecord from '../Record/DialogRemoveRecord/DialogRemoveRecord';
import getGroups from './getGroups';
// import getRecordsBetween from './getRecordsBetween';
// import getRecordsIncome from './getRecordsIncome';
// import getRecordsExpences from './getRecordsExpences';
// import RecordsByDayHeader from './RecordsByDayHeader';
import {
    // createTheme,
    makeStyles,
    // ThemeProvider,
} from '@material-ui/core/styles';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
// import { setPageNumber } from '../../redux/slices/pageNumber';
import { setPageNumber } from '../../redux/slices/transactions2';
// import grey from '@material-ui/core/colors/grey';
// import { useTheme } from '@material-ui/styles';
// import { light } from '../../services/theme';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import DialogRemoveRecord from '../Record/DialogRemoveRecord/DialogRemoveRecord';

const useStyles = makeStyles((theme) => ({
    toolbarMargin: {
        ...theme.mixins.toolbar,
    },
    recordsContainer1: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        // marginTop: 10,
    },

    tabs: {
        display: 'block',
        // justifyContent: 'center',
        // width: 1000,
        margin: '0 auto',
        // maxWidth: 500,
        marginTop: 15,
        // minWidth: 320,
        // width: '95%',
        // margin: '20px 0',
        // '@media (max-width:360px)': {
        // display: 'block',
        // margin: '0 auto',
        // maxWidth: 340,
        // },
    },
    tabs1: {
        maxWidth: 340,
    },
    tabs2: {
        maxWidth: 500,
    },
    tabRoot: {
        // '@media(min-width:600px': {
        minWidth: 'unset',
        // },
    },
    tabLabel: {
        textTransform: 'none',
        fontWeight: 400,
        whiteSpace: 'pre-line',
        color: theme.palette.text1,
        lineHeight: '1.3rem',
    },
    tabsScroller: {
        // color: 'green',
    },
    tabsIndicator: {
        backgroundColor: theme.palette.tabsIndicatorColor,
    },
    pagination: {
        marginTop: 90,
        '& > ul': {
            justifyContent: 'center',
        },
    },
    headerMonth: {
        fontSize: '1.5em',
        fontWeight: 300,
        opacity: 0.7,
        margin: '0 auto',
        marginTop: 15,
        maxWidth: '500px',
        textAlign: 'center',
        color: theme.palette.text1,
    },
    recordsGroupDate: {
        '& > :last-child': {
            marginBottom: 50,
        },
    },
    paginationColor: {
        color: theme.palette.common.blueSwitch,
    },
}));

// const OneMonth = ({ id }) => {
//     return <div>{id}</div>;
// };

const DataTabs = () => {
    // const allTabs = ['/', '/tab2', '/tab3', '/tab4', '/tab5'];

    // const pageNumber = useAppSelector(
    //     (state) => state.transactions2.pageNumber
    // );
    const dispatch = useAppDispatch();
    // const theme = useTheme();
    const transactions = useAppSelector(
        (state) => state.transactions2.transactions
    );

    const history = useHistory();
    let location = useLocation();
    // console.log(location.pathname);
    const matches = useMediaQuery('(max-width:360px)');
    // useEffect(() => {
    //     if (transactions.length > 0) {
    //         history.push(`/${getGroups(transactions)[pageNumber - 1].month}`);
    //     }
    // }, [transactions.length]);

    // console.log(transactions);
    // if (getGroups(transactions).length > 0) {
    // console.log(getGroups(transactions));
    // }

    // const headerMonth = getGroups(transactions)[pageNumber - 1]
    //     ? getGroups(transactions)[pageNumber - 1].month
    //     : null;

    const classes = useStyles();

    // const paginationTheme = createTheme({
    //     palette: {
    //         type: theme === light ? 'light' : 'dark',
    //         text: {
    //             primary: grey[600],
    //         },
    //         action: {
    //             hover:
    //                 theme === light
    //                     ? 'rgba(0, 0, 0, 0.04)'
    //                     : 'rgba(255, 255, 255, 0.04)',
    //         },
    //         primary: {
    //             main: theme === light ? grey[300] : grey[500],
    //         },
    //     },
    // });

    // const getGroup = (month) => {
    // console.log(
    //     getGroups(transactions).filter((group) => group.month === month)
    // );
    // return getGroups(transactions).filter((group) => group.month === month);
    // };

    const getPageNumberFromMonth = (month) => {
        let m = month.slice(1).slice(0, -4).concat(' ').concat(month.slice(-4));
        let index = getGroups(transactions).findIndex((obj) => obj.month === m);
        // console.log(index);
        return index + 1;
    };

    return (
        <div
        // style={{ minWidth: 360 }}
        >
            <Menu />
            <DialogRemoveRecord />
            <Header />
            {/* <div className={classes.recordsContainer1}> */}
            <div className={classes.toolbarMargin} />
            <div
                className={`${classes.tabs} ${
                    matches ? classes.tabs1 : classes.tabs2
                }`}
            >
                {transactions.length > 0 ? (
                    <Tabs
                        classes={{
                            scroller: classes.tabsScroller,
                            indicator: classes.tabsIndicator,
                        }}
                        value={
                            location.pathname === '/'
                                ? `/${getGroups(transactions)[0].month.replace(
                                      /\s+/g,
                                      ''
                                  )}`
                                : location.pathname
                        }
                        // value={`/${getGroups(transactions)[
                        //     pageNumber - 1
                        // ].month.replace(/\s+/g, '')}`}
                        // value={false}
                        variant="scrollable"
                        scrollButtons="auto"
                        // indicatorColor="primary"
                        onChange={(e, p) => {
                            // console.log(p);
                            dispatch(setPageNumber(getPageNumberFromMonth(p)));
                            history.push(p);
                        }}
                        // centered
                    >
                        {getGroups(transactions).map((group, index) => (
                            <Tab
                                classes={{
                                    root: classes.tabRoot,
                                    wrapper: classes.tabLabel,
                                }}
                                key={group.month}
                                label={`${group.month.slice(0, 3)}
                                    ${group.month.slice(-4)}`}
                                value={`/${group.month.replace(/\s+/g, '')}`}
                                component={Link}
                                to={`/${group.month.replace(/\s+/g, '')}`}
                            />
                        ))}
                    </Tabs>
                ) : null}
            </div>
            {/* </div> */}
        </div>
    );
};

export default DataTabs;
