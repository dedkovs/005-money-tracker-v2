import makeStyles from '@material-ui/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import { Transaction } from '../../services/types';
import { Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
	categoryContainer: {
		fontFamily: 'Ubuntu, Roboto, sans-serif',
		position: 'absolute',
		top: 26,
		left: 40,
	},
	expensesCategoryText: {
		color: theme.palette.recordSumTextColorExpenses,
	},
	incomeCategoryText: {
		color: theme.palette.recordSumTextColorIncome,
	},
}));

interface Props {
	record: Transaction;
}

const Category = ({
	record: { expenses_category, income_category },
}: Props) => {
	const classes = useStyles();
	return (
		<>
			{expenses_category && (
				<div className={classes.categoryContainer}>
					<Typography
						className={classes.expensesCategoryText}
						variant={'body2'}
					>
						{expenses_category}
					</Typography>
				</div>
			)}

			{income_category && (
				<div className={classes.categoryContainer}>
					<Typography className={classes.incomeCategoryText} variant={'body2'}>
						{income_category}
					</Typography>
				</div>
			)}
		</>
	);
};

export default Category;
