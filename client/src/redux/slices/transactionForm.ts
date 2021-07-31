import { createSlice } from '@reduxjs/toolkit';

interface TransactionForm {
    expensesSum: number | '';
    incomeSum: number | '';
    expensesWallet: string;
    incomeWallet: string;
}

let initialState: TransactionForm = {
    expensesSum: '',
    incomeSum: '',
    expensesWallet: '',
    incomeWallet: '',
};

export const transactionForm = createSlice({
    name: 'transactionForm',
    initialState,
    reducers: {
        setExpensesSum: (state, action) => {
            let expensesSum =
                action.payload === undefined || isNaN(action.payload)
                    ? ''
                    : action.payload;
            return { ...state, expensesSum };
        },
        setIncomeSum: (state, action) => {
            let incomeSum =
                action.payload === undefined || isNaN(action.payload)
                    ? ''
                    : action.payload;
            return { ...state, incomeSum };
        },
        setExpensesWallet: (state, action: { payload: string }) => {
            const expensesWallet = action.payload;
            return { ...state, expensesWallet };
        },
        setIncomeWallet: (state, action: { payload: string }) => {
            const incomeWallet = action.payload;
            return { ...state, incomeWallet };
        },
    },
});

export const {
    setExpensesSum,
    setIncomeSum,
    setExpensesWallet,
    setIncomeWallet,
} = transactionForm.actions;
export default transactionForm.reducer;
