import { SET_NOTIFICATION, CLEAR_NOTIFICATION } from '../app/actions/types';
const initialState = {};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_NOTIFICATION:
            return action.payload;
        case CLEAR_NOTIFICATION:
            return {};
        default:
            return state;
    }
}