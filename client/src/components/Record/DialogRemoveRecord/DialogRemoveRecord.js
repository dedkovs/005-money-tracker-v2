import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
} from '@material-ui/core';
import makeStyles from '@material-ui/styles/makeStyles';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import {
	setOpenDialogRemoveRecord,
	setScrollButtons,
} from '../../../redux/slices/user';
import {
	deleteTrx,
	setDialogRemoveRecordYesButtonDisabled,
} from '../../../redux/slices/user';

const useStyles = makeStyles(() => ({
	dialog: {
		borderRadius: 20,
	},
	dialogActions: {
		display: 'flex',
		justifyContent: 'center',
		paddingBottom: 20,
		paddingTop: 0,
	},
	button: {
		margin: '0 10px',
	},
}));

const DialogRemoveRecord = () => {
	const classes = useStyles();

	const openDialogRemoveRecord = useAppSelector(
		(state) => state.user.openDialogRemoveRecord
	);
	const userId = useAppSelector((state) => state.user.userId);
	const wallets = useAppSelector((state) => state.user.wallets);
	const recordToEdit = useAppSelector((state) => state.user.recordToEdit);
	const dialogRemoveRecordYesButtonDisabled = useAppSelector(
		(state) => state.user.dialogRemoveRecordYesButtonDisabled
	);

	const dispatch = useAppDispatch();

	const handleDeleteTransaction = () => {
		dispatch(setOpenDialogRemoveRecord(false));
		dispatch(setDialogRemoveRecordYesButtonDisabled(true));

		const func = () => {
			dispatch(setScrollButtons('standard'));
			const { wallet, id: trxId, sum } = recordToEdit;
			let updWallet = wallets[wallet];
			updWallet = [updWallet[0] - sum, updWallet[1], updWallet[2]];
			const updatedWallets = {
				...wallets,
				[wallet]: updWallet,
			};

			dispatch(
				deleteTrx({
					userId,
					trxId,
					updatedWallets,
				})
			);
		};

		setTimeout(func, 0);
	};

	return (
		<Dialog
			classes={{
				paper: classes.dialog,
			}}
			open={openDialogRemoveRecord}
			onClose={() => dispatch(setOpenDialogRemoveRecord(false))}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
			disableScrollLock
		>
			<DialogContent>
				<DialogContentText align={'center'} id="alert-dialog-description">
					Delete entry?
				</DialogContentText>
			</DialogContent>
			<DialogActions className={classes.dialogActions}>
				<Button
					className={classes.button}
					variant={'outlined'}
					onClick={() => dispatch(setOpenDialogRemoveRecord(false))}
					autoFocus
				>
					No
				</Button>
				<Button
					className={classes.button}
					variant={'outlined'}
					onClick={handleDeleteTransaction}
					disabled={dialogRemoveRecordYesButtonDisabled}
				>
					Yes
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default DialogRemoveRecord;
