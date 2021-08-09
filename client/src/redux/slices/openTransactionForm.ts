import { createSlice } from '@reduxjs/toolkit';

let initialState: boolean = false;

export const openTransactionForm = createSlice({
	name: 'openTransactionForm',
	initialState,
	reducers: {
		setOpenTransactionForm: (
			state: boolean,
			action: { payload: boolean; type: string }
		) => {
			state = action.payload;
			return state;
		},
	},
});

export const { setOpenTransactionForm } = openTransactionForm.actions;
export default openTransactionForm.reducer;
