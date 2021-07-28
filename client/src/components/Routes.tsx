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
import Records from './Data/Records';
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
                                <Records />
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
                <Route path="/" render={() => <Redirect to="/" />} />
            </Switch>
        </Router>
    );
};

export default Routes;
