import { GET_ALL_SIZING, LOADING_SIZING } from '../app/actions/types';
const initialState = {
    loading: false,
    sizing: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOADING_SIZING:
            return {
                ...state,
                loading: true
            };
        case GET_ALL_SIZING:
            return {
                ...state,
                loading: false,
                sizing: action.payload
            };
  
        default:
            return state;
    }
}