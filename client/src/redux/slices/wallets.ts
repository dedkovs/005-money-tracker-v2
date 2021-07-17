import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Wallets {
    [key: string]: [number, string, number];
}

const walletsWithMoney: Wallets = {
    Cash: [Math.round(Math.random() * 10 ** 7) + 1, 'show', 0],
    Tinkoff: [Math.round(Math.random() * 10 ** 7) + 1, 'show', 0],
    Sber: [Math.round(Math.random() * 10 ** 7) + 1, 'show', 0],
    VTB: [Math.round(Math.random() * 10 ** 7) + 1, 'show', 0],
    Gazprom: [Math.round(Math.random() * 10 ** 7) + 1, 'show', 0],
    Alfa: [Math.round(Math.random() * 10 ** 7) + 1, 'show', 0],
    Raiffeisen: [Math.round(Math.random() * 10 ** 7) + 1, 'show', 0],
};

// [
//     'Cash',
//     'Tinkoff',
//     'Sber',
//     'VTB',
//     'Gazprom',
//     'Alfa',
//     'Raiffeisen',
// ];

// const initialState: Wallets = {};
const initialState: Wallets = walletsWithMoney;

export const wallets = createSlice({
    name: 'wallets',
    initialState,
    reducers: {
        setWallets: (state: Wallets, action: PayloadAction<Wallets>) => {
            state = action.payload;
            return state;
        },
    },
});

export const { setWallets } = wallets.actions;
export default wallets.reducer;
