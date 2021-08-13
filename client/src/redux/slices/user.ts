import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User, Transaction, Wallets, FormType } from '../../services/types';
import getGroups from '../../components/Data/getGroups';
// import {
// 	comments,
// 	expenses_categories,
// 	income_categories,
// 	wallets,
// } from '../../services/data';
import axios from 'axios';

// let [category, subcategory] = ['', ''];

// const getRandomCategoryAndSubcategory = (obj: any) => {
// 	const keys = Object.keys(obj);
// 	let key;
// 	category = keys[Math.floor(Math.random() * keys.length)];
// 	key = obj[category];
// 	subcategory = key[Math.floor(Math.random() * key.length)];
// };

// const getRandomDate = () => {
// 	const year = 2020;
// 	let month: number | string = Math.round(Math.random() * (12 - 1) + 1);
// 	const day = Math.round(Math.random() * (30 - 1) + 1);
// 	if (month < 10) month = `0${month}`;
// 	return `${year}-${month}-${day}`;
// };

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
	userId: null,
	pageNumber,
	loading: false,
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
	expensesCategories: {},
	expensesCategory: '',
	expensesSubcategory: '',
	incomeCategories: {},
	incomeCategory: '',
	incomeSubcategory: '',
	expensesDate: new Date().toLocaleDateString(),
	incomeDate: new Date().toLocaleDateString(),
	expensesComment: '',
	incomeComment: '',
	expensesCategoriesOrder: [''],
	incomeCategoriesOrder: [''],
};

/// THUNKS

export const saveTrx = createAsyncThunk(
	'user/saveTrx',
	async (data, { dispatch }) => {
		try {
			let trxId = await axios.post('/add-transaction', data);
			trxId = trxId.data;
			// console.log('data: ', data);
			dispatch(user.actions.addNewTransaction({ data, trxId }));
			dispatch(user.actions.setOpenTransactionForm(false));
			dispatch(user.actions.clearTransactionFormExpenses());
		} catch (err) {
			throw new Error(err);
		}
	}
);

/// REDUCER

