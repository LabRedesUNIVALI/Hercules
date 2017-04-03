import * as actionTypes from './actionTypes';

const initialState = {
    token: null
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                token: action.payload.response.token
            };
        default:
            return state;
    }
}
