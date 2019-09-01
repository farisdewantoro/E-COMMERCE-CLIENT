import axios from 'axios';
import { AUTH_SET_USER, LOADING_AUTH_USER, AUTH_USER_LOGOUT, GET_ERRORS, STOP_LOADING_AUTH} from './types';
import jwt_decode from 'jwt-decode';
import {fetchCartList} from './cartActions';
// import {fetchToken} from './trackActions';
import {clearCartList} from './cartActions';
import jwt from 'jsonwebtoken';
import keys from '../config/keys';
import {setNotification} from './notifActions';


export const getUserInfo = () =>disbatch =>{
    disbatch(loadingAuth());
    axios({
        method:'POST',
        url:"/api/auth/user_info",
    })
        .then(res=>{
            let dataDecode = jwt_decode(res.data);
            disbatch({
                type: AUTH_SET_USER,
                payload: dataDecode.user
            })
            localStorage.setItem("hammerstout_a", res.data);
        })
        .catch(err => {
            if (!err.response.data.isAuth){
                localStorage.removeItem("hammerstout_a");
                disbatch(clearCurrentUser());
            }
            
        })
}

export const registerNewUser = (data,history) =>disbatch=>{

    disbatch(loadingAuth());
    axios({
        method:"POST",
        url:"/api/auth/register",
        data:data
    })
    .then(res=>{
        let dataDecode = jwt_decode(res.data.user);
        disbatch({
            type: AUTH_SET_USER,
            payload: dataDecode.user
        });

        localStorage.setItem("hammerstout_a", res.data.user);

        history.push(res.data.redirectURL);
    })
    .catch(err=>{
        disbatch({
            type: GET_ERRORS,
            payload:err.response.data
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



export const loginUser = (data,history)=>disbatch=>{
    axios.post('/api/auth/login',data)
        .then(res=>{
            let dataDecode = jwt_decode(res.data.user);
       
            disbatch({
                type: AUTH_SET_USER,
                payload: dataDecode.user
            })
            localStorage.setItem("hammerstout_a", res.data.user);
            history.push(res.data.redirectURL);
        })
        .catch(err => {
            if(err.response){
                disbatch({
                    type:GET_ERRORS,
                    payload:err.response.data
                })
            }
            let notification = {
                error: true,
                message: "There is an error !",
                notification: true
            }
            disbatch(setNotification(notification));

        })
}


export const logoutUser = () => disbatch => {
    disbatch(loadingAuth());
    axios({
        method: 'POST',
        url: "/api/auth/logout",
        headers: {
            withCredentials: true
        }
    })
        .then(res=>{
            localStorage.clear();
            disbatch(clearCurrentUser());
            disbatch(clearCartList());
           
          window.location.href="/sign-in";
        })
        .catch(err=>{
            console.log(err.response.data);
            let notification = {
                error: true,
                message: "There is an error !",
                notification: true
            }
            disbatch(setNotification(notification));
        })
}


export const loadingAuth = () => {
    return {
        type: LOADING_AUTH_USER
    }
}

export const setCurrentUser = (decode)=>{
    
    return{
        type: AUTH_SET_USER,
        payload:decode
    }
}

export const clearCurrentUser = ()=>{
    return{
        type: AUTH_USER_LOGOUT
    }
}

// export const removeErrors = () => {
//     return {
//         type: REMOVE_ERRORS
//     }
// }

export const stopLoadingAuth = () => {
    return {
        type: STOP_LOADING_AUTH
    }
}