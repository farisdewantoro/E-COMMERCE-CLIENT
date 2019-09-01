import { ADD_TO_CART, LOADING_CART, STOP_LOADING_CART, FETCH_CART_LIST, UPDATE_CART_LIST, DELETE_CART_LIST, CLEAR_CART_LIST } from '../app/actions/types';
const initialState = {
    loading: false,
    cartList:[]
}

export default function (state = initialState, action) {
    switch (action.type) {
        case LOADING_CART:
            return {
                ...state,
                loading: true
            }
        case ADD_TO_CART:
            return {
                ...state,
                loading: false,
                cartList: action.payload
            }
        case STOP_LOADING_CART:
            return{
                ...state,
                loading:false
            }
        case FETCH_CART_LIST:
            return{
                ...state,
                loading:false,
                cartList:action.payload
            }
        case UPDATE_CART_LIST:
            return{
                ...state,
                loading:false,
                cartList:action.payload
            }
        case DELETE_CART_LIST:
            return{
                ...state,
                loading:false,
                cartList:action.payload
            }
        case CLEAR_CART_LIST:
            return{
                ...state,
                cartList:[]
            }
      
        default:
            return state;
    }
}