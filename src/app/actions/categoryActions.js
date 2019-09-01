import GET_CATEGORY_LIST,LOADING_CATEGORY from './types';
import axios from 'axios';
import {setNotification} from './notifActions';

export const getAllCategory = ()=>disbatch=>{
    disbatch(loadingCategory());
    axios.get('/api/category/get/all')
        .then(res=>{
            console.log(res);
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


export const loadingCategory = ()=>{
    return{
        type:LOADING_CATEGORY
    }
}