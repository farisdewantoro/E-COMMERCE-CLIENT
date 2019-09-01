import { LOADING_TRACK, FETCH_TRACK_TOKEN } from '../app/actions/types';

const initialState = {
    loading: false,
    data:{}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOADING_TRACK:
            return {
                ...state,
                loading: true
            }
        case FETCH_TRACK_TOKEN:
            return{
                ...state,
                loading:false,
                data:action.payload
            }
        default:
            return state;
    }
}