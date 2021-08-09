import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { makeStyles } from '@material-ui/core/styles';
import { Transaction } from '../../redux/slices/transactions2';
const useStyles = makeStyles((theme) => ({
	arrowDown: {
		position: 'absolute',
		left: 35,
		top: 20,
		color: theme.palette.recordArrowDownColor,
	},
}));

interface Props {
	record: Transaction;
}

const ArrowBetweenWallets = (props: Props) => {
	const classes = useStyles();

	const { wallet_from } = props.record;

	return (
		<>{wallet_from && <ArrowDropDownIcon className={classes.arrowDown} />}</>
	);
};

export default ArrowBetweenWallets;
