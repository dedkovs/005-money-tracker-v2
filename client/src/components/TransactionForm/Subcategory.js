import makeStyles from '@material-ui/styles/makeStyles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import {
	setExpensesSubcategory,
	setIncomeSubcategory,
} from '../../redux/slices/user';

const useStyles = makeStyles((theme) => ({
	FormExpensesSelectWalletsContainer: {
		display: 'flex',
		paddingLeft: 20,
		marginTop: 15,
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
			padding: '5px 0px',
			fontWeight: 400,
		},
	},
}));

const Subcategory = () => {
	const classes = useStyles();
	const formType = useAppSelector((state) => state.user.formType);
	const expensesCategories = useAppSelector(
		(state) => state.user.expensesCategories
	);
	const expensesCategory = useAppSelector(
		(state) => state.user.expensesCategory
	);
	const expensesSubcategory = useAppSelector(
		(state) => state.user.expensesSubcategory
	);
	const incomeCategories = useAppSelector(
		(state) => state.user.incomeCategories
	);
	const incomeCategory = useAppSelector((state) => state.user.incomeCategory);
	const incomeSubcategory = useAppSelector(
		(state) => state.user.incomeSubcategory
	);
	const dispatch = useAppDispatch();

	const getSubcategories = () => {
		if (formType === 'expenses' && expensesCategory === '') return [''];
		if (formType === 'expenses' && expensesCategory !== '')
			return expensesCategories[expensesCategory].map((item) => (
				<option key={item} value={item}>
					{item}
				</option>
			));
		if (formType === 'income' && incomeCategory === '') return [''];
		if (formType === 'income' && incomeCategory !== '')
			return incomeCategories[incomeCategory].map((item) => (
				<option key={item} value={item}>
					{item}
				</option>
			));
	};

	return (
        <div className={classes.FormExpensesSelectWalletsContainer}>
			<FormControl variant="standard" className={classes.formControl}>
				<InputLabel
					className={classes.label}
					htmlFor="outlined-age-native-simple"
				>
					{'Subcategory'}
				</InputLabel>
				<Select
                    className={classes.select01}
                    native
                    value={
						formType === 'expenses' ? expensesSubcategory : incomeSubcategory
					}
                    onChange={(event) =>
						formType === 'expenses'
							? dispatch(setExpensesSubcategory(event.target.value))
							: dispatch(setIncomeSubcategory(event.target.value))
					}
                    label={'Subcategory'}
                    variant="standard">
					<option aria-label="None" value="" />
					{getSubcategories()}
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

export default Subcategory;
