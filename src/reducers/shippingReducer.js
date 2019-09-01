import { LOADING_SHIPPING, CALCULATE_COST, CLEAR_SHIPPING } from '../app/actions/types';
// import IsEmpty from '../validation/is-empty';
const initialState = {
    loading: false,
    data: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOADING_SHIPPING:
            return {
                ...state,
                loading: true
            }
        case CLEAR_SHIPPING:
            return{
                ...state,
                loading:false,
                data:{}
            }
        case CALCULATE_COST:
            return {
                ...state,
                loading: false,
                data: action.payload
            }
        default:
            return state;
    }
}