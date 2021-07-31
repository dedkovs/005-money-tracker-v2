import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Transaction } from '../../../services/types';

const useStyles = makeStyles((theme) => ({
    walletText: {
        fontFamily: 'Ubuntu, Roboto, sans-serif',
        fontWeight: 'bold',
        borderRadius: 5,
        padding: '0 5px',
    },
    walletBackground: {
        backgroundColor: theme.palette.recordWalletBackgroundColor,
    },
    walletContainer: {
        position: 'absolute',
        left: 37,
    },
    textExpenses: {
        color: theme.palette.recordWalletTextColorExpenses,
    },
    textIncome: {
        color: theme.palette.recordWalletTextColorIncome,
    },
    textBetween: {
        color: theme.palette.recordWalletTextColorBetween,
    },
}));

interface Props {
    record: Transaction;
    walletName: string;
    styleTop: number;
}

const Wallet = (props: Props) => {
    const classes = useStyles();

    const {
        record: { wallet, sum },
        walletName,
        styleTop,
    } = props;

    const getTextColor1 = () => {
        if (sum < 0) return `${classes.textExpenses}`;
        if (sum > 0 && wallet) return `${classes.textIncome}`;
        return `${classes.textBetween}`;
    };

    return (
        <div
            style={{ top: styleTop }}
            className={`${classes.walletContainer} ${getTextColor1()}`}
        >
            <Typography
                className={`${classes.walletText} ${classes.walletBackground}`}
                variant={'subtitle2'}
            >
                {walletName}
            </Typography>
        </div>
    );
};

export default Wallet;
