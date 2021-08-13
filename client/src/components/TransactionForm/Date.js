import { useState } from 'react';
import makeStyles from '@material-ui/styles/makeStyles';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import TextField from '@material-ui/core/TextField';
import MobileDatePicker from '@material-ui/lab/MobileDatePicker';
import { setExpensesDate, setIncomeDate } from '../../redux/slices/user';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import ruLocale from 'date-fns/locale/ru';
import enLocale from 'date-fns/locale/en-US';
import { useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
	root: {
		'& > *': {
			width: 270,
			margin: '15px 0 0 20px',
		},
	},
}));

const localeMap = {
	en: enLocale,
	ru: ruLocale,
};

// const maskMap = {
// 	en: '__/__/____',
// 	ru: '__.__.____',
// };

const Date1 = (props) => {
	const theme = useTheme();
	const [locale] = useState('ru');
	const formType = useAppSelector((state) => state.user.formType);
	const expensesDate = useAppSelector((state) => state.user.expensesDate);
	const incomeDate = useAppSelector((state) => state.user.incomeDate);
	const darkTheme = useAppSelector((state) => state.user.darkTheme);
	const dispatch = useAppDispatch();

	const handleDateChange = (date) => {
		props.setDate(date);
		formType === 'expenses'
			? dispatch(setExpensesDate(new Date(date).toLocaleDateString()))
			: dispatch(setIncomeDate(new Date(date).toLocaleDateString()));
	};

	const classes = useStyles();

	const dateZIndex = createTheme({
		palette: {
			mode: darkTheme ? 'dark' : 'light',
			primary: {
				main: formType === 'expenses' ? '#40a7e2' : '#59af35',
			},
		},
		zIndex: {
			modal: 1400,
		},
		components: {
			MuiPaper: {
				styleOverrides: {
					root: {
						borderRadius: 14,
					},
				},
			},
			MuiDialog: {
				styleOverrides: {
					paper: {
						position: 'absolute',
						[theme.breakpoints.up('xs')]: {
							top: 72,
						},
						[theme.breakpoints.up('sm')]: {
							top: 108,
						},
					},
				},
			},
			MuiDialogContent: {
				styleOverrides: {
					root: {
						'&.PrivatePickersSlideTransition-root': {
							minHeight: 230,
						},
						'&.PrivatePickersYear-yearButton.Mui-selected:hover': {
							backgroundColor: theme.palette.primary.main,
						},
						'&.PrivatePickersYear-yearButton.Mui-selected:focus': {
							backgroundColor: theme.palette.primary.main,
						},
						'&.PrivatePickersYear-yearButton.Mui-selected': {
							color: 'white',
						},
						'& .PrivatePickersYear-root.PrivatePickersYear-modeMobile .PrivatePickersYear-yearButton.Mui-selected':
							{
								backgroundColor: theme.palette.primary.main,
								color: 'white',
							},
					},
				},
			},
			MuiButtonBase: {
				styleOverrides: {
					root: {
						'&.MuiButtonBase-root.MuiPickersDay-root': {
							backgroundColor: 'transparent',
						},
						'&.MuiButtonBase-root.MuiPickersDay-root.Mui-selected.MuiPickersDay-dayWithMargin':
							{
								backgroundColor: theme.palette.primary.main,
							},
						'&.MuiButtonBase-root.MuiPickersDay-root.Mui-selected': {
							color: 'white',
						},
					},
				},
			},
		},
	});

	return (
		<div className={classes.root} autoComplete="off">
			<ThemeProvider theme={dateZIndex}>
				<LocalizationProvider
					dateAdapter={AdapterDateFns}
					locale={localeMap[locale]}
				>
					<MobileDatePicker
						// mask={maskMap[locale]}
						// views={['year', 'month', 'day']}
						// inputFormat={'MM/dd/yyyy'}
						renderInput={(params) => {
							// console.log(params);
							return <TextField {...params} variant="standard" />;
						}}
						label="Date"
						openTo="day"
						value={props.date}
						onChange={(newValue) => {
							props.setDate(newValue);
						}}
						showToolbar={false}
						minDate={new Date('01/01/2011')}
						maxDate={new Date('01/01/2025')}
						onAccept={() => handleDateChange(props.date)}
						onClose={() => {
							props.setDate(
								formType === 'expenses' ? expensesDate : incomeDate
							);
						}}
					/>
				</LocalizationProvider>
			</ThemeProvider>
		</div>
	);
};

export default Date1;
