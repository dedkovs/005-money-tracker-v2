import TextField from '@material-ui/core/TextField';
import NumberFormat from 'react-number-format';
import makeStyles from '@material-ui/styles/makeStyles';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setExpensesSum, setIncomeSum } from '../../redux/slices/user';
import { forwardRef } from 'react';

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

interface CustomProps {
	onChange: (event: { target: { name: string; value: string } }) => void;
	name: string;
}

const NumberFormatCustom = forwardRef<NumberFormat, CustomProps>(
	function NumberFormatCustom(props, ref) {
		const { onChange, ...other } = props;
		return (
			<NumberFormat
				{...other}
				getInputRef={ref}
				onValueChange={(values) => {
					onChange({
						target: {
							name: props.name,
							value: values.value,
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
);

const Sum = () => {
	const dispatch = useAppDispatch();
	const formType = useAppSelector((state) => state.user.formType);
	const expensesSum = useAppSelector((state) => state.user.expensesSum);
	const incomeSum = useAppSelector((state) => state.user.incomeSum);
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<TextField
				autoComplete={'off'}
				name="numberformat"
				value={formType === 'expenses' ? expensesSum || '' : incomeSum || ''}
				onChange={(event) => {
					formType === 'expenses'
						? dispatch(setExpensesSum(Number(event.target.value) * -1))
						: dispatch(setIncomeSum(Number(event.target.value) * 1));
				}}
				className={classes.textField01}
				id="outlined-basic"
				label={'Sum'}
				variant="standard"
				InputProps={{
					inputComponent: NumberFormatCustom as any,
				}}
				color="primary"
				autoFocus
			/>
		</div>
	);
};

export default Sum;
