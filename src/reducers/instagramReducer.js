import { GET_INSTAGRAM_MEDIA_RECENT, LOADING_INSTAGRAM } from '../app/actions/types';
const initialState = {
    instagram:[]
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOADING_INSTAGRAM:
            return{
                ...state,
                loading:true
            };
        case GET_INSTAGRAM_MEDIA_RECENT:
            return {
                ...state,
                loading:false,
                instagram:action.payload
            };
  
        default:
            return state;
    }
}