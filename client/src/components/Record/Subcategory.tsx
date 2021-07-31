import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Transaction } from '../../services/types';

const useStyles = makeStyles((theme) => ({
    subcategoryContainer: {
        position: 'absolute',
        top: 44,
        left: 40,
        fontFamily: 'Ubuntu, Roboto, sans-serif',
    },
    expensesSubcategoryText: {
        color: theme.palette.recordSubcategoryTextColorExpenses,
    },
    incomeSubcategoryText: {
        color: theme.palette.recordSubcategoryTextColorIncome,
    },
}));

interface Props {
    record: Transaction;
}

const Subcategory = ({
    record: { expenses_subcategory, income_subcategory },
}: Props) => {
    const classes = useStyles();
    return (
        <>
            {expenses_subcategory && (
                <div className={classes.subcategoryContainer}>
                    <Typography
                        className={classes.expensesSubcategoryText}
                        variant={'body2'}
                    >
                        {expenses_subcategory}
                    </Typography>
                </div>
            )}
            {income_subcategory && (
                <div className={classes.subcategoryContainer}>
                    <Typography
                        className={classes.incomeSubcategoryText}
                        variant={'body2'}
                    >
                        {income_subcategory}
                    </Typography>
                </div>
            )}
        </>
    );
};

export default Subcategory;
