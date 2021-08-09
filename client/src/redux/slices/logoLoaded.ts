import { createSlice } from '@reduxjs/toolkit';

let initialState: boolean = false;

export const logoLoaded = createSlice({
	name: 'logoLoaded',
	initialState,
	reducers: {
		setLogoLoaded: (
			state: boolean,
			action: { payload: boolean; type: string }
		) => {
			state = action.payload;
		},
	},
});

export const { setLogoLoaded } = logoLoaded.actions;
export default logoLoaded.reducer;
