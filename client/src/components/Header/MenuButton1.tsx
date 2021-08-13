import makeStyles from '@material-ui/styles/makeStyles';
import MenuIcon from '@material-ui/icons/Menu';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { setOpenDrawer } from '../../redux/slices/user';

const useStyles = makeStyles(() => ({
	tooltip: {
		fontSize: '0.9rem',
	},
	button: {
		minHeight: 56,
		minWidth: 45,
		'@media (min-width:600px)': { minHeight: 64, minWidth: 62 },
	},
	menuIcon: {
		color: 'white',
	},
}));

const MenuButton1 = () => {
	const classes = useStyles();

	const openDrawer = useAppSelector((state) => state.user.openDrawer);
	const dispatch = useAppDispatch();

	return (
		<Tooltip
			title={'Menu'}
			placement="bottom"
			classes={{ tooltip: classes.tooltip }}
			arrow
			enterDelay={500}
		>
			<Button
				className={classes.button}
				onClick={() => {
					dispatch(setOpenDrawer(!openDrawer));
				}}
			>
				<MenuIcon className={classes.menuIcon} />
			</Button>
		</Tooltip>
	);
};

export default MenuButton1;
