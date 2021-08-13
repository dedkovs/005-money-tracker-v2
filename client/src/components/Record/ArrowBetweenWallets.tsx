import { Theme } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import makeStyles from '@material-ui/styles/makeStyles';
import { Transaction } from '../../services/types';

const useStyles = makeStyles((theme: Theme) => ({
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
