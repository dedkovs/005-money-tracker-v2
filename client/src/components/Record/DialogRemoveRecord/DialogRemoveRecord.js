import React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// import getData from './getData';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { setOpenDialogRemoveRecord } from '../../../redux/slices/dialogs';
import { deleteTransaction } from '../../../redux/slices/transactions2';

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
    // const { openDialogRemoveRecord: open, setOpenDialogRemoveRecord } = store;
    const classes = useStyles();

    const openDialogRemoveRecord = useAppSelector(
        (state) => state.dialogs.openDialogRemoveRecord
    );

    const recordToEdit = useAppSelector((state) => state.recordToEdit);

    const dispatch = useAppDispatch();

    return (
        <Dialog
            classes={{
                // root: classes.dialogRoot,
                // paperFullWidth: classes.paperFullWidth,
                // paperWidthSm: classes.paperWidthSm,
                paper: classes.dialog,
            }}
            open={openDialogRemoveRecord}
            onClose={() => dispatch(setOpenDialogRemoveRecord(false))}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogContent>
                <DialogContentText
                    align={'center'}
                    id="alert-dialog-description"
                >
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
                    onClick={() => {
                        // console.log(getData())
                        // store.deleteTrx(getData(store));
                        dispatch(deleteTransaction(recordToEdit.id));
                        // console.log(recordToEdit);
                        dispatch(setOpenDialogRemoveRecord(false));
                    }}
                >
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DialogRemoveRecord;
