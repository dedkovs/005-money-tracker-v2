import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {
	ThemeProvider,
	createTheme,
	makeStyles,
} from '@material-ui/core/styles';
// import {
//     useHistory,
//     BrowserRouter
// } from 'react-router-dom';
import { setOpenTransactionForm } from '../../redux/slices/user';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import Header from './Header';
import Sum from './Sum';
import Wallet from './Wallet';
import Arrow from './Arrow';
import Category from './Category';

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
		minHeight: 500,
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
	const classes = useStyles();
	const matches = useMediaQuery('(max-width:360px)');
	// const history = useHistory();
	const openTransactionForm = useAppSelector(
		(state) => state.user.openTransactionForm
	);
	const formType = useAppSelector((state) => state.user.formType);

	const dispatch = useAppDispatch();

	const darkTheme = useAppSelector((state) => state.user.darkTheme);

	const theme = createTheme({
		palette: {
			type: darkTheme ? 'dark' : 'light',
			primary: {
				main: formType === 'expenses' ? '#40a7e2' : '#59af35',
			},
		},
	});

	return (
		// <BrowserRouter>
		<ThemeProvider theme={theme}>
			<Dialog
				style={{ zIndex: 1302 }}
				open={openTransactionForm}
				onClose={() => {
					dispatch(setOpenTransactionForm(false));
					// history.push('/');
				}}
				classes={{
					// root: classes.dialogRoot,
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
					<Header />
					<Sum />
					<Wallet />
					<Arrow />
					<Category />
				</DialogContent>
			</Dialog>
		</ThemeProvider>

		// </BrowserRouter>
	);
};

export default TransactionForm;
