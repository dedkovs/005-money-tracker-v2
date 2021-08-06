import Menu from '@material-ui/core/Menu';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { setRecordMenuButtonAnchor } from '../../redux/slices/user';
import { setOpenDialogRemoveRecord } from '../../redux/slices/user';
import { setRecordToEdit } from '../../redux/slices/user';

const useStyles = makeStyles(() => ({
	menuItem: {
		fontSize: '1rem',
		minHeight: 'unset',
		'&:hover': {
			backgroundColor: 'rgba(0,0,0,0.1)',
		},
		lineHeight: '1.2',
	},
}));

const Menu1 = () => {
	const recordMenuButtonAnchor = useAppSelector(
		(state) => state.user.recordMenuButtonAnchor
	);
	const dispatch = useAppDispatch();

	const ref = document.getElementById(recordMenuButtonAnchor);
	const classes = useStyles();

	return (
		<Menu
			anchorEl={ref}
			open={Boolean(recordMenuButtonAnchor)}
			onClose={() => {
				dispatch(setRecordToEdit(null));
				dispatch(setRecordMenuButtonAnchor(null));
			}}
			PaperProps={{
				style: {
					boxShadow: '0px 0px 10px rgba(0,0,0,0.2)',
					transform: 'translate(30px, 0px)',
				},
			}}
			// MenuListProps={{ style: { paddingBottom: 0, paddingTop: 0 } }}
		>
			<MenuItem
				classes={{ root: classes.menuItem }}
				onClick={() => {
					dispatch(setRecordMenuButtonAnchor(false));
					dispatch(setOpenDialogRemoveRecord(true));
				}}
			>
				Delete
			</MenuItem>
		</Menu>
	);
};

export default Menu1;
