import {
    SNACK_TYPE,
    SHOW_SNACK,
    HIDE_SNACK
} from './../actionTypes';

export const _showSnack = (type, msg) => (dispatch) => {
    dispatch({ type: SNACK_TYPE, payload: type });
    dispatch({ type: SHOW_SNACK, payload: msg });
}

export const _hideSnack = () => (dispatch) => {
    dispatch({ type: HIDE_SNACK });
}