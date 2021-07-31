import { makeStyles } from '@material-ui/core/styles';
// import { dark } from '../../services/theme';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
// import { useHistory } from 'react-router-dom';
// import { inject, observer } from 'mobx-react';
// import { store } from '../../mobx/store';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setFormType } from '../../redux/slices/ui';
import { setOpenTransactionForm } from '../../redux/slices/open';

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
			theme.palette.type === 'dark'
				? 'rgba(255,255,255,0.2)'
				: 'rgba(0,0,0,0.2)',
		paddingTop: 8,
		cursor: 'pointer',
	},
	FormExpensesLinkIncome: {
		color:
			theme.palette.type === 'dark'
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

const Header = () => {
	const classes = useStyles();
	// const history = useHistory();
	const dispatch = useAppDispatch();

	const formType = useAppSelector((state) => state.ui.formType);

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
					if (formType !== 'expenses') dispatch(setFormType('expenses'));
				}}
			>
				Expense
			</Typography>

			<Typography
				className={`${getIncomeClassName()}`}
				variant={'h5'}
				onClick={() => {
					if (formType !== 'income') dispatch(setFormType('income'));
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
						// history.push('/data');
						dispatch(setOpenTransactionForm(false));
					}}
					className={classes.closeIcon}
				>
					<CloseIcon />
				</IconButton>
			</Tooltip>
		</div>
	);
};

export default Header;
