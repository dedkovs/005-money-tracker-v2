import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import NumberFormat from 'react-number-format';
import { Transaction } from '../../redux/slices/transactions2';
import { useAppSelector } from '../../redux/hooks';

const useStyles = makeStyles((theme) => ({
	sumContainer: {
		display: 'flex',
		height: '100%',
		justifyContent: 'flex-end',
		alignItems: 'center',
		paddingRight: 10,
	},
	sumText: {
		fontFamily: 'Circe',
		fontSize: '1.5rem',
		lineHeight: '1em',
		paddingLeft: 5,
		zIndex: 1,
		borderRadius: 10,
	},
	whiteColor: {
		color: 'white',
	},
	recordSumTextColorExpenses: {
		color: theme.palette.recordSumTextColorExpenses,
	},
	recordSumTextColorIncome: {
		color: theme.palette.recordSumTextColorIncome,
	},
	recordSumTextColorBetween: {
		color: theme.palette.recordSumTextColorBetween,
	},
}));

interface Props {
	record: Transaction;
}

const Sum = ({ record: { sum, wallet } }: Props) => {
	const classes = useStyles();

	const showCents = useAppSelector((state) => state.showCents);

	const getTextColor = () => {
		if (sum < 0) return classes.recordSumTextColorExpenses;
		if (sum > 0 && wallet) return classes.recordSumTextColorIncome;
		return classes.recordSumTextColorBetween;
	};

	return (
		<div className={classes.sumContainer}>
			<Typography className={`${classes.sumText} ${getTextColor()}`}>
				<NumberFormat
					value={sum / 100}
					displayType={'text'}
					thousandSeparator={' '}
					prefix={sum > 0 && wallet ? '+' : ''}
					decimalSeparator={'.'}
					decimalScale={showCents ? 2 : 0}
					fixedDecimalScale={true}
				/>
			</Typography>
		</div>
	);
};

export default Sum;
