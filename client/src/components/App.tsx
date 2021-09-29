/// TO DO:
/// показывать где-нибудь имя пользователя/мэйл
/// 1 тема на всю TransactionForm?
/// ререндерить тулбар при показе/убирании центов
/// забыл пароль
/// поменять пароль

/// DONE:
/// значения по умолчанию при регистрации
/// демо вниз
/// прыгающий интерфейс (скроллинг) - избавился
/// удалить транзакцию и обновить кошельки

import { useState, useEffect } from 'react';
import { ThemeProvider, StyledEngineProvider } from '@material-ui/core/styles';
import { light, dark } from '../services/theme';
import Layout from './Layout';
import axios from 'axios';
import Routes from './Routes';
import { setIsAuth } from '../redux/slices/user';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setUserData, setUserId } from '../redux/slices/user';
import Typography from '@material-ui/core/Typography';

const App = () => {
	const isAuth = useAppSelector((state) => state.user.isAuth);
	const darkTheme = useAppSelector((state) => state.user.darkTheme);

	const dispatch = useAppDispatch();

	const [loading, setLoading] = useState(false);

	const [errorRegister, setErrorRegister] = useState('');

	useEffect(() => {
		setLoading(true);
		axios
			.get('/isauth')
			.then((res) => {
				setLoading(false);
				dispatch(setIsAuth(res.data.isAuth));
				dispatch(setUserId(res.data.userId));
				if (isAuth) {
					axios.get(`/getdata/${res.data.userId}`).then((res) => {
						dispatch(setUserData(res.data));
					});
				}
			})
			.catch((err) => {
				setLoading(false);
				console.log(err);
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isAuth]);

	const demo = (
		<div
			style={{
				position: 'fixed',
				textAlign: 'center',
				left: '50%',
				transform: 'translateX(-50%)',
				opacity: 0.7,
				bottom: 10,
				zIndex: 2,
			}}
		>
			<Typography variant="body1" fontSize="small">
				* DEMO *
			</Typography>
		</div>
	);

	return (
		<>
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
			{demo}
		</>
	);
};

export default App;
