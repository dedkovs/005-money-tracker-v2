import { useState, useEffect } from 'react';
import { ThemeProvider, StyledEngineProvider } from '@material-ui/core/styles';
import { light, dark } from '../services/theme';
import Layout from './Layout';
import axios from 'axios';
import Routes from './Routes';
import { setIsAuth } from '../redux/slices/user';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setUserData, setUserId } from '../redux/slices/user';

// declare module '@material-ui/styles/defaultTheme' {
// eslint-disable-next-line @typescript-eslint/no-empty-interface
// interface DefaultTheme extends Theme {}
// }

const App = () => {
	const isAuth = useAppSelector((state) => state.user.isAuth);
	const darkTheme = useAppSelector((state) => state.user.darkTheme);

	const dispatch = useAppDispatch();

	const [loading, setLoading] = useState(false);
	// const [error, setError] = useState(false);

	// const onError = (err: Error) => {
	// 	setError(true);
	// 	setLoading(false);
	// 	console.log(err);
	// 	console.log('error: ', error);
	// };

	const [errorRegister, setErrorRegister] = useState('');
	// console.log(light);

	useEffect(() => {
		setLoading(true);
		axios
			.get('/isauth')
			.then((res) => {
				setLoading(false);
				dispatch(setIsAuth(res.data.isAuth));
				// console.log(res.data);
				dispatch(setUserId(res.data.userId));
				if (isAuth) {
					// console.log('IS AUTH!!!');
					axios.get(`/getdata/${res.data.userId}`).then((res) => {
						dispatch(setUserData(res.data));
						// console.log(res.data);
					});
				}
			})
			.catch((err) => {
				setLoading(false);
				console.log(err);
				// onError(err);
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isAuth]);

	return (
		<StyledEngineProvider injectFirst>
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
		</StyledEngineProvider>
	);
};

export default App;
