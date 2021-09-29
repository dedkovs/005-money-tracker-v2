import { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {
	ThemeProvider,
	StyledEngineProvider,
	createTheme,
} from '@material-ui/core/styles';
import makeStyles from '@material-ui/styles/makeStyles';
import { setOpenTransactionForm } from '../../redux/slices/user';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import Header from './Header';
import Sum from './Sum';
import Wallet from './Wallet';
import Arrow from './Arrow';
import Category from './Category';
import Subcategory from './Subcategory';
import Date1 from './Date';
import Comment from './Comment';
import SaveButton from './SaveButton';

const useStyles = makeStyles((theme) => ({
	paper: {
		color: theme.palette.transactionFormColor,
		backgroundColor: theme.palette.background.paper,
	},
	paperFullWidth: {
		width: '100%',
	},
	paperWidthSm: {
		minWidth: 340,
		maxWidth: 360,
	},
	dialogContent1: {
		padding: 0,
		'&:first-child': {
			paddingTop: 0,
		},
	},
	dialogContent2: {
		height: '100%',
		padding: 0,
		'&:first-child': {
			paddingTop: 0,
		},
	},
	paper1: {
		position: 'absolute',
		top: 80,
		margin: 0,
		borderRadius: 23,
	},
	paper2: {
		borderRadius: 23,
	},
}));

const TransactionForm = () => {
	// alert(new Date().toLocaleDateString());
	const classes = useStyles();
	const matches = useMediaQuery('(max-width:360px)');
	const openTransactionForm = useAppSelector(
		(state) => state.user.openTransactionForm
	);
	const formType = useAppSelector((state) => state.user.formType);
	const expensesDate = useAppSelector((state) => state.user.expensesDate);
	const incomeDate = useAppSelector((state) => state.user.incomeDate);

	const dispatch = useAppDispatch();

	const darkTheme = useAppSelector((state) => state.user.darkTheme);

	const theme = createTheme({
		palette: {
			mode: darkTheme ? 'dark' : 'light',
			primary: {
				main: formType === 'expenses' ? '#40a7e2' : '#59af35',
			},
		},
	});

	const [date, setDate] = useState(
		new Date(formType === 'expenses' ? expensesDate : incomeDate)
	);

	return (
		<StyledEngineProvider injectFirst>
			<ThemeProvider theme={theme}>
				<Dialog
					style={{ zIndex: 1302 }}
					open={openTransactionForm}
					onClose={() => {
						dispatch(setOpenTransactionForm(false));
					}}
					classes={{
						paperFullWidth: classes.paperFullWidth,
						paperWidthSm: classes.paperWidthSm,
						paper: `${matches ? classes.paper2 : classes.paper1} ${
							classes.paper
						}`,
					}}
					fullWidth
					maxWidth="sm"
				>
					<DialogContent
						className={`${
							matches ? classes.dialogContent2 : classes.dialogContent1
						}`}
					>
						<Header setDate={setDate} />
						<Sum />
						<Wallet />
						<Arrow />
						<Category />
						<Subcategory />
						<Date1 date={date} setDate={setDate} />
						<Comment />
						<SaveButton />
					</DialogContent>
				</Dialog>
			</ThemeProvider>
		</StyledEngineProvider>
	);
};

export default TransactionForm;
