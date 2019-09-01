import {
    GET_PROVINCE,
    LOADING_ADDRESS,
    FIND_CITY_FROM_PROVINCE,
    REMOVE_DISTRICTS,
    REMOVE_REGENCIES,
    FIND_DISTRICT_FROM_REGENCY,
    FIND_VILLAGE_FROM_DISTRICT
} from '../app/actions/types';
// import IsEmpty from '../validation/is-empty';
const initialState = {
    provinces:[],
    regencies:[],
    districts:[],
    villages:[],
    loading: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOADING_ADDRESS:
            return {
                ...state,
                loading: true
            }
        case GET_PROVINCE:
            return {
                ...state,
                loading:false,
                provinces:action.payload
            }
        case FIND_CITY_FROM_PROVINCE:
            return{
                ...state,
                loading:false,
                regencies:action.payload
            }
        case REMOVE_DISTRICTS:
            return{
                ...state,
                loading:false,
                districts:[]
            }
        case REMOVE_REGENCIES:
            return{
                ...state,
                loading:false,
                regencies:[]
            }
        case FIND_DISTRICT_FROM_REGENCY:
            return{
                ...state,
                loading:false,
                districts:action.payload
            }
        case FIND_VILLAGE_FROM_DISTRICT:
            return{
                ...state,
                loading:false,
                villages:action.payload
            }
       
        default:
            return state;
    }
}