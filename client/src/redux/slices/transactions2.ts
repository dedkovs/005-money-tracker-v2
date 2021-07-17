import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Transaction {
    comment: string | null;
    date: string;
    expenses_category?: string | null;
    expenses_subcategory?: string | null;
    id: number;
    income_category?: string | null;
    income_subcategory?: string | null;
    sum: number;
    // show?: boolean;
    wallet: string;
    wallet_from: string | null;
    wallet_to: string | null;
}

const comments = [
    '',
    'Just\nDo\nIt',
    'Think Different',
    "Because you're worth it",
    'Open Happiness',
    "I'm loving it",
    'There are some things money can’t buy.\nFor everything else, there’s MasterCard.',
    'Think Big',
    "What's in your wallet?",
    'Have it your way',
    'All for Freedom.\nFreedom for All.',
    'Quality never goes out of style',
    'Live in your world.\nPlay in ours.',
    'Diamonds are forever',
    'Everywhere you want to be',
    'The Ultimate Driving Machine',
    'Save money.\nLive better.',
    'Impossible is Nothing',
    "Don't leave home without it",
    'Challenge everything',
    'What happens here, stays here',
];
const expenses_categories = {
    Auto: [
        'Auto parts',
        'Gas',
        'Parking',
        'Toll road',
        'Repairs',
        'Tax',
        'Insurance',
        'Fine',
    ],
    Entertainment: ['Restaurant', 'Cinema', 'Concert', 'Bar', 'Club'],
    'Online stores': [
        'Amazon',
        'Aliexpress',
        'ASOS',
        'eBay',
        'Adidas',
        "Macy's",
        'New Balance',
        'Nike',
        'iHerb',
    ],
    'Communal payments': [
        'Phone',
        'Internet',
        'TV',
        'Electricity',
        'Heating',
        'Cold water',
        'Hot water',
        'Garbage removal',
    ],
    Education: [
        'Udemi',
        'Coursera',
        'Codecademy',
        'Udacity',
        'Javarush',
        'Learn.Javascript',
    ],
    Sport: ['Pool', 'Gym', 'Yoga'],
    Subscriptions: [
        'Apple Music',
        'Google',
        'iCloud',
        'Youtube',
        'Netflix',
        'Spotify',
        'Yandex',
    ],
    Food: [
        'Auchan',
        'Tesco',
        'Walmart',
        'Spar',
        'Carrefour',
        '7-Eleven',
        'Costco',
        'Metro',
        'Lidl',
    ],
    Others: [''],
    Travels: [
        'UK',
        'USA',
        'France',
        'Spain',
        'Italy',
        'Turkey',
        'Thailand',
        'Indonesia',
        'Cyprus',
        'Greece',
        'Egypt',
        'Cuba',
        'Brazil',
        'Mexico',
    ],
    Services: ['Haircut', 'Dry cleaning', 'Dentist', 'Plumber'],
};

const projects = [
    'Project #1',
    'Project #2',
    'Project #3',
    'Project #4',
    'Project #5',
];
const income_categories = {
    Design: projects,
    'Video filming': projects,
    Photography: projects,
    DJ: projects,
    Programming: projects,
};
const wallets = [
    'Cash',
    'Tinkoff',
    'Sber',
    'VTB',
    'Gazprom',
    'Alfa',
    'Raiffeisen',
];

let [category, subcategory] = ['', ''];
const getCategoryAndSubcategory = (obj: any) => {
    const keys = Object.keys(obj);
    let key;
    category = keys[Math.floor(Math.random() * keys.length)];
    key = obj[category];
    subcategory = key[Math.floor(Math.random() * key.length)];
    // return;
    // return obj[keys[(keys.length * Math.random()) << 0]];
};

const getDate = () => {
    const year = 2020;
    let month: number | string = Math.round(Math.random() * (12 - 1) + 1);
    const day = Math.round(Math.random() * (30 - 1) + 1);
    if (month < 10) month = `0${month}`;
    return `${year}-${month}-${day}`;
};

interface Transactions2 {
    transactions: Transaction[];
    pageNumber: number;
}

let initialPageNumber: number;

let localStorage_pageNumber = localStorage.getItem('pageNumber');
if (localStorage_pageNumber) {
    initialPageNumber = +JSON.parse(localStorage_pageNumber);
} else initialPageNumber = 1;

export let initialState: Transactions2 = {
    transactions: [],
    pageNumber: initialPageNumber,
};

export const transactions2 = createSlice({
    name: 'transactions2',
    initialState,
    reducers: {
        addTransaction: (
            state: Transactions2
            // action: PayloadAction<number>
        ) => {
            const getNewPageNumber = (month: number) => {
                let newPageNumber: number = 1;
                let monthsArray: number[] = [];
                state.transactions.forEach((el) => {
                    monthsArray.push(+el.date.substr(5, 2));
                });
                let uniqueMonthsArray: number[] = Array.from(
                    new Set(monthsArray)
                ).sort((a, b) => b - a);
                // console.log(uniqueMonthsArray);
                newPageNumber = uniqueMonthsArray.indexOf(month) + 1;
                return newPageNumber;
            };
            let newTrx: Transaction = {
                comment: comments[Math.floor(Math.random() * comments.length)],
                date: getDate(),
                // expenses_subcategory: expenses_categories.Auto[0],
                id: Math.floor(Math.random() * 10 ** 10) + 1,
                // income_category: null,
                // income_subcategory: null,
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

            state.transactions.push(newTrx);

            const monthFromNewTrx = +newTrx.date.substr(5, 2);
            // console.log(monthFromNewTrx);
            // getNewPageNumber(monthFromNewTrx);
            // const trx = state.transactions;
            // console.log(newTrx);
            // console.log(JSON.parse(JSON.stringify(trx)));
            let newPageNumber = getNewPageNumber(monthFromNewTrx);
            state.pageNumber = newPageNumber;
            localStorage.setItem('pageNumber', JSON.stringify(newPageNumber));

            return state;
        },
        setAllTransactions: (
            state: Transactions2,
            action: PayloadAction<Transaction[]>
        ) => {
            state.transactions = action.payload;
            return state;
        },
        setPageNumber: (
            state: Transactions2,
            action: { payload: number; type: string }
        ) => {
            state.pageNumber = action.payload;
            localStorage.setItem('pageNumber', JSON.stringify(action.payload));
            return state;
        },
    },
});

export const { addTransaction, setAllTransactions, setPageNumber } =
    transactions2.actions;
export default transactions2.reducer;
