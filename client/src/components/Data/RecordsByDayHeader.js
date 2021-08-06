import Typography from '@material-ui/core/Typography';
import NumberFormat from 'react-number-format';
import transformDate from './transformDate';
import { makeStyles } from '@material-ui/core/styles';
import { useAppSelector } from '../../redux/hooks';

const useStyles = makeStyles((theme) => ({
	dayHeader: {
		display: 'flex',
		justifyContent: 'space-between',
		marginBottom: 5,
	},
	dayValue: {
		color: theme.palette.text3,
		fontWeight: 300,
		opacity: 0.8,
	},
	daySum: {
		paddingRight: 10,
		opacity: 0.6,
		fontFamily: 'Circe Light',
	},
	recordHeaderSumTextColorIncome: {
		color: theme.palette.recordHeaderSumTextColorIncome,
	},
	recordHeaderSumTextColorExpenses: {
		color: theme.palette.recordHeaderSumTextColorExpenses,
	},
	recordHeaderSumTextColorBetween: {
		color: theme.palette.recordHeaderSumTextColorBetween,
	},
}));

const RecordsByDayHeader = ({ group }) => {
	const classes = useStyles();

	const showCents = useAppSelector((state) => state.user.showCents);

	const getDaySumColor = () => {
		if (group.sum < 0) return 'recordHeaderSumTextColorExpenses';
		if (group.sum > 0) return 'recordHeaderSumTextColorIncome';
		if (group.sum === 0) return 'recordHeaderSumTextColorBetween';
	};

	return (
		<div className={classes.dayHeader}>
			<Typography className={classes.dayValue} variant={'body1'}>
				{transformDate(group.day)}
			</Typography>
			<Typography
				className={`${classes.daySum} ${classes[getDaySumColor()]}
                `}
				variant={'body1'}
			>
				<NumberFormat
					value={group.sum / 100}
					displayType={'text'}
					thousandSeparator={' '}
					prefix={group.sum > 0 ? '+' : ''}
					decimalSeparator={'.'}
					decimalScale={showCents ? 2 : 0}
					fixedDecimalScale={true}
				/>
			</Typography>
		</div>
	);
};

export default RecordsByDayHeader;
