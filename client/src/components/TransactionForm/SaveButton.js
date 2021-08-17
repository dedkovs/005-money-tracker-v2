import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/styles/makeStyles';
import {
	ThemeProvider,
	StyledEngineProvider,
	createTheme,
} from '@material-ui/core/styles';
import { amber } from '@material-ui/core/colors';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { saveTrx } from '../../redux/slices/user';

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
		updWallet = [updWallet[0] + expensesSum * 100, updWallet[1], updWallet[2]];
		const updatedWallet = { [expensesWallet]: updWallet };
		const trx = {
			comment: expensesComment,
			date: expensesDate,
			expenses_category: expensesCategory,
			expenses_subcategory: expensesSubcategory,
			income_category: null,
			income_subcategory: null,
			sum: expensesSum * 100,
			wallet: expensesWallet,
			wallet_from: null,
			wallet_to: null,
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
		const updatedWallet = { [incomeWallet]: updWallet };
		const trx = {
			comment: incomeComment,
			date: incomeDate,
			expenses_category: null,
			expenses_subcategory: null,
			income_category: incomeCategory,
			income_subcategory: incomeSubcategory,
			sum: incomeSum * 100,
			wallet: incomeWallet,
			wallet_from: null,
			wallet_to: null,
		};
		const updatedWallets = {
			...wallets,
			...updatedWallet,
		};

		return { userId, trx, updatedWallets };
	};

	const handleSaveTransaction = () => {
		if (formType === 'income') {
			if (incomeSum !== '' && Math.abs(incomeSum) !== 0 && !isNaN(incomeSum)) {
				dispatch(saveTrx(getNewIncomeTrx()));
			}
		}

		if (formType === 'expenses') {
			if (
				expensesSum !== '' &&
				Math.abs(expensesSum) !== 0 &&
				!isNaN(expensesSum)
			) {
				dispatch(saveTrx(getNewExpensesTrx()));
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
