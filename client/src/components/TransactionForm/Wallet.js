import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
    setExpensesWallet,
    setIncomeWallet,
} from '../../redux/slices/transactionForm';

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
        top: '10px',
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
            fontWeight: 600,
        },
    },
}));

const Wallet = () => {
    const classes = useStyles();
    const formType = useAppSelector((state) => state.ui.formType);
    const walletsOrder = useAppSelector((state) => state.user.walletsOrder);
    const expensesWallet = useAppSelector(
        (state) => state.transactionForm.expensesWallet
    );
    const incomeWallet = useAppSelector(
        (state) => state.transactionForm.incomeWallet
    );
    const dispatch = useAppDispatch();

    return (
        <div className={classes.FormExpensesSelectWalletsContainer}>
            <FormControl className={classes.formControl}>
                <InputLabel
                    className={classes.label}
                    htmlFor="outlined-age-native-simple"
                    color={'primary'}
                >
                    {'Wallet'}
                </InputLabel>
                <Select
                    className={classes.select01}
                    native
                    value={
                        formType === 'expenses' ? expensesWallet : incomeWallet
                    }
                    onChange={(event) =>
                        formType === 'expenses'
                            ? dispatch(setExpensesWallet(event.target.value))
                            : dispatch(setIncomeWallet(event.target.value))
                    }
                    label={'Wallet'}
                    inputProps={{
                        name: 'wallet',
                    }}
                >
                    {walletsOrder.map((item) => (
                        <option key={item} value={item}>
                            {item}
                        </option>
                    ))}
                </Select>
            </FormControl>
            <div>
                <IconButton
                    onClick={() => {}}
                    className={classes.FormExpensesCreateIconRoot}
                >
                    <CreateIcon className={classes.FormExpensesEditIcon} />
                </IconButton>
            </div>
        </div>
    );
};

export default Wallet;
