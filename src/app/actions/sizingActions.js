import { GET_ALL_SIZING, LOADING_SIZING} from './types';
import axios from 'axios';
import { setNotification} from './notifActions';
export const getAllSizing = () => disbatch => {
    disbatch(loadingSizing());
    axios.get('/api/sizing/getall')
        .then(res => {
            disbatch({
                type: GET_ALL_SIZING,
                payload: res.data
            })
        })
        .catch(err => {
            let notification = {
                error: true,
                message: "There is an error !",
                notification: true
            }
            disbatch(setNotification(notification));
        })
}


export const loadingSizing = () => {
    return {
        type: LOADING_SIZING
    }
}