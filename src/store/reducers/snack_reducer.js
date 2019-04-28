import {
    SNACK_TYPE,
    SHOW_SNACK,
    HIDE_SNACK
} from './../actionTypes';

const INITIAL_STATE = {
    snackType: '',
    snackMessage: '',
    snackFlag: false
}

export default function (state = INITIAL_STATE, action) {
    const { type, payload } = action;
    switch (type) {
        case SNACK_TYPE:
            return { ...state, snackType: payload };
        case SHOW_SNACK:
            return { ...state, snackFlag: true, snackMessage: payload };
        case HIDE_SNACK:
            return { ...state, snackFlag: false, snackMessage: '' };
        default:
            return state;
    }
}