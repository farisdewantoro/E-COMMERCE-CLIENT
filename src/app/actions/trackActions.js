import axios from 'axios';
import Cookies from 'js-cookie';
import { FETCH_TRACK_TOKEN,LOADING_TRACK} from './types';
import {clearCurrentUser} from './authActions';
import { getUserInfo} from './authActions';
export const fetchToken =()=>disbatch=>{
    disbatch(loadingTrack());
    axios({
        method: 'POST',
        url: '/api/v1/track/token',
  
    }).then(res => {
        disbatch({
            type: FETCH_TRACK_TOKEN,
            payload:res.data
        });
        if (res.data.user_auth){
            disbatch(getUserInfo());
        }
        if(res.data.user_auth === false){
            disbatch(clearCurrentUser());
            localStorage.removeItem("hammerstout_a");
        }
    }).catch(err => {
        if (err.response.data.error && err.response.data.redirect) {
            return window.location.href = "/";
        }
    })

}

export const loadingTrack = ()=>{
    return{
        type:LOADING_TRACK
    }
}