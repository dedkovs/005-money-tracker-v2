import makeStyles from '@material-ui/styles/makeStyles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DrawerSwitchTheme from './DrawerSwitchTheme';
import DrawerCommentsCheckbox from './DrawerCommentsCheckbox';
import DrawerCentsCheckbox from './DrawerCentsCheckbox';
import axios from 'axios';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { setOpenDrawer } from '../../redux/slices/user';
import { logOut } from '../../redux/slices/user';
import { Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
	toolbarMargin: {
		...theme.mixins.toolbar,
	},
	drawer: {
		minWidth: 280,
		backgroundColor: theme.palette.background.paper,
		color: theme.palette.text2,
		'& .MuiListItem-divider': {
			borderBottomColor: theme.palette.dividerColor,
		},
	},
}));

const Drawer1 = () => {
	const classes = useStyles();

	const openDrawer = useAppSelector((state) => state.user.openDrawer);
	const dispatch = useAppDispatch();

	const handleLogOut = () => {
		axios
			.get('/logout')
			.then((res) => {
				dispatch(logOut());
			})
			.catch((err) => {
				console.log('Something went wrong. Try to reload the page.', err);
			});
	};

	return (
		<Drawer
			open={openDrawer}
			onClose={() => dispatch(setOpenDrawer(false))}
			classes={{ paper: classes.drawer }}
		>
			<div className={classes.toolbarMargin} />
			<List disablePadding>
				<DrawerSwitchTheme />
				<DrawerCommentsCheckbox />
				<DrawerCentsCheckbox />
				<ListItem onClick={handleLogOut} divider button>
					<ListItemText>Log out</ListItemText>
				</ListItem>
			</List>
		</Drawer>
	);
};

export default Drawer1;
