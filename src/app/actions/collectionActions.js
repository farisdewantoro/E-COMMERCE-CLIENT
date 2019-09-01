import { GET_ALL_COLLECTION, LOADING_COLLECTION, GET_DETAIL_COLLECTION } from './types';
import axios from 'axios';
import {setNotification} from './notifActions';
export const getAllCollection = () => disbatch => {
    disbatch(loadingCollection());
    axios.get('/api/collection/getall')
        .then(res => {
            disbatch({
                type: GET_ALL_COLLECTION,
                payload: res.data
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

export const getDetailCollection = (data) => {
    return{
        type: GET_DETAIL_COLLECTION,
        payload:data
    }
}

export const loadingCollection = () => {
    return {
        type: LOADING_COLLECTION
    }
}