import axios from 'axios';
import { UPDATE_PROFILE, 
    REMOVE_ERRORS,GET_ERRORS, UPDATE_ADDRESS, GET_ADDRESS_USER, CLEAR_ADDRESS_USER, SET_CURRENT_ADDRESS_USER} from './types';
import {loadingAuth,stopLoadingAuth} from './authActions';
import { setNotification} from './notifActions';
export const updateProfile =(data)=>disbatch=>{
    disbatch(loadingAuth());
    axios.put("/api/auth/update/profile",data)
        .then(res=>{
                disbatch({
                type:UPDATE_PROFILE,
                payload:res.data.user
            });
            disbatch({
                type: REMOVE_ERRORS
            });
           localStorage.setItem("hammerstout_a",res.data.token_user);
            let notification = {
                error: false,
                message: "PROFILE HAS BEEN UPDATED",
                notification: true
            }
            disbatch(setNotification(notification));
        })
        .catch(err=>{
            disbatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
            disbatch(stopLoadingAuth());
            let notification = {
                error: true,
                message: "There is an error !",
                notification: true
            }
            disbatch(setNotification(notification));
        })
}

export const updateAddressLocation = (data)=>disbatch=>{
    disbatch(loadingAuth());
    axios.post("/api/auth/update/address",data)
        .then(res=>{
            disbatch({
                type:UPDATE_ADDRESS,
                payload:res.data.address
            });
            disbatch({
                type: REMOVE_ERRORS
            });
            disbatch(setNotification(res.data.notification))
            localStorage.setItem("hammerstout_address", res.data.token_a);
            
        })
        .catch(err => {
            disbatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
            disbatch(stopLoadingAuth());
            let notification = {
                error: true,
                message: "There is an error !",
                notification: true
            }
            disbatch(setNotification(notification));
        })
}

export const getAddressLocation = (data)=>disbatch=>{
    axios.get("/api/auth/get/address")
        .then(res=>{
            localStorage.setItem("hammerstout_address", res.data.token_a);
            disbatch({
                type: GET_ADDRESS_USER,
                payload:res.data.address
            });
          
        }).catch(err=>{
            if (typeof err.response.data !== "undefined" && err.response.data.error){
                let notification = {
                    error: true,
                    message: "There is an error !",
                    notification: true
                }
                disbatch(setNotification(notification));
            }
            if (typeof err.response.data !== "undefined" && !err.response.data.error){
                localStorage.removeItem("hammerstout_address");
            }
           
        })
}

export const setAddressCurrentUser =data=>{
    return{
        type:SET_CURRENT_ADDRESS_USER,
        payload:data
    }
}

export const clearAddressUser =()=>{
    return{
        type:CLEAR_ADDRESS_USER
    }
}