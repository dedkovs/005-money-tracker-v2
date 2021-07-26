// import React, { useRef } from 'react';
import Menu from '@material-ui/core/Menu';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
// import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { setRecordMenuButtonAnchor } from '../../redux/slices/anchors';
// import { setRecordToEdit } from '../../redux/slices/recordToEdit';
import { setOpenDialogRemoveRecord } from '../../redux/slices/dialogs';

const useStyles = makeStyles(() => ({
    menuItem: {
        fontSize: '1rem',
        minHeight: 'unset',
        '&:hover': {
            backgroundColor: 'rgba(0,0,0,0.1)',
        },
        lineHeight: '1.2',
    },
}));

const Menu1 = () => {
    const recordMenuButtonAnchor = useAppSelector(
        (state) => state.anchors.recordMenuButtonAnchor
    );
    // const record = useAppSelector((state) => state.recordToEdit);
    const dispatch = useAppDispatch();

    const ref = document.getElementById(recordMenuButtonAnchor);
    // console.log(ref);
    // const {
    //     anchorEl,
    //     recordToEdit: record,
    //     setOpenDialogRemoveRecord,
    //     setAnchorEl,
    // } = store;
    const classes = useStyles();

    // const getEditRecordFormType = () => {
    //     if (record.wallet !== null && record.sum < 0) return 'expences';
    //     if (record.wallet !== null && record.sum > 0) return 'income';
    //     if (record.wallet === null) return 'between';
    // };

    // const getEditRecordCategory = () => {
    //     // if (store.editRecordFormType === 'expences') return record.expences;
    //     // if (store.editRecordFormType === 'income') return record.income;
    // };

    // const getEditRecordSubcategory = () => {
    //     // if (store.editRecordFormType === 'expences') return record.expences_sub;
    //     // if (store.editRecordFormType === 'income') return record.income_sub;
    // };

    return (
        <Menu
            anchorEl={ref}
            open={Boolean(recordMenuButtonAnchor)}
            onClose={() => dispatch(setRecordMenuButtonAnchor(null))}
            PaperProps={{
                style: {
                    boxShadow: '0px 0px 10px rgba(0,0,0,0.2)',
                    transform: 'translate(30px, 0px)',
                },
            }}
        >
            {/* <MenuItem
                classes={{ root: classes.menuItem }}
                onClick={() => {
                    dispatch(setRecordMenuButtonAnchor(null));
                    // store.setEditRecordFormType(getEditRecordFormType());
                    // console.log(getEditRecordFormType());
                    dispatch(setRecordToEdit(record));
                    // store.setEditRecordSum(record.sum);
                    // store.setEditRecordWallet(record.wallet);
                    // store.setEditRecordWalletFrom(record.wallet_from);
                    // store.setEditRecordWalletTo(record.wallet_to);
                    // store.setEditRecordCategory(getEditRecordCategory());
                    // store.setEditRecordSubcategory(getEditRecordSubcategory());
                    // store.setEditRecordDate(new Date(record.date));
                    // store.setEditRecordComment(record.comment);
                    // store.setOpenEditTransactionForm(true);
                }}
                // component={Link}
                // to="/data/edit-transaction"
            >
                Редактировать
            </MenuItem> */}
            <MenuItem
                classes={{ root: classes.menuItem }}
                onClick={() => {
                    dispatch(setRecordMenuButtonAnchor(null));
                    dispatch(setOpenDialogRemoveRecord(true));
                }}
            >
                Delete
            </MenuItem>
        </Menu>
    );
};

export default Menu1;
