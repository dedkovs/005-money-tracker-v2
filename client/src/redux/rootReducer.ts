import { combineReducers } from 'redux';
import user from './slices/user';

const rootReducer = combineReducers({
	user,
});

export default rootReducer;
