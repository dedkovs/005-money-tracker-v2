import { createSlice } from '@reduxjs/toolkit';

const initialState: boolean = false;

export const isAuth = createSlice({
	name: 'isAuth',
	initialState,
	reducers: {
		setIsAuth: (state: boolean, action: { payload: boolean; type: string }) => {
			state = action.payload;
			return state;
		},
	},
});

export const { setIsAuth } = isAuth.actions;
export default isAuth.reducer;
