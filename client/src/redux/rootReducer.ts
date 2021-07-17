import { combineReducers } from 'redux';
import transactions from './slices/transactions';
import transactions2 from './slices/transactions2';
import darkTheme from './slices/darkTheme';
import openDrawer from './slices/openDrawer';
import isAuth from './slices/isAuth';
import showComments from './slices/showComments';
import showCents from './slices/showCents';
import logoAnimated from './slices/logoAnimated';
import logoLoaded from './slices/logoLoaded';
import walletsTopOrder from './slices/walletsTopOrder';
import wallets from './slices/wallets';
import openTransactionForm from './slices/openTransactionForm';
import pageNumber from './slices/pageNumber';

const rootReducer = combineReducers({
    transactions,
    transactions2,
    darkTheme,
    openDrawer,
    isAuth,
    showComments,
    showCents,
    logoAnimated,
    logoLoaded,
    walletsTopOrder,
    wallets,
    openTransactionForm,
    pageNumber,
});

export default rootReducer;
