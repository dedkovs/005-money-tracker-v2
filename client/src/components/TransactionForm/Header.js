import makeStyles from '@material-ui/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setFormType } from '../../redux/slices/user';
import { setOpenTransactionForm } from '../../redux/slices/user';

const useStyles = makeStyles((theme) => ({
	tooltip: {
		fontSize: '0.9rem',
	},
	closeIcon: {
		right: 0,
		top: 0,
	},
	FormExpensesHeader: {
		position: 'relative',
		display: 'flex',
		justifyContent: 'space-between',
		paddingLeft: 20,
		'& > h3': {
			margin: 0,
			fontSize: '1.6rem',
		},
	},
	FormExpensesLinkExpenses: {
		color: '#40a7e2',
		paddingTop: 8,
	},
	FormIncomeLinkExpenses: {
		color:
			theme.palette.mode === 'dark'
				? 'rgba(255,255,255,0.2)'
				: 'rgba(0,0,0,0.2)',
		paddingTop: 8,
		cursor: 'pointer',
	},
	FormExpensesLinkIncome: {
		color:
			theme.palette.mode === 'dark'
				? 'rgba(255,255,255,0.2)'
				: 'rgba(0,0,0,0.2)',
		paddingTop: 8,
		paddingLeft: 10,
		cursor: 'pointer',
	},
	FormIncomeLinkIncome: {
		color: '#59af35',
		paddingTop: 8,
		paddingLeft: 10,
		opacity: 1,
	},
}));

const Header = (props) => {
	const classes = useStyles();
	const dispatch = useAppDispatch();

	const formType = useAppSelector((state) => state.user.formType);
	const expensesDate = useAppSelector((state) => state.user.expensesDate);
	const incomeDate = useAppSelector((state) => state.user.incomeDate);

	const getIncomeClassName = () => {
		if (formType === 'expenses') {
			return classes.FormExpensesLinkIncome;
		}
		if (formType === 'income') {
			return classes.FormIncomeLinkIncome;
		}
	};

	const getExpensesClassName = () => {
		if (formType === 'expenses') {
			return classes.FormExpensesLinkExpenses;
		}
		if (formType === 'income') {
			return classes.FormIncomeLinkExpenses;
		}
	};

	return (
		<div className={classes.FormExpensesHeader}>
			<Typography
				className={`${getExpensesClassName()}`}
				variant={'h5'}
				onClick={() => {
					if (formType !== 'expenses') {
						dispatch(setFormType('expenses'));
						props.setDate(expensesDate);
					}
				}}
			>
				Expense
			</Typography>

			<Typography
				className={`${getIncomeClassName()}`}
				variant={'h5'}
				onClick={() => {
					if (formType !== 'income') {
						dispatch(setFormType('income'));
						props.setDate(incomeDate);
					}
				}}
			>
				Income
			</Typography>

			<Tooltip
				title={'Close'}
				placement="bottom"
				enterDelay={500}
				classes={{ tooltip: classes.tooltip }}
			>
				<IconButton
					onClick={() => {
						dispatch(setOpenTransactionForm(false));
					}}
					className={classes.closeIcon}
					size="large"
				>
					<CloseIcon />
				</IconButton>
			</Tooltip>
		</div>
	);
};

export default Header;
