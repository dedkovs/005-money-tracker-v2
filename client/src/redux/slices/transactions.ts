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

let initialState: Transaction[];

let localStorage_transactions = localStorage.getItem('transactions');
if (localStorage_transactions) {
    initialState = JSON.parse(localStorage_transactions);
} else initialState = [];

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

            let jsonTransactions = JSON.parse(localStorage.transactions);
            let newJsonTransactions = [...jsonTransactions, newTrx];
            localStorage.transactions = JSON.stringify(newJsonTransactions);
            state.push(newTrx);

            // let localStorage_transactions =
            //     localStorage.getItem('transactions');
            // if (localStorage_transactions) {
            //     let jsonTransactions = JSON.parse(localStorage_transactions);
            //     let newJsonTransactions = [...jsonTransactions, action.payload];
            //     localStorage.transactions = JSON.stringify(newJsonTransactions);
            //     state = newJsonTransactions;
            // }

            return state;
        },
        setAllTransactions: (
            state: Transaction[],
            action: PayloadAction<Transaction[]>
        ) => {
            state = action.payload;
            localStorage.setItem('transactions', JSON.stringify(state));
            return state;
        },
    },
});

export const { addTransaction, setAllTransactions } = transactions.actions;
export default transactions.reducer;
