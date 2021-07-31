import { createSlice } from '@reduxjs/toolkit';
import { RecordToEdit } from '../../services/types';

let initialState: RecordToEdit = null;

export const recordToEdit = createSlice({
    name: 'recordToEdit',
    initialState,
    reducers: {
        setRecordToEdit: (state, action) => {
            return action.payload;
        },
    },
});

export const { setRecordToEdit } = recordToEdit.actions;
export default recordToEdit.reducer;
