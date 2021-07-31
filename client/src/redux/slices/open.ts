import { createSlice } from '@reduxjs/toolkit';
import { Open } from '../../services/types';

const initialState: Open = {
    openDialogRemoveRecord: false,
    openDrawer: false,
    openTransactionForm: false,
};

export const open = createSlice({
    name: 'open',
    initialState,
    reducers: {
        setOpenDialogRemoveRecord: (state, action: { payload: boolean }) => {
            const openDialogRemoveRecord = action.payload;
            return { ...state, openDialogRemoveRecord };
        },
        setOpenDrawer: (state, action: { payload: boolean }) => {
            const openDrawer = action.payload;
            return { ...state, openDrawer };
        },
        setOpenTransactionForm: (state, action: { payload: boolean }) => {
            const openTransactionForm = action.payload;
            return { ...state, openTransactionForm };
        },
    },
});

export const {
    setOpenDialogRemoveRecord,
    setOpenDrawer,
    setOpenTransactionForm,
} = open.actions;
export default open.reducer;
