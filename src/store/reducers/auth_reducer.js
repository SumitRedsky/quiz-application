import {
    SIGN_UP_SUCCESS,
    LOG_IN_SUCCESS,
    USER_STATUS_SUCCESS,
    LOG_OUT_SUCCESS
} from './../actionTypes';


let INITIAL_STATE = {
    user: {},
    isLoggedIn: false
}

export default function (state = INITIAL_STATE, action) {
    const { type, payload } = action;
    switch (type) {
        case SIGN_UP_SUCCESS:
            return { ...state, isLoggedIn: true, user: payload }
        case LOG_IN_SUCCESS:
            return { ...state, isLoggedIn: true, user: payload }
        case USER_STATUS_SUCCESS:
            return { ...state, isLoggedIn: true, user: payload }
        case LOG_OUT_SUCCESS:
            return { ...state, isLoggedIn: false, user: {} }
        default:
            return state;
    }
}