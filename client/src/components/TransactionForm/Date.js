import DateFnsUtils from '@date-io/date-fns';
import { enUS } from 'date-fns/locale';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { setExpensesDate, setIncomeDate } from '../../redux/slices/user';

const useStyles = makeStyles(() => ({
	root: {
		'& > *': {
			width: 270,
			margin: '15px 0 0 20px',
		},
	},
}));

const Date1 = () => {
	const formType = useAppSelector((state) => state.user.formType);
	const expensesDate = useAppSelector((state) => state.user.expensesDate);
	const incomeDate = useAppSelector((state) => state.user.incomeDate);
	const dispatch = useAppDispatch();

	const handleDateChange = (date) => {
		formType === 'expenses'
			? dispatch(setExpensesDate(new Date(date).toLocaleDateString()))
			: dispatch(setIncomeDate(new Date(date).toLocaleDateString()));
	};

	const classes = useStyles();

	return (
		<div className={classes.root} autoComplete="off">
			<MuiPickersUtilsProvider locale={enUS} utils={DateFnsUtils}>
				<DatePicker
					DialogProps={{
						style: { zIndex: 1310 },
					}}
					format={'dd MMMM yyy'}
					cancelLabel={'cancel'}
					inputVariant={'standard'}
					value={
						formType === 'expenses'
							? new Date(expensesDate)
							: new Date(incomeDate)
					}
					onChange={handleDateChange}
					animateYearScrolling
					minDate={'01/01/2000'}
					todayLabel={'today'}
					showTodayButton={true}
				/>
			</MuiPickersUtilsProvider>
		</div>
	);
};

export default Date1;
