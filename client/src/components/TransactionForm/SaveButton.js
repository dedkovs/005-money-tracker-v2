import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
// import axios from 'axios';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import { amber } from '@material-ui/core/colors';
import CircularProgress from '@material-ui/core/CircularProgress';
// import { useHistory } from 'react-router';
// import getNewIncomeTrx from './getNewIncomeTrx';
// import getNewExpensesTrx from './getNewExpensesTrx';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
// axios.defaults.baseURL =
// 'https://europe-west2-keep-track-of-the-budget.cloudfunctions.net/api';

// axios.defaults.baseURL =
// 	'http://localhost:5000/keep-track-of-the-budget/europe-west2/api';

const useStyles = makeStyles(() => ({
	saveButtonContainer: {
		display: 'flex',
		justifyContent: 'center',
		marginTop: '2.5em',
		marginBottom: '2.5em',
	},
	spinner2: {
		position: 'absolute',
		left: 0,
		right: 0,
		marginLeft: 'auto',
		marginRight: 'auto',
		top: 3,
	},
}));

const SaveButton = () => {
	const classes = useStyles();

	const darkTheme = useAppSelector((state) => state.user.darkTheme);
	const loading = useAppSelector((state) => state.user.loading);
	const formType = useAppSelector((state) => state.user.formType);

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
			type: darkTheme ? 'dark' : 'light',
			primary: {
				main: amber[500],
			},
		},
	});

	const getNewExpensesTrx = () => {
		let updWallet = wallets[expensesWallet];
		updWallet = [updWallet[0] + expensesSum, updWallet[1], updWallet[2]];
		return {
			sum: expensesSum,
			wallet: expensesWallet,
			expenses_category: expensesCategory,
			expenses_subcategory: expensesSubcategory,
			income_category: null,
			income_subcategory: null,
			wallet_from: null,
			wallet_to: null,
			date: `${new Date(expensesDate).getFullYear()}-${new Date(
				expensesDate
			).getMonth()}-${new Date(expensesDate).getDate()}`,
			comment: expensesComment,
			updatedWallet: updWallet,
		};
	};

	const getNewIncomeTrx = () => {
		let updWallet = wallets[incomeWallet];
		updWallet = [updWallet[0] + incomeSum, updWallet[1], updWallet[2]];
		return {
			sum: incomeSum,
			wallet: incomeWallet,
			expenses_category: null,
			expenses_subcategory: null,
			income_category: incomeCategory,
			income_subcategory: incomeSubcategory,
			wallet_from: null,
			wallet_to: null,
			date: `${new Date(incomeDate).getFullYear()}-${new Date(
				incomeDate
			).getMonth()}-${new Date(incomeDate).getDate()}`,
			comment: incomeComment,
			updatedWallet: updWallet,
		};
	};

	const saveTrx = () => {
		if (formType === 'income') {
			if (incomeSum !== '' && Math.abs(incomeSum) !== 0 && !isNaN(incomeSum)) {
				// dispatch(saveTrx(getNewIncomeTrx()));
				console.log(getNewIncomeTrx());
			}
		}

		if (formType === 'expenses') {
			if (
				expensesSum !== '' &&
				Math.abs(expensesSum) !== 0 &&
				!isNaN(expensesSum)
			) {
				// dispatch(saveTrx(getNewExpensesTrx()));
				console.log(getNewExpensesTrx());
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
					saveTrx();
				}}
			>
				Save
				{loading && (
					<ThemeProvider theme={spinnerColor}>
						<CircularProgress size={30} className={classes.spinner2} />
					</ThemeProvider>
				)}
			</Button>
		</div>
	);
};

export default SaveButton;
