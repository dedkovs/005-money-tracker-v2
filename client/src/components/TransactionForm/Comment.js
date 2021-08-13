import makeStyles from '@material-ui/styles/makeStyles';
import TextField from '@material-ui/core/TextField';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { setExpensesComment, setIncomeComment } from '../../redux/slices/user';

const useStyles = makeStyles((theme) => ({
	root: {
		'& .MuiTextField-root': {
			width: 270,
		},
		'& .MuiInputBase-root': {
			// padding: 0,
		},
	},
}));

const Comment = () => {
	const classes = useStyles();
	const formType = useAppSelector((state) => state.user.formType);
	const expensesComment = useAppSelector((state) => state.user.expensesComment);
	const incomeComment = useAppSelector((state) => state.user.incomeComment);
	const dispatch = useAppDispatch();

	const handleChange = (event) => {
		formType === 'expenses'
			? dispatch(setExpensesComment(event.target.value))
			: dispatch(setIncomeComment(event.target.value));
	};

	return (
		<form
			style={{ marginLeft: 20, marginTop: 15 }}
			className={classes.root}
			noValidate
			autoComplete="off"
		>
			<TextField
				id="outlined-multiline-flexible"
				label="Comment"
				multiline
				value={formType === 'expenses' ? expensesComment : incomeComment}
				onChange={handleChange}
				variant="standard"
				maxRows={4}
				style={{ padding: 0 }}
				// InputProps={{
				// 	style: {
				// 		width: 270,
				// 		fontSize: '0.9rem',
				// 	},
				// }}
				size={'medium'}
			/>
		</form>
	);
};

export default Comment;
