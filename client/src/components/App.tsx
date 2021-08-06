import { useState, useEffect } from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { light, dark } from '../services/theme';
import Layout from './Layout';
import axios from 'axios';
import Routes from './Routes';
import { setIsAuth } from '../redux/slices/user';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
	setAllTransactions,
	// setWallets,
	// setWalletsTopOrder,
	// setWalletsOrder,
	setUserData,
} from '../redux/slices/user';
// import { setExpensesWallet, setIncomeWallet } from '../redux/slices/user';

const App = () => {
	const isAuth = useAppSelector((state) => state.user.isAuth);
	const darkTheme = useAppSelector((state) => state.user.darkTheme);

	const dispatch = useAppDispatch();

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	const onError = (err: Error) => {
		setError(true);
		setLoading(false);
		console.log(err);
		console.log('error: ', error);
	};

	const [errorRegister, setErrorRegister] = useState('');

	useEffect(() => {
		setLoading(true);
		axios
			.get('/isauth')
			.then((res) => {
				setLoading(false);
				dispatch(setIsAuth(res.data.isAuth));
				// console.log('from App: ', res.data);
				if (isAuth) {
					axios.get(`/getdata/${res.data.userId}`).then((res) => {
						// dispatch(setAllTransactions(res.data.transactions));
						dispatch(setUserData(res.data));
						// dispatch(setWallets(res.data.wallets));
						// dispatch(setWalletsTopOrder(res.data.wallets_top_order));
						// dispatch(setWalletsOrder(res.data.wallets_order));
						// dispatch(setExpensesWallet(res.data.wallets_order[0]));
						// dispatch(setIncomeWallet(res.data.wallets_order[0]));
					});
				}
			})
			.catch((err) => {
				setLoading(false);
				onError(err);
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isAuth]);

	return (
		<ThemeProvider theme={darkTheme ? dark : light}>
			<Layout>
				<Routes
					loading={loading}
					setLoading={setLoading}
					errorRegister={errorRegister}
					setErrorRegister={setErrorRegister}
				/>
			</Layout>
		</ThemeProvider>
	);
};

export default App;
