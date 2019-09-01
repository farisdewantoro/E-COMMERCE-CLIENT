import axios from 'axios';
import { CALCULATE_COST, LOADING_SHIPPING, GET_ERRORS, STOP_LOADING_SHIPPING, CLEAR_SHIPPING,REMOVE_ERRORS} from './types';
import { setNotification } from './notifActions';

export const loadingShipping = ()=>{
    return{
        type:LOADING_SHIPPING
    }
}
export const stopLoadingShipping = () => {
    return {
        type: STOP_LOADING_SHIPPING
    }
}

export const calculateCost = (data) =>disbatch=>{
    disbatch(loadingShipping());
    disbatch({
        type: REMOVE_ERRORS
    })
    axios.post('/api/shipping/check/cost',data)
        .then(res=>{
            disbatch({
                type:CALCULATE_COST,
                payload:res.data
            })
        })
        .catch(err=>{
            disbatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
            if (err.response.data.notification.error) {
                disbatch(setNotification(err.response.data.notification));
            }
            disbatch({
                type: CLEAR_SHIPPING,
            })
        
        })
}

