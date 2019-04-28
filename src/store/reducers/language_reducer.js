import {
    CHANGE_LANGUAGE
} from '../actionTypes';


let INITIAL_STATE = {
    french: false
}

export default function (state = INITIAL_STATE, action) {
    const { type, payload } = action;
    switch (type) {
        case CHANGE_LANGUAGE:
            return { french: payload }
        default:
            return state;
    }
}