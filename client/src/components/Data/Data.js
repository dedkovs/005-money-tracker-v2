import React from 'react';
import Header from '../Header/Header';
import Pagination from '@material-ui/lab/Pagination';
// import WalletMenu from '../Header/WalletMenu';
// import Menu from '../Record/Menu';
// import DialogRemoveRecord from '../Record/DialogRemoveRecord/DialogRemoveRecord';
import getGroups from './getGroups';
import getRecordsBetween from './getRecordsBetween';
import getRecordsIncome from './getRecordsIncome';
import getRecordsExpences from './getRecordsExpences';
import RecordsByDayHeader from './RecordsByDayHeader';
import {
    createTheme,
    makeStyles,
    ThemeProvider,
} from '@material-ui/core/styles';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
// import { setPageNumber } from '../../redux/slices/pageNumber';
import { setPageNumber } from '../../redux/slices/transactions2';
import grey from '@material-ui/core/colors/grey';
import { useTheme } from '@material-ui/styles';
import { light } from '../../services/theme';

const useStyles = makeStyles((theme) => ({
    toolbarMargin: {
        ...theme.mixins.toolbar,
    },
    recordsContainer1: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    recordsContainer2: {
        display: 'block',
        maxWidth: 500,
        minWidth: 320,
        width: '95%',
        margin: '20px 0',
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

const Data = () => {
    const pageNumber = useAppSelector(
        (state) => state.transactions2.pageNumber
    );
    const dispatch = useAppDispatch();
    // const [page, setPage] = React.useState(1);
    const theme = useTheme();
    const transactions = useAppSelector(
        (state) => state.transactions2.transactions
    );

    const headerMonth = getGroups(transactions)[pageNumber - 1]
        ? getGroups(transactions)[pageNumber - 1].month
        : null;

    const classes = useStyles();

    const paginationTheme = createTheme({
        palette: {
            type: theme === light ? 'light' : 'dark',
            text: {
                primary: grey[600],
            },
            action: {
                hover:
                    theme === light
                        ? 'rgba(0, 0, 0, 0.04)'
                        : 'rgba(255, 255, 255, 0.04)',
            },
            primary: {
                main: theme === light ? grey[300] : grey[500],
            },
        },
    });

    return (
        <div style={{ minWidth: 360 }}>
            {/* <Menu /> */}
            {/* <WalletMenu /> */}
            {/* <DialogRemoveRecord /> */}
            <Header />

            <div className={classes.recordsContainer1}>
                {transactions.length > 0 ? (
                    <>
                        <ThemeProvider theme={paginationTheme}>
                            <Pagination
                                className={classes.pagination}
                                count={getGroups(transactions).length}
                                page={pageNumber}
                                onChange={(e, p) => dispatch(setPageNumber(p))}
                                color={'primary'}
                            ></Pagination>
                        </ThemeProvider>

                        <div className={classes.headerMonth}>{headerMonth}</div>

                        <div className={classes.recordsContainer2}>
                            {getGroups(transactions)[pageNumber - 1]
                                ? getGroups(transactions)[
                                      pageNumber - 1
                                  ].records.map((group) => {
                                      return (
                                          <div
                                              key={group.day}
                                              className={
                                                  classes.recordsGroupDate
                                              }
                                          >
                                              <RecordsByDayHeader
                                                  group={group}
                                              />

                                              {getRecordsBetween(group.records)}

                                              {getRecordsIncome(group.records)}

                                              {getRecordsExpences(
                                                  group.records
                                              )}
                                          </div>
                                      );
                                  })
                                : dispatch(
                                      setPageNumber(
                                          (pageNumber) => pageNumber - 1
                                      )
                                  )}
                        </div>
                    </>
                ) : null}
            </div>
        </div>
    );
};

export default Data;
