import { Dispatch, SetStateAction } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from 'react-router-dom';
import Header from './Header/Header';
import Login from './Login/Login';
import Register from './Register';
import StartHeader from './StartHeader/StartHeader';
import Spinner from './Spinner';
import TransactionForm from './TransactionForm/TransactionForm';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { setOpenDrawer } from '../redux/slices/openDrawer';
import { setOpenTransactionForm } from '../redux/slices/openTransactionForm';
import Data from './Data/Data';
import DataTabs from './Data/DataTabs';
import RecordsByDayHeader from './Data/RecordsByDayHeader';
import { makeStyles } from '@material-ui/core/styles';
import getRecordsBetween from './Data/getRecordsBetween';
import getRecordsIncome from './Data/getRecordsIncome';
import getRecordsExpences from './Data/getRecordsExpences';

interface Props {
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
    errorRegister: string;
    setErrorRegister: Dispatch<SetStateAction<string>>;
}

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
        margin: '0 auto',
        maxWidth: 500,
        minWidth: 320,
        width: 'calc(100% - 20px)',
        marginTop: 30,
        marginBottom: 30,
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

const Routes = (props: Props) => {
    const isAuth = useAppSelector((state) => state.isAuth);
    const dispatch = useAppDispatch();
    const transactions = useAppSelector(
        (state) => state.transactions2.transactions
    );
    const pageNumber = useAppSelector(
        (state) => state.transactions2.pageNumber
    );
    const groupsByMonth = useAppSelector(
        (state) => state.transactions2.groupsByMonth
    );

    const classes = useStyles();

    const getGroup = (month: string) => {
        return groupsByMonth.filter((group) => group.month === month);
    };

    return (
        <Router>
            <Switch>
                <Route
                    path="/auth/google/callback"
                    render={() => {
                        return <Redirect to="/" />;
                    }}
                />
                <Route
                    exact
                    path="/"
                    render={() => {
                        dispatch(setOpenTransactionForm(false));
                        return props.loading ? (
                            <Spinner />
                        ) : isAuth ? (
                            <>
                                <Header />
                                <DataTabs />
                                {transactions.length > 0 ? (
                                    <div className={classes.recordsContainer2}>
                                        {groupsByMonth[pageNumber].records.map(
                                            (group) => {
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

                                                        {getRecordsBetween(
                                                            group.records
                                                        )}

                                                        {getRecordsIncome(
                                                            group.records
                                                        )}

                                                        {getRecordsExpences(
                                                            group.records
                                                        )}
                                                    </div>
                                                );
                                            }
                                        )}
                                    </div>
                                ) : null}
                            </>
                        ) : (
                            <Redirect to="/login" />
                        );
                    }}
                />
                <Route
                    exact
                    path="/login"
                    render={() => {
                        dispatch(setOpenTransactionForm(false));
                        return props.loading ? (
                            <Spinner />
                        ) : isAuth ? (
                            <Redirect to="/" />
                        ) : (
                            <>
                                <StartHeader />
                                <Login />
                            </>
                        );
                    }}
                />
                <Route
                    exact
                    path="/register"
                    render={() => {
                        dispatch(setOpenTransactionForm(false));
                        return isAuth ? (
                            <Redirect to="/" />
                        ) : (
                            <>
                                <StartHeader />
                                <Register />
                            </>
                        );
                    }}
                />
                <Route
                    exact
                    path="/data/add-transaction"
                    render={() => {
                        dispatch(setOpenDrawer(false));
                        dispatch(setOpenTransactionForm(true));
                        return isAuth ? (
                            <>
                                <Data />
                                <TransactionForm />
                            </>
                        ) : (
                            <Redirect to="/" />
                        );
                    }}
                />
                <Route
                    exact
                    path="/:month"
                    render={({ match }) => {
                        const { month } = match.params;

                        return (
                            <>
                                <Header />
                                {transactions.length > 0 &&
                                isAuth &&
                                getGroup(
                                    `${month.slice(0, -4)} ${month.slice(-4)}`
                                )[0] ? (
                                    <div className={classes.recordsContainer1}>
                                        <DataTabs />
                                        <div
                                            className={
                                                classes.recordsContainer2
                                            }
                                        >
                                            {getGroup(
                                                `${month.slice(
                                                    0,
                                                    -4
                                                )} ${month.slice(-4)}`
                                            )[0].records.map((group: any) => {
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

                                                        {getRecordsBetween(
                                                            group.records
                                                        )}

                                                        {getRecordsIncome(
                                                            group.records
                                                        )}

                                                        {getRecordsExpences(
                                                            group.records
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ) : (
                                    <Redirect to="/" />
                                )}
                            </>
                        );
                    }}
                />
                <Route path="/" render={() => <Redirect to="/" />} />
            </Switch>
        </Router>
    );
};

export default Routes;
