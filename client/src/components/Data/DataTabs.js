import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useHistory, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Menu from '../Record/Menu';
import { makeStyles } from '@material-ui/core/styles';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { setPageNumber } from '../../redux/slices/transactions2';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import DialogRemoveRecord from '../Record/DialogRemoveRecord/DialogRemoveRecord';

const useStyles = makeStyles((theme) => ({
	toolbarMargin: {
		...theme.mixins.toolbar,
	},
	recordsContainer1: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},

	tabs: {
		display: 'block',
		margin: '0 auto',
		marginTop: 15,
	},
	tabs1: {
		maxWidth: 340,
	},
	tabs2: {
		maxWidth: 500,
	},
	tabRoot: {
		minWidth: 'unset',
	},
	tabLabel: {
		textTransform: 'none',
		fontWeight: 400,
		whiteSpace: 'pre-line',
		color: theme.palette.text1,
		lineHeight: '1.3rem',
	},
	tabsScroller: {},
	tabsIndicator: {
		backgroundColor: theme.palette.tabsIndicatorColor,
	},
	pagination: {
		marginTop: 90,
		'& > ul': {
			justifyContent: 'center',
		},
	},
	headerMonth: {
		fontSize: '1.5em',
		fontWeight: 300,
		opacity: 0.7,
		margin: '0 auto',
		marginTop: 15,
		maxWidth: '500px',
		textAlign: 'center',
		color: theme.palette.text1,
	},
	recordsGroupDate: {
		'& > :last-child': {
			marginBottom: 50,
		},
	},
	paginationColor: {
		color: theme.palette.common.blueSwitch,
	},
}));

const DataTabs = () => {
	const dispatch = useAppDispatch();

	const transactions = useAppSelector(
		(state) => state.transactions2.transactions
	);
	const groupsByMonth = useAppSelector(
		(state) => state.transactions2.groupsByMonth
	);

	const history = useHistory();

	let location = useLocation();

	const matches = useMediaQuery('(max-width:360px)');

	const classes = useStyles();

	const getPageNumberFromMonth = (month) => {
		let m = month.slice(1).slice(0, -4).concat(' ').concat(month.slice(-4));
		let index = groupsByMonth.findIndex((obj) => obj.month === m);
		return index + 1;
	};

	return (
		<div>
			<Menu />
			<DialogRemoveRecord />
			<Header />
			<div className={classes.toolbarMargin} />
			<div
				className={`${classes.tabs} ${matches ? classes.tabs1 : classes.tabs2}`}
			>
				{transactions.length > 0 ? (
					<Tabs
						classes={{
							scroller: classes.tabsScroller,
							indicator: classes.tabsIndicator,
						}}
						value={
							location.pathname === '/'
								? `/${groupsByMonth[0].month.replace(/\s+/g, '')}`
								: location.pathname
						}
						variant="scrollable"
						scrollButtons="auto"
						onChange={(e, p) => {
							dispatch(setPageNumber(getPageNumberFromMonth(p)));
							history.push(p);
						}}
					>
						{groupsByMonth.map((group) => (
							<Tab
								classes={{
									root: classes.tabRoot,
									wrapper: classes.tabLabel,
								}}
								key={group.month}
								label={`${group.month.slice(0, 3)}
                                    ${group.month.slice(-4)}`}
								value={`/${group.month.replace(/\s+/g, '')}`}
							/>
						))}
					</Tabs>
				) : null}
			</div>
		</div>
	);
};

export default DataTabs;
