import React, { useState } from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { light, dark } from '../services/theme';
import Layout from './Layout';
import axios from 'axios';
import Routes from './Routes';
import { setAllTransactions } from '../redux/slices/transactions';
import { setIsAuth } from '../redux/slices/isAuth';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
// import SecretPage from './SecretPage';
// import Spinner from './Spinner';
// import Header from './Header/Header';
// import AddTransactionButton from './Header/AddTransactionButton';

const App = () => {
    const isAuth = useAppSelector((state) => state.isAuth);
    const darkTheme = useAppSelector((state) => state.darkTheme);
    // const transactions = useAppSelector((state) => state.transactions);
    // const showComments = useAppSelector((state) => state.showComments);
    // const prevShowComments = showComments;
    // let sc = !!showComments;
    const dispatch = useAppDispatch();

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState(false);

    const onError = (err: Error) => {
        setError(true);
        setLoading(false);
        console.log(err);
        console.log('error: ', error);
    };

    const [errorRegister, setErrorRegister] = React.useState('');

    React.useEffect(() => {
        // console.log('isAuth changed: ', isAuth);
        // dispatch(fetchAuth);
        setLoading(true);
        axios
            .get('/isauth')
            .then((res) => {
                dispatch(setIsAuth(res.data.isAuth));
                if (isAuth) {
                    axios
                        .get(`/getdata/${res.data.userId}`)
                        .then((res) => {
                            setLoading(false);
                            dispatch(setAllTransactions(res.data));
                        })
                        .catch((err) => {
                            setLoading(false);
                            console.log(err);
                        });
                } else {
                    setLoading(false);
                }
            })
            .catch((err) => {
                setLoading(false);
                onError(err);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuth]);

    // useEffect(() => {
    //     console.log('showComments changed: ', showComments);
    // }, [showComments]);

    return (
        <ThemeProvider theme={darkTheme ? dark : light}>
            <Layout>
                {/* <Header /> */}
                {/* <AddTransactionButton /> */}
                {/* <SecretPage /> */}
                <Routes
                    loading={loading}
                    setLoading={setLoading}
                    errorRegister={errorRegister}
                    setErrorRegister={setErrorRegister}
                    // showComments={showComments}
                    // prevShowComments={prevShowComments}
                />
            </Layout>
        </ThemeProvider>
    );
};

export default App;
