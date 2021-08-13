import Button from '@material-ui/core/Button';
// import { adaptV4Theme } from '@material-ui/core/styles';
import makeStyles from '@material-ui/styles/makeStyles';
// import axios from 'axios';
import {
	ThemeProvider,
	StyledEngineProvider,
	createTheme,
} from '@material-ui/core/styles';
import { amber } from '@material-ui/core/colors';
import CircularProgress from '@material-ui/core/CircularProgress';
// import { useHistory } from 'react-router';
// import getNewIncomeTrx from './getNewIncomeTrx';
// import getNewExpensesTrx from './getNewExpensesTrx';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { saveTrx } from '../../redux/slices/user';
// axios.defaults.baseURL =
// 'https://europe-west2-keep-track-of-the-budget.cloudfunctions.net/api';

// axios.defaults.baseURL =
// 	'http://localhost:5000/keep-track-of-the-budget/europe-west2/api';
// import { setUserData } from '../../redux/slices/user';

const useStyles = makeStyles({
	saveButtonContainer: {
		display: 'flex',
		justifyContent: 'center',
		marginTop: '2.5em',
		marginBottom: '2.5em',
	},
	saveButton: {
		color: 'white',
	},
	spinner2: {
		position: 'absolute',
		left: 0,
		right: 0,
		marginLeft: 'auto',
		marginRight: 'auto',
		top: 3,
	},
});

const SaveButton = () => {
	const classes = useStyles();
	const dispatch = useAppDispatch();

	const darkTheme = useAppSelector((state) => state.user.darkTheme);
	const loading = useAppSelector((state) => state.user.loading);
	const formType = useAppSelector((state) => state.user.formType);

	const userId = useAppSelector((state) => state.user.userId);

	const incomeSum = useAppSelector((state) => state.user.incomeSum);
	const expensesSum = useAppSelector((state) => state.user.expensesSum);

	const wallets = useAppSelector((state) => state.user.wallets);

	const expensesWallet = useAppSelector((state) => state.user.expensesWallet);
	const incomeWallet = useAppSelector((state) => state.user.incomeWallet);

	const expensesCategory = useAppSelector(
		(state) => state.user.expensesCategory
	);
	const expensesSubcategory = useAppSelector(
		(state) => state.user.expensesSubcategory
	);

	const incomeCategory = useAppSelector((state) => state.user.incomeCategory);
	const incomeSubcategory = useAppSelector(
		(state) => state.user.incomeSubcategory
	);

	const expensesDate = useAppSelector((state) => state.user.expensesDate);
	const incomeDate = useAppSelector((state) => state.user.incomeDate);

	const expensesComment = useAppSelector((state) => state.user.expensesComment);
	const incomeComment = useAppSelector((state) => state.user.incomeComment);

	// const history = useHistory();

	const spinnerColor = createTheme({
		palette: {
			mode: darkTheme ? 'dark' : 'light',
			primary: {
				main: amber[500],
			},
		},
	});

	const getNewExpensesTrx = () => {
		let updWallet = wallets[expensesWallet];
		// console.log(updWallet);
		updWallet = [updWallet[0] + expensesSum * 100, updWallet[1], updWallet[2]];
		// console.log(updWallet);
		const updatedWallet = { [expensesWallet]: updWallet };
		// console.log('updatedWallet: ', updatedWallet);
		const trx = {
			sum: expensesSum * 100,
			wallet: expensesWallet,
			expenses_category: expensesCategory,
			expenses_subcategory: expensesSubcategory,
			income_category: null,
			income_subcategory: null,
			wallet_from: null,
			wallet_to: null,
			date: expensesDate,
			comment: expensesComment,
			// updatedWallet: updWallet,
		};
		const updatedWallets = {
			...wallets,
			...updatedWallet,
		};

		return { userId, trx, updatedWallets };
	};

	const getNewIncomeTrx = () => {
		let updWallet = wallets[incomeWallet];
		updWallet = [updWallet[0] + incomeSum * 100, updWallet[1], updWallet[2]];
		const trx = {
			sum: incomeSum * 100,
			wallet: incomeWallet,
			expenses_category: null,
			expenses_subcategory: null,
			income_category: incomeCategory,
			income_subcategory: incomeSubcategory,
			wallet_from: null,
			wallet_to: null,
			date: incomeDate,
			comment: incomeComment,
			// updatedWallet: updWallet,
		};
		return { userId, trx, updWallet };
	};

	const handleSaveTransaction = () => {
		if (formType === 'income') {
			if (incomeSum !== '' && Math.abs(incomeSum) !== 0 && !isNaN(incomeSum)) {
				dispatch(saveTrx(getNewIncomeTrx()));
				// console.log(getNewIncomeTrx());
			}
		}

		if (formType === 'expenses') {
			if (
				expensesSum !== '' &&
				Math.abs(expensesSum) !== 0 &&
				!isNaN(expensesSum)
			) {
				dispatch(saveTrx(getNewExpensesTrx()));
				// .then(() => {
				// 	axios
				// 		.get(`/getdata/${userId}`)
				// 		.then((res) => {
				// 			dispatch(setUserData(res.data));
				// 		})
				// 		.catch((err) => console.log(err));
				// })
				// .catch((err) => console.log(err));
				// console.log(getNewExpensesTrx());
			}
		}
	};

	return (
		<div className={classes.saveButtonContainer}>
			<Button
				type={'submit'}
				variant="contained"
				color="primary"
				onClick={() => {
					handleSaveTransaction();
				}}
				className={classes.saveButton}
			>
				Save
				{loading && (
					<StyledEngineProvider injectFirst>
						<ThemeProvider theme={spinnerColor}>
							<CircularProgress size={30} className={classes.spinner2} />
						</ThemeProvider>
					</StyledEngineProvider>
				)}
			</Button>
		</div>
	);
};

export default SaveButton;
