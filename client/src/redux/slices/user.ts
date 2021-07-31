import { createSlice } from '@reduxjs/toolkit';
import {
    User,
    Transaction,
    Wallets,
    // GroupByDay,
    // GroupByMonth,
} from '../../services/types';
import getGroups from '../../components/Data/getGroups';
import {
    comments,
    expenses_categories,
    income_categories,
    wallets,
} from '../../services/data';

let [category, subcategory] = ['', ''];
const getCategoryAndSubcategory = (obj: any) => {
    const keys = Object.keys(obj);
    let key;
    category = keys[Math.floor(Math.random() * keys.length)];
    key = obj[category];
    subcategory = key[Math.floor(Math.random() * key.length)];
};

const getDate = () => {
    const year = 2020;
    let month: number | string = Math.round(Math.random() * (12 - 1) + 1);
    const day = Math.round(Math.random() * (30 - 1) + 1);
    if (month < 10) month = `0${month}`;
    return `${year}-${month}-${day}`;
};

let pageNumber: number;
let localStorage_pageNumber = localStorage.getItem('pageNumber');
if (localStorage_pageNumber && !isNaN(+localStorage_pageNumber)) {
    pageNumber = +JSON.parse(localStorage_pageNumber);
} else pageNumber = 0;

export const initialState: User = {
    isAuth: false,
    pageNumber,
    transactions: [],
    groupsByMonth: [],
    wallets: {},
    walletsTopOrder: [],
    walletsOrder: [],
};

export const user = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setIsAuth: (state, action: { payload: boolean }) => {
            let isAuth = action.payload;
            return { ...state, isAuth };
        },
        setPageNumber: (state, action: { payload: number }) => {
            pageNumber = action.payload;
            localStorage.setItem('pageNumber', JSON.stringify(pageNumber));
            state.pageNumber = action.payload;
            // return { ...state, pageNumber };
        },
        addTransaction: (state) => {
            let transactions = [...state.transactions];
            const getNewPageNumber = (month: number) => {
                let newPageNumber: number;
                let monthsArray: number[] = [];
                transactions.forEach((el) => {
                    monthsArray.push(+el.date.substr(5, 2));
                });
                let uniqueMonthsArray: number[] = Array.from(
                    new Set(monthsArray)
                ).sort((a, b) => b - a);
                newPageNumber = uniqueMonthsArray.indexOf(month);
                return newPageNumber;
            };
            let newTrx: Transaction = {
                comment: comments[Math.floor(Math.random() * comments.length)],
                date: getDate(),
                id: Math.floor(Math.random() * 10 ** 10) + 1,
                sum: 0,
                wallet: wallets[Math.floor(Math.random() * wallets.length)],
                wallet_from: null,
                wallet_to: null,
            };
            getCategoryAndSubcategory(expenses_categories);
            newTrx.expenses_category = category;
            newTrx.expenses_subcategory = subcategory;
            getCategoryAndSubcategory(income_categories);
            newTrx.income_category = category;
            newTrx.income_subcategory = subcategory;
            newTrx.sum =
                (Math.ceil(Math.random() * 1000000) + 1) *
                (Math.round(Math.random()) ? 1 : -1);
            if (newTrx.sum < 0) {
                newTrx.income_category = null;
                newTrx.income_subcategory = null;
            }
            if (newTrx.sum > 0) {
                newTrx.expenses_category = null;
                newTrx.expenses_subcategory = null;
            }

            transactions.push(newTrx);
            const monthFromNewTrx = +newTrx.date.substr(5, 2);
            let pageNumber = getNewPageNumber(monthFromNewTrx);
            localStorage.setItem('pageNumber', JSON.stringify(pageNumber));

            const groupsByMonth = getGroups(transactions);

            return { ...state, groupsByMonth, transactions, pageNumber };
        },
        setAllTransactions: (state, action: { payload: Transaction[] }) => {
            let transactions = action.payload;
            const groupsByMonth = getGroups(transactions);
            // state.transactions = action.payload;
            let pageNumber: number;
            if (!groupsByMonth[state.pageNumber]) {
                pageNumber = 0;
                localStorage.setItem('pageNumber', '0');
            } else {
                pageNumber = state.pageNumber;
            }
            return { ...state, pageNumber, transactions, groupsByMonth };
        },
        setWallets: (state, action) => {
            let wallets: Wallets = action.payload;
            return { ...state, wallets };
        },
        setWalletsTopOrder: (state, action) => {
            let walletsTopOrder: string[] = action.payload;
            return { ...state, walletsTopOrder };
        },
        setWalletsOrder: (state, action) => {
            let walletsOrder: string[] = action.payload;
            return { ...state, walletsOrder };
        },
        deleteTransaction: (state, action) => {
            let transactions = [...state.transactions];
            transactions = state.transactions.filter(
                (trx) => trx.id !== action.payload
            );
            const groupsByMonth = getGroups(transactions);
            let pageNumber: number;
            if (groupsByMonth[state.pageNumber]) {
                pageNumber = state.pageNumber;
            } else {
                if (state.pageNumber > 0) {
                    pageNumber = state.pageNumber - 1;
                } else {
                    pageNumber = 0;
                }
            }
            return { ...state, pageNumber, transactions, groupsByMonth };
        },
    },
});

export const {
    setIsAuth,
    setPageNumber,
    addTransaction,
    setAllTransactions,
    setWallets,
    setWalletsTopOrder,
    setWalletsOrder,
    deleteTransaction,
} = user.actions;
export default user.reducer;
