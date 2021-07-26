import { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { setOpenDrawer } from '../../redux/slices/openDrawer';
// import { addTransaction } from '../../redux/slices/transactions';
import { addTransaction } from '../../redux/slices/transactions2';
// import { setOpenTransactionForm } from '../../redux/slices/openTransactionForm';
// import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import getGroups from '../Data/getGroups';
import { setPageNumber } from '../../redux/slices/transactions2';

const useStyles = makeStyles(() => ({
    tooltip: {
        fontSize: '0.9rem',
    },
    addIcon: {
        color: 'white',
    },
    button: {
        minHeight: 56,
        minWidth: 45,
        '@media (min-width:600px)': { minHeight: 64, minWidth: 64 },
    },
}));

const AddTransactionButton2 = () => {
    const classes = useStyles();

    const dispatch = useAppDispatch();

    const pageNumber = useAppSelector(
        (state) => state.transactions2.pageNumber
    );

    const transactions = useAppSelector(
        (state) => state.transactions2.transactions
    );

    const history = useHistory();

    useEffect(() => {
        // console.log(getGroups(transactions));
        // console.log(pageNumber);
        if (
            transactions.length > 0 &&
            getGroups(transactions)[pageNumber - 1]
        ) {
            history.push(
                `/${getGroups(transactions)[pageNumber - 1].month.replace(
                    /\s+/g,
                    ''
                )}`
            );
        } else {
            if (pageNumber > 1) {
                dispatch(setPageNumber(pageNumber - 1));
            } else {
                dispatch(setPageNumber(1));
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [transactions]);

    return (
        <IconButton
            onClick={() => {
                dispatch(setOpenDrawer(false));
                dispatch(addTransaction());
                // dispatch(setOpenTransactionForm(true));
            }}
            // component={Link}
            // to="/data/add-transaction"
        >
            <AddIcon className={classes.addIcon} />
        </IconButton>
    );
};

export default AddTransactionButton2;
