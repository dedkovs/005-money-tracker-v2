import { createSlice } from '@reduxjs/toolkit';
import { User, Transaction, Wallets, FormType } from '../../services/types';
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

let darkTheme: boolean;
const localStorage_darkTheme = localStorage.getItem('darkTheme');
if (
	localStorage_darkTheme &&
	(localStorage_darkTheme === 'false' || localStorage_darkTheme === 'true')
) {
	darkTheme = JSON.parse(localStorage_darkTheme);
} else darkTheme = false;

let showComments: boolean;
const localStorage_showComments = localStorage.getItem('showComments');
if (
	localStorage_showComments &&
	(localStorage_showComments === 'false' ||
		localStorage_showComments === 'true')
) {
	showComments = JSON.parse(localStorage_showComments);
} else showComments = true;

let showCents: boolean;
const localStorage_showCents = localStorage.getItem('showCents');
if (
	localStorage_showCents &&
	(localStorage_showCents === 'false' || localStorage_showCents === 'true')
) {
	showCents = JSON.parse(localStorage_showCents);
} else showCents = true;

/// INITIAL STATE

export const initialState: User = {
	isAuth: false,
	pageNumber,
	transactions: [],
	groupsByMonth: [],
	wallets: {},
	walletsTopOrder: [],
	walletsOrder: [],
	expensesSum: '',
	incomeSum: '',
	expensesWallet: '',
	incomeWallet: '',
	darkTheme,
	showComments,
	showCents,
	logoAnimated: true,
	logoLoaded: false,
	formType: 'expenses',
	recordToEdit: null,
	recordMenuButtonAnchor: false,
	openDialogRemoveRecord: false,
	openDrawer: false,
	openTransactionForm: false,
	editRecordSum: '',
	editRecordWallet: '',
	editRecordWalletFrom: '',
	editRecordWalletTo: '',
	editRecordCategory: '',
	editRecordSubcategory: '',
	editRecordDate: '',
	editRecordComment: '',
	expensesCategory: '',
	expensesSubcategory: '',
	incomeCategory: '',
	incomeSubcategory: '',
	expensesDate: new Date().toString(),
	incomeDate: new Date().toString(),
	expensesComment: '',
	incomeComment: '',
};

/// REDUCER

