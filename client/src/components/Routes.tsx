import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from 'react-router-dom';
import Login from './Login/Login';
import Register from './Register';
import StartHeader from './StartHeader/StartHeader';
import SecretPage from './SecretPage';
import Spinner from './Spinner';
import Header from './Header/Header';
import { useAppSelector } from '../redux/hooks';

interface Props {
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    errorRegister: string;
    setErrorRegister: React.Dispatch<React.SetStateAction<string>>;
}

const Routes = (props: Props) => {
    const isAuth = useAppSelector((state) => state.isAuth);

    return (
        <>
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
                            return props.loading ? (
                                <Spinner />
                            ) : isAuth ? (
                                <>
                                    <Header />
                                    <SecretPage />
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
                    <Route path="/" render={() => <Redirect to="/" />} />
                </Switch>
            </Router>
        </>
    );
};

export default Routes;
