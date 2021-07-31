import TextField from '@material-ui/core/TextField';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import {
	// ThemeProvider,
	// createTheme,
	makeStyles,
} from '@material-ui/core/styles';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
	setExpensesSum,
	setIncomeSum,
} from '../../redux/slices/transactionForm';

const useStyles = makeStyles(() => ({
	root: {
		'& > *': {
			width: 270,
			margin: '10px 0 0 20px',
		},
	},
	textField01: {
		'& input': {
			fontWeight: 400,
			fontSize: '1.7rem',
			height: 25,
		},
	},
}));

function NumberFormatCustom(props) {
	const { inputRef, onChange, ...other } = props;

	return (
		<NumberFormat
			{...other}
			getInputRef={inputRef}
			onValueChange={(values) => {
				onChange({
					target: {
						// name: props.name,
						value: values.floatValue,
					},
				});
			}}
			thousandSeparator={' '}
			decimalSeparator={','}
			decimalScale={2}
			allowNegative={false}
			allowLeadingZeros={false}
			maxLength={12}
			placeholder={'0'}
			isNumericString
		/>
	);
}

NumberFormatCustom.propTypes = {
	inputRef: PropTypes.func.isRequired,
	name: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
};

const Sum = () => {
	const dispatch = useAppDispatch();
	const formType = useAppSelector((state) => state.ui.formType);
	const expensesSum = useAppSelector(
		(state) => state.transactionForm.expensesSum
	);
	const incomeSum = useAppSelector((state) => state.transactionForm.incomeSum);
	// const darkTheme = useAppSelector((state) => state.ui.darkTheme);
	const classes = useStyles();

	return (
		<div className={classes.root} autoComplete="off">
			<TextField
				name="numberformat"
				value={formType === 'expenses' ? expensesSum || '' : incomeSum || ''}
				onChange={(event) => {
					formType === 'expenses'
						? dispatch(setExpensesSum(event.target.value * -1))
						: dispatch(setIncomeSum(event.target.value));
				}}
				className={classes.textField01}
				id="outlined-basic"
				label={'Sum'}
				variant="standard"
				InputProps={{
					inputComponent: NumberFormatCustom,
				}}
				color="primary"
				autoFocus
			/>
		</div>
	);
};

export default Sum;
