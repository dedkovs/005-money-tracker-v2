import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Menu from '../Record/Menu';
import makeStyles from '@material-ui/styles/makeStyles';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { setPageNumber } from '../../redux/slices/user';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import DialogRemoveRecord from '../Record/DialogRemoveRecord/DialogRemoveRecord';

const useStyles = makeStyles((theme) => ({
	toolbarMargin: {
		...theme.mixins.toolbar,
	},
	tabs: {
		display: 'flex',
		justifyContent: 'center',
		margin: '0 auto',
		marginTop: 15,
		color: theme.palette.text1,
	},
	tabs1: {
		width: 500,
	},
	tabs2: {
		maxWidth: 'calc(100% - 20px)',
	},
	tabRoot: {
		minWidth: 'unset',
	},
	tabLabel: {
		textTransform: 'none',
		fontWeight: 400,
		whiteSpace: 'pre-line',
		// whiteSpace: 'pre-wrap',
		color: theme.palette.text1,
		lineHeight: '1.3rem',
	},
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

	const transactions = useAppSelector((state) => state.user.transactions);
	const pageNumber = useAppSelector((state) => state.user.pageNumber);
	const groupsByMonth = useAppSelector((state) => state.user.groupsByMonth);

	const matches = useMediaQuery('(max-width:360px)');
	const matches2 = useMediaQuery('(min-width:500px)');

	const classes = useStyles();

	const getPageNumberFromMonth = (month) => {
		let index = groupsByMonth.findIndex((obj) => obj.month === month);
		return index;
	};

	return (
		<div>
			<Menu />
			<DialogRemoveRecord />
			<div className={classes.toolbarMargin} />
			<div
				className={`${classes.tabs} ${matches2 ? classes.tabs1 : null} ${
					matches ? classes.tabs2 : null
				}`}
			>
				{transactions.length > 0 ? (
					<Tabs
						// indicatorColor="inherit"
						textColor="inherit"
						classes={{
							indicator: classes.tabsIndicator,
						}}
						value={groupsByMonth[pageNumber].month}
						variant="scrollable"
						// scrollButtons={matches ? false : true}
						scrollButtons={'auto'}
						onChange={(e, p) => {
							dispatch(setPageNumber(getPageNumberFromMonth(p)));
						}}
					>
						{groupsByMonth.map((group) => (
							<Tab
								classes={{
									root: classes.tabRoot,
									wrapper: classes.tabLabel,
								}}
								key={group.month}
								label={`${group.month.slice(0, 3)} ${group.month.slice(-4)}`}
								value={group.month}
								// component={Link}
								// to={`/${group.month.replace(/\s+/g, '')}`}
							/>
						))}
					</Tabs>
				) : null}
			</div>
		</div>
	);
};

export default DataTabs;
