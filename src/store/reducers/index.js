import { combineReducers } from 'redux';
import Auth from './auth_reducer';
import Snack from './snack_reducer';
import Quiz from './quiz_reducer';
import Lang from './language_reducer';

const rootReducers = combineReducers({
    Auth,
    Snack,
    Quiz,
    Lang
});

export default rootReducers;
