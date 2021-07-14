import { combineReducers } from 'redux';
import transactions from './slices/transactions';
import darkTheme from './slices/darkTheme';
import openDrawer from './slices/openDrawer';
import isAuth from './slices/isAuth';
import showComments from './slices/showComments';
import showCents from './slices/showCents';
import logoAnimated from './slices/logoAnimated';
import logoLoaded from './slices/logoLoaded';

const rootReducer = combineReducers({
    transactions,
    darkTheme,
    openDrawer,
    isAuth,
    showComments,
    showCents,
    logoAnimated,
    logoLoaded,
});

export default rootReducer;
