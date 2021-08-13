import makeStyles from '@material-ui/styles/makeStyles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import {
	setExpensesCategory,
	setIncomeCategory,
} from '../../redux/slices/user';

const useStyles = makeStyles((theme) => ({
	FormExpensesSelectWalletsContainer: {
		display: 'flex',
		paddingLeft: 20,
	},
	FormExpensesEditIcon: {
		position: 'relative',
	},
	FormExpensesCreateIconRoot: {
		position: 'relative',
		top: 10,
	},
	formControl: {
		width: 270,
		marginRight: 10,
	},
	selectEmpty: {
		marginTop: theme.spacing(0),
	},
	select01: {
		'& select': {
			fontWeight: 600,
		},
	},
}));

const Category = () => {
	const classes = useStyles();
	const formType = useAppSelector((state) => state.user.formType);
	const expensesCategory = useAppSelector(
		(state) => state.user.expensesCategory
	);
	const incomeCategory = useAppSelector((state) => state.user.incomeCategory);
	const expensesCategoriesOrder = useAppSelector(
		(state) => state.user.expensesCategoriesOrder
	);
	const incomeCategoriesOrder = useAppSelector(
		(state) => state.user.incomeCategoriesOrder
	);
	const dispatch = useAppDispatch();

	return (
        <div className={classes.FormExpensesSelectWalletsContainer}>
			<FormControl variant="standard" className={classes.formControl}>
				<InputLabel
					className={classes.label}
					htmlFor="outlined-age-native-simple"
				>
					{'Category'}
				</InputLabel>
				<Select
                    className={classes.select01}
                    native
                    value={formType === 'expenses' ? expensesCategory : incomeCategory}
                    onChange={(event) =>
						formType === 'expenses'
							? dispatch(setExpensesCategory(event.target.value))
							: dispatch(setIncomeCategory(event.target.value))
					}
                    label={'Category'}
                    variant="standard">
					<option aria-label="None" value="" />
					{formType === 'expenses'
						? expensesCategoriesOrder.map((item) => (
								<option key={item} value={item}>
									{item}
								</option>
						  ))
						: incomeCategoriesOrder.map((item) => (
								<option key={item} value={item}>
									{item}
								</option>
						  ))}
				</Select>
			</FormControl>
			<div>
				<IconButton
                    onClick={() => {}}
                    className={classes.FormExpensesCreateIconRoot}
                    size="large">
					<CreateIcon className={classes.FormExpensesEditIcon} />
				</IconButton>
			</div>
		</div>
    );
};

export default Category;