export const user = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setIsAuth: (state, action: { payload: boolean }) => {
			let isAuth = action.payload;
			return { ...state, isAuth };
		},
		logOut: (state) => {
			state.openDrawer = false;
			state.logoAnimated = true;
			state.logoLoaded = false;
			state.isAuth = false;
			state.transactions = [];
			state.wallets = {};
			state.walletsTopOrder = [];
			state.walletsOrder = [];
			state.expensesSum = '';
			state.incomeSum = '';
			state.formType = 'expenses';
			state.recordMenuButtonAnchor = false;
			state.recordToEdit = null;
		},
		setUserData: (state, action) => {
			let transactions = action.payload.transactions;
			const groupsByMonth = getGroups(transactions);
			let pageNumber: number;
			if (!groupsByMonth[state.pageNumber]) {
				pageNumber = 0;
				localStorage.setItem('pageNumber', '0');
			} else {
				pageNumber = state.pageNumber;
			}

			const wallets: Wallets = action.payload.wallets;
			const walletsTopOrder: string[] = action.payload.wallets_top_order;
			const walletsOrder: string[] = action.payload.wallets_order;
			const expensesWallet = state.walletsOrder[0];
			const incomeWallet = state.walletsOrder[0];

			return {
				...state,
				pageNumber,
				transactions,
				groupsByMonth,
				wallets,
				walletsTopOrder,
				walletsOrder,
				expensesWallet,
				incomeWallet,
			};

			// state.transactions = action.payload.transactions;
			// const groupsByMonth = getGroups(state.transactions);
			// // let pageNumber: number; //
			// if (!groupsByMonth[state.pageNumber]) {
			// 	state.pageNumber = 0;
			// 	localStorage.setItem('pageNumber', '0');
			// }
			// // state.transactions = action.payload.transactions; //
			// state.wallets = action.payload.wallets;
			// state.walletsTopOrder = action.payload.wallets_top_order;
			// state.walletsOrder = action.payload.wallets_order;
			// state.expensesWallet = action.payload.wallets_order[0];
			// state.incomeWallet = action.payload.wallets_order[0];
		},
		setPageNumber: (state, action: { payload: number }) => {
			pageNumber = action.payload;
			localStorage.setItem('pageNumber', JSON.stringify(pageNumber));
			state.pageNumber = action.payload;
		},
		addTransaction: (state) => {
			let transactions = [...state.transactions];
			const getNewPageNumber = (month: number) => {
				let newPageNumber: number;
				let monthsArray: number[] = [];
				transactions.forEach((el) => {
					monthsArray.push(+el.date.substr(5, 2));
				});
				let uniqueMonthsArray: number[] = Array.from(new Set(monthsArray)).sort(
					(a, b) => b - a
				);
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
			let pageNumber: number;
			if (!groupsByMonth[state.pageNumber]) {
				pageNumber = 0;
				localStorage.setItem('pageNumber', '0');
			} else {
				pageNumber = state.pageNumber;
			}
			return { ...state, pageNumber, transactions, groupsByMonth };
		},
		// setWallets: (state, action) => {
		// 	let wallets: Wallets = action.payload;
		// 	return { ...state, wallets };
		// },
		// setWalletsTopOrder: (state, action) => {
		// 	let walletsTopOrder: string[] = action.payload;
		// 	return { ...state, walletsTopOrder };
		// },
		// setWalletsOrder: (state, action) => {
		// 	let walletsOrder: string[] = action.payload;
		// 	return { ...state, walletsOrder };
		// },
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
		toggleTheme: (state) => {
			darkTheme = !darkTheme;
			localStorage.setItem('darkTheme', JSON.stringify(darkTheme));
			return { ...state, darkTheme };
		},
		toggleShowComments: (state) => {
			showComments = !showComments;
			localStorage.setItem('showComments', JSON.stringify(showComments));
			return { ...state, showComments };
		},
		toggleShowCents: (state) => {
			showCents = !showCents;
			localStorage.setItem('showCents', JSON.stringify(showCents));
			return { ...state, showCents };
		},
		setLogoAnimated: (state, action: { payload: boolean }) => {
			const logoAnimated = action.payload;
			return { ...state, logoAnimated };
		},
		setLogoLoaded: (state, action: { payload: boolean }) => {
			const logoLoaded = action.payload;
			return { ...state, logoLoaded };
		},
		setFormType: (state, action: { payload: FormType }) => {
			const formType = action.payload;
			return { ...state, formType };
		},
		setRecordToEdit: (state, action) => {
			state.recordToEdit = action.payload;
		},
		setRecordMenuButtonAnchor: (state, action: { payload: false | string }) => {
			if (action.payload !== false) {
				state.openDrawer = false;
				state.openTransactionForm = false;
				state.openDialogRemoveRecord = false;
			}
			state.recordMenuButtonAnchor = action.payload;
		},
		setOpenDialogRemoveRecord: (state, action: { payload: boolean }) => {
			if (action.payload === true) {
				state.recordMenuButtonAnchor = false;
				state.openDrawer = false;
				state.openTransactionForm = false;
			}
			state.openDialogRemoveRecord = action.payload;
		},
		setOpenDrawer: (state, action: { payload: boolean }) => {
			if (action.payload === true) {
				state.recordMenuButtonAnchor = false;
				state.openDialogRemoveRecord = false;
				state.openTransactionForm = false;
			}
			state.openDrawer = action.payload;
		},
		setOpenTransactionForm: (state, action: { payload: boolean }) => {
			if (action.payload === true) {
				state.recordMenuButtonAnchor = false;
				state.openDialogRemoveRecord = false;
				state.openDrawer = false;
			}
			state.openTransactionForm = action.payload;
		},
	},
});

/// EXPORT

export const {
	setIsAuth,
	logOut,
	setUserData,
	setPageNumber,
	addTransaction,
	setAllTransactions,
	// setWallets,
	// setWalletsTopOrder,
	// setWalletsOrder,
	deleteTransaction,
	setExpensesSum,
	setIncomeSum,
	setExpensesWallet,
	setIncomeWallet,
	toggleTheme,
	toggleShowComments,
	toggleShowCents,
	setLogoAnimated,
	setLogoLoaded,
	setFormType,
	setRecordToEdit,
	setRecordMenuButtonAnchor,
	setOpenDialogRemoveRecord,
	setOpenDrawer,
	setOpenTransactionForm,
} = user.actions;
export default user.reducer;
