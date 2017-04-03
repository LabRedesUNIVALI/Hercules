import * as actionTypes from './actionTypes';

const initialState = {
    token: null,
    isLoggedIn: false
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                token: action.payload.response.token,
                isLoggedIn: true
            };
        case actionTypes.LOGOUT_SUCCESS:
            return {
                ...state,
                token: null,
                isLoggedIn: false
            };
        default:
            return state;
    }
}
