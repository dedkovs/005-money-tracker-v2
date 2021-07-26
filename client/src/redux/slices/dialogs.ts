import {
    createSlice,
    // PayloadAction
} from '@reduxjs/toolkit';

interface Dialogs {
    openDialogRemoveRecord: boolean;
}

let initialState: Dialogs = {
    openDialogRemoveRecord: false,
};

export const dialogs = createSlice({
    name: 'dialogs',
    initialState,
    reducers: {
        setOpenDialogRemoveRecord: (state, action) => {
            state.openDialogRemoveRecord = action.payload;
            return state;
        },
    },
});

export const { setOpenDialogRemoveRecord } = dialogs.actions;
export default dialogs.reducer;
