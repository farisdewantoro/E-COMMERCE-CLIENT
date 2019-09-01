import { LOADING_VOUCHER, CLEAR_CURRENT_VOUCHER, SET_CURRENT_VOUCHER, CLEAR_LOADING_VOUCHER} from './types';
import axios from 'axios';
import {setNotification} from './notifActions';

export const setVoucherDiscount = (data) =>disbatch=>{
    disbatch(loadingVoucher());
    axios.post('/api/voucher/set',data)
        .then(res=>{
            if(res.data.notification){
                disbatch(setNotification(res.data.notification));
            }
            if(res.data.data){
                disbatch(setCurrentVoucher(res.data.data));
            }
        })
        .catch(err=>{
            if(err.response.data.notification){
                disbatch(setNotification(err.response.data.notification));
                disbatch(stopLoadingVoucher());
            }
          
          
        })
}

export const loadingVoucher = ()=>{
    return{
        type:LOADING_VOUCHER
    }
}

export const setCurrentVoucher = (data)=>{
    return{
        type:SET_CURRENT_VOUCHER,
        payload:data
    }
}

export const clearCurrentVoucher = ()=>{
    return{
        type:CLEAR_CURRENT_VOUCHER
    }
}

export const stopLoadingVoucher=()=>{
    return{
        type: CLEAR_LOADING_VOUCHER
    }
}