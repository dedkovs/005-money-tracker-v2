import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const wallets = [
	'Cash',
	'Tinkoff',
	'Sber',
	'VTB',
	'Gazprom',
	'Alfa',
	'Raiffeisen',
];

const initialState: string[] = wallets;

export const walletsTopOrder = createSlice({
	name: 'walletsTopOrder',
	initialState,
	reducers: {
		setWalletsTopOrder: (state: string[], action: PayloadAction<string[]>) => {
			state = action.payload;
		},
	},
});

export const { setWalletsTopOrder } = walletsTopOrder.actions;
export default walletsTopOrder.reducer;