export const user = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setIsAuth: (state, action: { payload: boolean }) => {
			let isAuth = action.payload;
			return { ...state, isAuth };
		},
		setUserId: (state, action) => {
			state.userId = action.payload;
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
			const expensesWallet = walletsOrder[0];
			const incomeWallet = walletsOrder[0];
			const expensesCategories = action.payload.expenses_categories;
			const expensesCategoriesOrder = action.payload.expenses_categories_order;

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
				expensesCategories,
				expensesCategoriesOrder,
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
		addNewTransaction: (state, action: { payload: any }) => {
			let transactions = [...state.transactions];
			const getNewPageNumber = (month: number) => {
				let newPageNumber: number;
				let monthsArray: number[] = [];
				transactions.forEach((el) => {
					// monthsArray.push(+el.date.substr(5, 2));
					monthsArray.push(new Date(el.date).getMonth());
				});
				let uniqueMonthsArray: number[] = Array.from(new Set(monthsArray)).sort(
					(a, b) => b - a
				);
				// console.log('uniqueMonthsArray: ', uniqueMonthsArray);
				newPageNumber = uniqueMonthsArray.indexOf(month);
				// console.log('newPageNumber: ', newPageNumber);
				return newPageNumber;
			};

			let newTrx = { ...action.payload.data.trx, id: action.payload.trxId };

			transactions.push(newTrx);

			// const monthFromNewTrx = +newTrx.date.substr(5, 2);
			const monthFromNewTrx = new Date(newTrx.date).getMonth();
			// console.log('monthFromNewTrx: ', monthFromNewTrx);
			let pageNumber = getNewPageNumber(monthFromNewTrx);
			localStorage.setItem('pageNumber', JSON.stringify(pageNumber));

			const groupsByMonth = getGroups(transactions);
			// console.log('groupsByMonth: ', groupsByMonth);
			// console.log('pageNumber: ', pageNumber);
			// console.log('transactions: ', transactions);
			// console.log(
			// 	'action.payload.data.updatedWallets: ',
			// 	action.payload.data.updatedWallets
			// );

			const updatedWallets = {
				...state.wallets,
				...action.payload.data.updatedWallets,
			};
			// console.log(
			// 	'updatedWallets: ',
			// 	JSON.parse(JSON.stringify(updatedWallets))
			// );

			return {
				...state,
				groupsByMonth,
				transactions,
				pageNumber,
				wallets: updatedWallets,
			};
		},
		// addNewTransaction: (state) => {
		// 	let transactions = [...state.transactions];
		// 	const getNewPageNumber = (month: number) => {
		// 		let newPageNumber: number;
		// 		let monthsArray: number[] = [];
		// 		transactions.forEach((el) => {
		// 			monthsArray.push(+el.date.substr(5, 2));
		// 		});
		// 		let uniqueMonthsArray: number[] = Array.from(new Set(monthsArray)).sort(
		// 			(a, b) => b - a
		// 		);
		// 		newPageNumber = uniqueMonthsArray.indexOf(month);
		// 		return newPageNumber;
		// 	};
		// 	let newTrx: Transaction = {
		// 		comment: comments[Math.floor(Math.random() * comments.length)],
		// 		date: getRandomDate(),
		// 		id: Math.floor(Math.random() * 10 ** 10) + 1,
		// 		sum: 0,
		// 		wallet: wallets[Math.floor(Math.random() * wallets.length)],
		// 		wallet_from: null,
		// 		wallet_to: null,
		// 	};
		// 	getRandomCategoryAndSubcategory(expenses_categories);
		// 	newTrx.expenses_category = category;
		// 	newTrx.expenses_subcategory = subcategory;
		// 	getRandomCategoryAndSubcategory(income_categories);
		// 	newTrx.income_category = category;
		// 	newTrx.income_subcategory = subcategory;
		// 	newTrx.sum =
		// 		(Math.ceil(Math.random() * 1000000) + 1) *
		// 		(Math.round(Math.random()) ? 1 : -1);
		// 	if (newTrx.sum < 0) {
		// 		newTrx.income_category = null;
		// 		newTrx.income_subcategory = null;
		// 	}
		// 	if (newTrx.sum > 0) {
		// 		newTrx.expenses_category = null;
		// 		newTrx.expenses_subcategory = null;
		// 	}

		// 	transactions.push(newTrx);
		// 	const monthFromNewTrx = +newTrx.date.substr(5, 2);
		// 	let pageNumber = getNewPageNumber(monthFromNewTrx);
		// 	localStorage.setItem('pageNumber', JSON.stringify(pageNumber));

		// 	const groupsByMonth = getGroups(transactions);

		// 	return { ...state, groupsByMonth, transactions, pageNumber };
		// },
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
		setExpensesCategory: (state, action: { payload: string }) => {
			state.expensesCategory = action.payload;
		},
		setExpensesSubcategory: (state, action: { payload: string }) => {
			state.expensesSubcategory = action.payload;
		},
		setIncomeCategory: (state, action: { payload: string }) => {
			state.incomeCategory = action.payload;
		},
		setIncomeSubcategory: (state, action: { payload: string }) => {
			state.incomeCategory = action.payload;
		},
		setExpensesDate: (state, action: { payload: string }) => {
			state.expensesDate = action.payload;
		},
		setIncomeDate: (state, action: { payload: string }) => {
			state.incomeDate = action.payload;
		},
		setExpensesComment: (state, action: { payload: string }) => {
			state.expensesComment = action.payload;
		},
		setIncomeComment: (state, action: { payload: string }) => {
			state.incomeComment = action.payload;
		},
		clearTransactionFormExpenses: (state) => {
			state.expensesSum = '';
			state.expensesComment = '';
		},
	},
	extraReducers: {
		[`${saveTrx.pending}`]: (state) => {
			// console.log('PENDING');
			state.loading = true;
		},
		[`${saveTrx.fulfilled}`]: (state) => {
			// console.log('FULFILLED');
			state.loading = false;
		},
		[`${saveTrx.rejected}`]: (state) => {
			// console.log('REJECTED');
			state.loading = false;
		},
	},
});

/// EXPORT

export const {
	setIsAuth,
	setUserId,
	logOut,
	setUserData,
	setPageNumber,
	addNewTransaction,
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
	setExpensesCategory,
	setExpensesSubcategory,
	setIncomeCategory,
	setIncomeSubcategory,
	setExpensesDate,
	setIncomeDate,
	setExpensesComment,
	setIncomeComment,
} = user.actions;
export default user.reducer;
