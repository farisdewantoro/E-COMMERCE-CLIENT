import { LOADING_VOUCHER, SET_CURRENT_VOUCHER, CLEAR_CURRENT_VOUCHER, CLEAR_LOADING_VOUCHER } from '../app/actions/types';
const initialState = {
    loading:false,
    voucher:{},
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOADING_VOUCHER:
            return{
                ...state,
                loading:true
            };
        case SET_CURRENT_VOUCHER:
            return{
                ...state,
                loading:false,
                voucher:action.payload,
            };
        case CLEAR_CURRENT_VOUCHER:
            return{
                ...state,
                loading:false,
                voucher:{}
            }
        case CLEAR_LOADING_VOUCHER:
            return{
                ...state,
                loading:false
            }
    
        default:
            return state;
    }
}