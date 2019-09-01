import { GET_INSTAGRAM_MEDIA_RECENT,LOADING_INSTAGRAM} from './types';
import axios from 'axios';
import {setNotification} from './notifActions';

export const loadingInstagram =()=>{
    return{
        type:LOADING_INSTAGRAM
    }
}

export const getInstagramMedia = ()=>disbatch=>{
    axios.get('/api/instagram/get/media/recent')
        .then(res=>{
            disbatch({
                type:GET_INSTAGRAM_MEDIA_RECENT,
                payload:res.data
            })
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