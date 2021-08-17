import makeStyles from '@material-ui/styles/makeStyles';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import { useAppDispatch } from '../../redux/hooks';
import { setOpenTransactionForm } from '../../redux/slices/user';

const useStyles = makeStyles(() => ({
	tooltip: {
		fontSize: '0.9rem',
	},
	addIcon: {
		color: 'white',
	},
	button: {
		minHeight: 56,
		minWidth: 45,
		'@media (min-width:600px)': { minHeight: 64, minWidth: 64 },
	},
}));

const AddTransactionButton2 = () => {
	const classes = useStyles();
	const dispatch = useAppDispatch();

	return (
		<IconButton
			onClick={() => {
				dispatch(setOpenTransactionForm(true));
			}}
			size="large"
		>
			<AddIcon className={classes.addIcon} />
		</IconButton>
	);
};

export default AddTransactionButton2;
