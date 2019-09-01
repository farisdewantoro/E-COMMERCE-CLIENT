import {
    AUTH_SET_USER, LOADING_AUTH_USER, LOGIN_WITH_GOOGLE, AUTH_USER_LOGOUT, UPDATE_PROFILE,
    STOP_LOADING_AUTH, UPDATE_ADDRESS, GET_ADDRESS_USER, CLEAR_ADDRESS_USER, SET_CURRENT_ADDRESS_USER} 
    from '../app/actions/types';
import IsEmpty from '../validation/is-empty';
const initialState = {
    isAuthenticated: false,
    user: {},
    user_address:{},
    loading: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOADING_AUTH_USER:
            return{
                ...state,
                loading:true
            }
        case AUTH_USER_LOGOUT:
            return{
                ...state,
                loading:false,
                isAuthenticated:false,
                user:{}
            }
        case UPDATE_ADDRESS:
            return{
                ...state,
                loading:false,
                user_address:action.payload
            }
        case GET_ADDRESS_USER:
            return{
                ...state,
                loading:false,
                user_address:action.payload
            }
        case UPDATE_PROFILE:
            return{
                ...state,
                loading: false,
                isAuthenticated: !IsEmpty(action.payload),
                user: action.payload
            }
        case STOP_LOADING_AUTH:
            return{
                ...state,
                loading:false
            }
        case AUTH_SET_USER:
            return{
                ...state,
                loading:false,
                isAuthenticated:!IsEmpty(action.payload),
                user:action.payload
            }
        case LOGIN_WITH_GOOGLE:
            return{
                ...state,
                loading:false,
                isAuthenticated:!IsEmpty(action.payload),
                user:action.payload
            }
        case CLEAR_ADDRESS_USER:
            return{
                ...state,
                user_address:{}

            }
        case SET_CURRENT_ADDRESS_USER:
            return{
                ...state,
                user_address:action.payload
            }
      
        default:
            return state;
    }
}