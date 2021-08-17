import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
	User,
	Transaction,
	Wallets,
	FormType,
	SaveTrx,
	DeleteTrx,
} from '../../services/types';
import getGroups from '../../components/Data/getGroups';
import axios from 'axios';

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
	scrollButtons: 'scrollable',
};

/// THUNKS

export const saveTrx = createAsyncThunk(
	'user/saveTrx',
	async (data: SaveTrx, { dispatch }) => {
		try {
			let trxId = await axios.post('/add-transaction', data);
			trxId = trxId.data;
			dispatch(user.actions.addNewTransaction({ data, trxId }));
			dispatch(user.actions.setOpenTransactionForm(false));
			if (data.trx.sum < 0) {
				dispatch(user.actions.clearTransactionFormExpenses());
			}
			if (data.trx.sum > 0) {
				dispatch(user.actions.clearTransactionFormIncome());
			}
		} catch (err) {
			throw new Error(err);
		}
	}
);

export const deleteTrx = createAsyncThunk(
	'user/deleteTrx',
	async (data: DeleteTrx, { dispatch }) => {
		const { trxId, updatedWallets } = data;
		try {
			await axios.post('/delete-transaction', data);
			dispatch(
				user.actions.deleteTransaction({
					trxId,
					updatedWallets,
				})
			);
			setTimeout(() => {
				dispatch(user.actions.setScrollButtons('scrollable'));
			}, 1000);
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
			const incomeCategories = action.payload.income_categories;
			const incomeCategoriesOrder = action.payload.income_categories_order;

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
				incomeCategories,
				incomeCategoriesOrder,
			};
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
					monthsArray.push(new Date(el.date).getMonth());
				});
				let uniqueMonthsArray: number[] = Array.from(new Set(monthsArray)).sort(
					(a, b) => b - a
				);
				newPageNumber = uniqueMonthsArray.indexOf(month);
				return newPageNumber;
			};

			let newTrx = { ...action.payload.data.trx, id: action.payload.trxId };

			transactions.push(newTrx);

			const monthFromNewTrx = new Date(newTrx.date).getMonth();
			let pageNumber = getNewPageNumber(monthFromNewTrx);
			localStorage.setItem('pageNumber', JSON.stringify(pageNumber));

			const groupsByMonth = getGroups(transactions);

			const updatedWallets = {
				...state.wallets,
				...action.payload.data.updatedWallets,
			};

			return {
				...state,
				groupsByMonth,
				transactions,
				pageNumber,
				wallets: updatedWallets,
			};
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
		setScrollButtons: (state, action) => {
			state.scrollButtons = action.payload;
		},
		deleteTransaction: (state, action) => {
			state.openDialogRemoveRecord = false;
			let transactions = [...state.transactions];
			transactions = state.transactions.filter(
				(trx) => trx.id !== action.payload.trxId
			);
			state.transactions = transactions;
			state.groupsByMonth = getGroups(transactions);
			let pageNumber: number;
			if (state.groupsByMonth[state.pageNumber]) {
				pageNumber = state.pageNumber;
			} else {
				if (state.pageNumber > 0) {
					pageNumber = state.pageNumber - 1;
				} else {
					pageNumber = 0;
				}
			}
			state.pageNumber = pageNumber;
			localStorage.setItem('pageNumber', JSON.stringify(pageNumber));
			const updatedWallets = {
				...state.wallets,
				...action.payload.updatedWallets,
			};
			state.wallets = updatedWallets;
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
			if (action.payload === '') state.expensesSubcategory = '';
		},
		setExpensesSubcategory: (state, action: { payload: string }) => {
			state.expensesSubcategory = action.payload;
		},
		setIncomeCategory: (state, action: { payload: string }) => {
			state.incomeCategory = action.payload;
			if (action.payload === '') state.incomeSubcategory = '';
		},
		setIncomeSubcategory: (state, action: { payload: string }) => {
			state.incomeSubcategory = action.payload;
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
		clearTransactionFormIncome: (state) => {
			state.incomeSum = '';
			state.incomeComment = '';
		},
	},
	extraReducers: {
		[`${saveTrx.pending}`]: (state) => {
			state.loading = true;
		},
		[`${saveTrx.fulfilled}`]: (state) => {
			state.loading = false;
		},
		[`${saveTrx.rejected}`]: (state) => {
			state.loading = false;
		},
		[`${deleteTrx.pending}`]: (state) => {
			state.loading = true;
		},
		[`${deleteTrx.fulfilled}`]: (state) => {
			state.loading = false;
		},
		[`${deleteTrx.rejected}`]: (state) => {
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
	setScrollButtons,
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
