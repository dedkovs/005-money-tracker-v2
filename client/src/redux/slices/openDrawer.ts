import { createSlice } from '@reduxjs/toolkit';

const initialState: boolean = false;

export const openDrawer = createSlice({
	name: 'openDrawer',
	initialState,
	reducers: {
		setOpenDrawer: (
			state: boolean,
			action: { payload: boolean; type: string }
		) => {
			state = action.payload;
		},
	},
});

export const { setOpenDrawer } = openDrawer.actions;
export default openDrawer.reducer;
