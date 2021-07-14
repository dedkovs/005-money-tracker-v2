import { combineReducers } from 'redux';
import transactions from './slices/transactions';
import darkTheme from './slices/darkTheme';
import openDrawer from './slices/openDrawer';
import isAuth from './slices/isAuth';
import showComments from './slices/showComments';
import showCents from './slices/showCents';

const rootReducer = combineReducers({
    transactions,
    darkTheme,
    openDrawer,
    isAuth,
    showComments,
    showCents,
});

export default rootReducer;
