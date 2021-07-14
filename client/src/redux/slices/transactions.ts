import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Transaction {
    comment: string | null;
    date: string;
    expenses_category: string | null;
    expenses_subcategory: string | null;
    id: number;
    income_category: string | null;
    income_subcategory: string | null;
    sum: number;
    show?: boolean;
    wallet: string;
    wallet_from: string | null;
    wallet_to: string | null;
}

export let initialState: Transaction[] = [];

export const transactions = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
        addTransaction: (
            state: Transaction[],
            action: PayloadAction<number>
        ) => {
            let newTrx = {
                comment: 'Cool food and wine!',
                date: '2021-07-01',
                expenses_category: 'Restaurants',
                expenses_subcategory: 'No fish',
                id: action.payload,
                income_category: null,
                income_subcategory: null,
                sum: -100000,
                wallet: 'Sber',
                wallet_from: null,
                wallet_to: null,
            };

            state.push(newTrx);

            return state;
        },
        setAllTransactions: (
            state: Transaction[],
            action: PayloadAction<Transaction[]>
        ) => {
            state = action.payload;
            return state;
        },
    },
});

export const { addTransaction, setAllTransactions } = transactions.actions;
export default transactions.reducer;
