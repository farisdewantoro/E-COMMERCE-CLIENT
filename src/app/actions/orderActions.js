import { GET_ERRORS,LOADING_ORDER, REMOVE_LOADING_ORDER, GET_ORDER_LIST, SET_CURRENT_ORDER, GET_ALL_ORDER, SET_CURRENT_ORDER_PAYMENT} from './types';
import axios from 'axios';
import { setNotification } from './notifActions';

export const loadingOrder = ()=>{
    return{
        type:LOADING_ORDER,
    }
}
export const removeLoadingOrder = ()=>{
    return{
        type: REMOVE_LOADING_ORDER
    }
}

export const submitConfirmPayment = (data,history) => disbatch=>{
    disbatch(loadingOrder());
    axios.post('/api/order/confirm/payment', data)
        .then(res => {
            let notification = {
                error: false,
                message: "Your order has been confirm!",
                notification: true
            }
            disbatch(setNotification(notification));
            disbatch(removeLoadingOrder());
            history.push('/my-account/orders');
        })
        .catch(err => {
            let notification = {
                error: true,
                message: "There is an error !",
                notification: true
            }
            if(err.response.data){
                disbatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                })
            }
            disbatch(removeLoadingOrder());
        
            disbatch(setNotification(notification));
        })
}
export const getOrderBanTransfer = (user)=>disbatch=>{
    disbatch(loadingOrder());
    axios.post('/api/order/get/order_list',user)
        .then(res => {
            disbatch({
                type: GET_ORDER_LIST,
                payload: res.data
            });
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
export const getCurrentOrder = (token)=>disbatch=>{
    disbatch(loadingOrder());
    axios.get('/api/order/get/current/'+token)
        .then(res=>{
            if(res.data.data){
                disbatch(setCurrentOrder(res.data.data));
            }
            if(res.data.redirect){
                window.location.reload();
            }
        })
        .catch(err=>{
            let notification = {
                error: true,
                message: "There is an error !",
                notification: true
            }
            disbatch(setNotification(notification));
        })
}

export const getCurrentOrderPayment = (token,history) =>disbatch=>{
    disbatch(loadingOrder());
    axios.get('/api/order/get/current/payment/'+token)
        .then(res=>{
            if(res.data.data){
                disbatch({
                    type: SET_CURRENT_ORDER_PAYMENT,
                    payload: res.data.data
                });
            }
        })
        .catch(err=>{
            let notification = {
                error: true,
                message: "There is an error !",
                notification: true
            }
            disbatch(setNotification(notification));
            history.push('/my-account/orders');
        })
}

export const setCurrentOrder = (data)=>{
    return{
        type: SET_CURRENT_ORDER,
        payload:data
    }
}

export const getAllOrder = ()=>disbatch=>{
    disbatch(loadingOrder());
    axios.get('/api/order/get/all-order')
        .then(res=>{
            disbatch({
                type: GET_ALL_ORDER,
                payload:res.data
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