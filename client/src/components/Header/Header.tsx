import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuButton from './MenuButton';
import makeStyles from '@material-ui/styles/makeStyles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import AddTransactionButton from './AddTransactionButton';
import Drawer from './Drawer';
import TopWallets from './TopWallets';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
	toolbarMargin: {
		...theme.mixins.toolbar,
	},
	appbar: {
		zIndex: theme.zIndex.modal + 1,
		backgroundColor: theme.palette.appBarBackgroundColor,
		width: '100vw',
		right: 'auto',
	},
	toolbar1: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 0,
		minWidth: 340,
	},
	toolbar2: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	tabs1: {
		width: '100%',
		position: 'relative',
		margin: '0 auto',
		maxWidth: 548,
		minWidth: 300,
	},
	tabs2: {
		width: '100%',
		maxWidth: 800,
		position: 'relative',
		margin: '0 auto',
	},
}));

const Header = () => {
	const classes = useStyles();

	const matches = useMediaQuery('(max-width:360px)');
	const matches2 = useMediaQuery('(min-width:500px)');

	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 0,
	});

	return (
		<AppBar elevation={trigger ? 4 : 0} className={classes.appbar}>
			<div className={`${matches2 ? classes.tabs1 : null}`}>
				<Toolbar className={matches ? classes.toolbar1 : classes.toolbar2}>
					<MenuButton />
					<TopWallets />
					<AddTransactionButton />
					<Drawer />
				</Toolbar>
			</div>
		</AppBar>
	);
};

export default Header;
