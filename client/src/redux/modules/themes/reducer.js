import * as actionTypes from './actionTypes';

const initialState = {
    items: []
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.FETCH_ALL_SUCCESS:
            return {
                ...state,
                items: action.payload.response
            };
        case actionTypes.CREATE_SUCCESS:
            return {
                ...state,
                items: [...state.items, action.payload.response]
            };
        default:
            return state;
    }
}
