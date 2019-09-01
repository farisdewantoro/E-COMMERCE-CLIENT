import axios from 'axios';
import { ADD_TO_CART, LOADING_CART, GET_ERRORS, STOP_LOADING_CART, REMOVE_ERRORS,
    FETCH_CART_LIST, UPDATE_CART_LIST, DELETE_CART_LIST, CLEAR_CART_LIST} from './types'
import Cookies from 'js-cookie';
import {setNotification} from './notifActions';
export const addToCart = (data,history) =>disbatch=>{
    disbatch(removeErrors());
    disbatch(loadingCart());
    axios.post('/api/cart/addtocart', data)
        .then(res=>{
            disbatch({
                type:ADD_TO_CART,
                payload:res.data.cart_list
            });
            disbatch(setNotification(res.data.notification));
            if (typeof res.data.token_c !== "undefined") {
                localStorage.setItem("hammerstout_c", res.data.token_c);
            }
            history.push('/carts');
         
        })
        .catch(err=>{
            disbatch({
                type:GET_ERRORS,
                payload:err.response.data
            });
            if (err.response.data.notification.error){
                disbatch(setNotification(err.response.data.notification));
                disbatch(stopLoadingCart());
            }
        })
}

export const deletecart = (data)=>disbatch=>{
    disbatch(loadingCart());
    axios.delete('/api/cart/deletecart/'+data)   
    .then(res=>{
            disbatch({
                type: DELETE_CART_LIST,
                payload:res.data.cart_list
            });
        if (typeof res.data.token_c !== "undefined") {
            localStorage.setItem("hammerstout_c", res.data.token_c);
        }
        })
        .catch(err=>{
            disbatch({
                type:GET_ERRORS,
                payload:err.response.data
            });
            if(err.response.data.error){
                disbatch(stopLoadingCart());
            }
            let notification = {
                error: true,
                message: "There is an error !",
                notification: true
            }
            disbatch(setNotification(notification));
        })
}
export const updatedCart = (data) => disbatch =>{
    disbatch(loadingCart());
    axios.put('/api/cart/updatecart', data)
        .then(res => {
            disbatch({
                type: UPDATE_CART_LIST,
                payload: res.data.cart_list
            });
            if (typeof res.data.token_c !== "undefined") {
                localStorage.setItem("hammerstout_c", res.data.token_c);
            }
        })
        .catch(err => {
            disbatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
            if (err.response.data.error) {
                disbatch(stopLoadingCart());
            }
            let notification = {
                error: true,
                message: "There is an error !",
                notification: true
            }
            disbatch(setNotification(notification));
        })
}

export const fetchCartList = (value)=>disbatch=>{
   
    disbatch(loadingCart());
    axios({
        method: 'POST',
        url: '/api/v1/track/cart'
    }).then(res => {
        let dataType = typeof res.data.cart_list;
        if(typeof res.data.token_c !== "undefined"){
            localStorage.setItem("hammerstout_c", res.data.token_c);
        }
        if(dataType !== "undefined"){
        disbatch({
            type:FETCH_CART_LIST,
            payload:res.data.cart_list
        })
        }else{
            disbatch(stopLoadingCart());
            localStorage.removeItem("hammerstout_c");
        }
        
       
    }).catch(err => {
        disbatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
        if (err.response.data.error) {
            disbatch(stopLoadingCart());
        }
        let notification = {
            error: true,
            message: "There is an error !",
            notification: true
        }
        disbatch(setNotification(notification));
    })
}

export const loadingCart = ()=>{
    return{
        type: LOADING_CART
    }
}
export const removeErrors = ()=>{
    return{
        type:REMOVE_ERRORS
    }
}

export const clearCartList = ()=>{
    return{
        type: CLEAR_CART_LIST
    }
}

export const stopLoadingCart = () =>{
    return{
        type: STOP_LOADING_CART
    }
}

export const setCart = (decode)=>{
    return{
        type: FETCH_CART_LIST,
        payload:decode
    }
}