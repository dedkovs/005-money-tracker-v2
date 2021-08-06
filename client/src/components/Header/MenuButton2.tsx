import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { setOpenDrawer } from '../../redux/slices/user';

const useStyles = makeStyles(() => ({
	menuIcon: {
		color: 'white',
	},
}));

const MenuButton2 = () => {
	const classes = useStyles();

	const openDrawer = useAppSelector((state) => state.user.openDrawer);
	const dispatch = useAppDispatch();

	return (
		<IconButton
			onClick={() => {
				dispatch(setOpenDrawer(!openDrawer));
			}}
		>
			<MenuIcon className={classes.menuIcon} />
		</IconButton>
	);
};

export default MenuButton2;
