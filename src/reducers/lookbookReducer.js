import { GET_ALL_LOOKBOOK, LOADING_LOOKBOOK, GET_DETAIL_LOOKBOOK } from '../app/actions/types';
const initialState = {
    loading:false,
    lookbook:[],
    lookbook_image:[]
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOADING_LOOKBOOK:
            return{
                ...state,
                loading:true
            };
        case GET_ALL_LOOKBOOK:
            return {
                ...state,
                loading:false,
                lookbook:action.payload
            };
        case GET_DETAIL_LOOKBOOK:
            return{
                ...state,
                loading:false,
                lookbook:action.payload.lookbook,
                lookbook_image:action.payload.lookbook_image
            }
        default:
            return state;
    }
}