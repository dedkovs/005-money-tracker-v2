import { createSlice } from '@reduxjs/toolkit';

let initialState: boolean = true;

export const logoAnimated = createSlice({
	name: 'logoAnimated',
	initialState,
	reducers: {
		setLogoAnimated: (
			state: boolean,
			action: { payload: boolean; type: string }
		) => {
			state = action.payload;
		},
	},
});

export const { setLogoAnimated } = logoAnimated.actions;
export default logoAnimated.reducer;
