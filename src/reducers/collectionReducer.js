import { GET_ALL_COLLECTION, LOADING_COLLECTION, GET_DETAIL_COLLECTION } from '../app/actions/types';
const initialState = {
    loading:false,
    collection:[],
    collection_mobile:[]
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOADING_COLLECTION:
            return{
                ...state,
                loading:true
            };
        case GET_ALL_COLLECTION:
            return {
                ...state,
                loading:false,
                collection: action.payload.collection,
                collection_mobile: action.payload.collection_mobile
            };
        case GET_DETAIL_COLLECTION:
            return{
                ...state,
                loading:false,
                collection: action.payload.collection,
                collection_mobile:action.payload.collection_mobile
            }
        default:
            return state;
    }
}