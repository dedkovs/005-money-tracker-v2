import { createSlice } from '@reduxjs/toolkit';

let initialState: number;

let localStorage_pageNumber = localStorage.getItem('pageNumber');
if (localStorage_pageNumber) {
	initialState = +JSON.parse(localStorage_pageNumber);
} else initialState = 1;

export const pageNumber = createSlice({
	name: 'pageNumber',
	initialState,
	reducers: {
		setPageNumber: (
			state: number,
			action: { payload: number; type: string }
		) => {
			state = action.payload;
			localStorage.setItem('pageNumber', JSON.stringify(action.payload));
		},
	},
});

export const { setPageNumber } = pageNumber.actions;
export default pageNumber.reducer;
