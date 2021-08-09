import { Transaction } from './transactions2';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

let initialState: Transaction = {
	comment: '',
	date: '',
	expenses_category: '',
	expenses_subcategory: '',
	id: -1,
	income_category: '',
	income_subcategory: '',
	sum: 0,
	wallet: '',
	wallet_from: '',
	wallet_to: '',
};
export const recordToEdit = createSlice({
	name: 'recordToEdit',
	initialState,
	reducers: {
		setRecordToEdit: (state, action: PayloadAction<Transaction>) => {
			state = action.payload;
		},
	},
});

export const { setRecordToEdit } = recordToEdit.actions;
export default recordToEdit.reducer;
