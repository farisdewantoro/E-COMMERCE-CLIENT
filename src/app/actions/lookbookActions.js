import { GET_ALL_LOOKBOOK, LOADING_LOOKBOOK, GET_DETAIL_LOOKBOOK} from './types';
import axios from 'axios';
import { setNotification } from './notifActions';
export const getAllLookbook = ()=>disbatch=>{
    disbatch(loadingLookbook());
    axios.get('/api/lookbook/getall')
        .then(res=>{
            disbatch({
                type:GET_ALL_LOOKBOOK,
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

export const getDetailLookbook = (slug)=>disbatch=>{
    disbatch(loadingLookbook());
    axios.get('/api/lookbook/get/detail/'+slug)
        .then(res=>{
            disbatch({
                type: GET_DETAIL_LOOKBOOK,
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

export const loadingLookbook = ()=>{
    return{
        type:LOADING_LOOKBOOK
    }
}