import { combineReducers } from 'redux';
import anchors from './slices/anchors';
import recordToEdit from './slices/recordToEdit';
import open from './slices/open';
import transactionForm from './slices/transactionForm';
import ui from './slices/ui';
import user from './slices/user';

const rootReducer = combineReducers({
    anchors,
    recordToEdit,
    open,
    transactionForm,
    ui,
    user,
});

export default rootReducer;
