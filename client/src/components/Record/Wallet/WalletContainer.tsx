import { Transaction } from '../../../redux/slices/transactions2';
import Wallet from './Wallet';

interface Props {
	record: Transaction;
}

const WalletContainer = ({
	record: { wallet, wallet_from, wallet_to },
	record,
}: Props) => {
	return (
		<>
			{wallet && <Wallet walletName={wallet} record={record} styleTop={3} />}

			{wallet_from && (
				<Wallet walletName={wallet_from} record={record} styleTop={3} />
			)}

			{wallet_to && (
				<Wallet walletName={wallet_to} record={record} styleTop={41} />
			)}
		</>
	);
};

export default WalletContainer;
