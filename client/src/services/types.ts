export interface Anchors {
	recordMenuButtonAnchor: false | string;
	openDialogRemoveRecord: boolean;
	openDrawer: boolean;
	openTransactionForm: boolean;
}

export interface Open {
	openDialogRemoveRecord: boolean;
	openDrawer: boolean;
	openTransactionForm: boolean;
}

export interface Transaction {
	comment: string | null;
	date: string;
	expenses_category?: string | null;
	expenses_subcategory?: string | null;
	id: number;
	income_category?: string | null;
	income_subcategory?: string | null;
	sum: number;
	wallet: string;
	wallet_from: string | null;
	wallet_to: string | null;
}

export type Wallet = [number, boolean, number];

export interface Wallets {
	[key: string]: Wallet;
}

export interface GroupByDay {
	day: string;
	sum: number;
	records: Transaction[];
}

export interface GroupByMonth {
	month: string;
	records: GroupByDay[];
}

export type FormType = 'expenses' | 'income';

export type RecordToEdit = Transaction | null;
export interface User {
	isAuth: boolean;
	pageNumber: number;
	transactions: Transaction[];
	groupsByMonth: GroupByMonth[];
	wallets: Wallets;
	walletsTopOrder: string[];
	walletsOrder: string[];
	expensesSum: number | '';
	incomeSum: number | '';
	expensesWallet: string;
	incomeWallet: string;
	darkTheme: boolean;
	showComments: boolean;
	showCents: boolean;
	logoAnimated: boolean;
	logoLoaded: boolean;
	formType: FormType;
	recordToEdit: RecordToEdit;
	recordMenuButtonAnchor: false | string;
	openDialogRemoveRecord: boolean;
	openDrawer: boolean;
	openTransactionForm: boolean;
	editRecordSum: number | '';
	editRecordWallet: string;
	editRecordWalletFrom: string;
	editRecordWalletTo: string;
	editRecordCategory: string;
	editRecordSubcategory: string;
	editRecordDate: Date | '';
	editRecordComment: string;
	expensesCategory: string;
	expensesSubcategory: string;
	incomeCategory: string;
	incomeSubcategory: string;
	expensesDate: string;
	incomeDate: string;
	expensesComment: string;
	incomeComment: string;
	expensesCategoriesOrder: string[];
	incomeCategoriesOrder: string[];
}
export interface UI {
	darkTheme: boolean;
	showComments: boolean;
	showCents: boolean;
	logoAnimated: boolean;
	logoLoaded: boolean;
	formType: FormType;
}
