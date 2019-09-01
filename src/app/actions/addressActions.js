import axios from 'axios';
import {
    GET_PROVINCE,
    LOADING_ADDRESS,
    FIND_CITY_FROM_PROVINCE,
    REMOVE_REGENCIES,
    FIND_DISTRICT_FROM_REGENCY,
    REMOVE_DISTRICTS,
    FIND_VILLAGE_FROM_DISTRICT
} from './types';
import { setNotification } from './notifActions';
export const findOptionAddress = (data)=>disbatch=>{
    disbatch(loadingAdress());
    axios.post('/api/address/get/option',data)
        .then(res=>{
            disbatch({ type: GET_PROVINCE, payload: res.data.province });
            disbatch({ type: FIND_CITY_FROM_PROVINCE, payload: res.data.regency });
            disbatch({ type: FIND_DISTRICT_FROM_REGENCY, payload: res.data.district });
            disbatch({ type: FIND_VILLAGE_FROM_DISTRICT, payload: res.data.village });
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

export const getProvince = () => disbatch => {
    disbatch(loadingAdress());
    axios
        .get('/api/address/get/provinces')
        .then(res => {
            disbatch({type: GET_PROVINCE, payload: res.data})
            disbatch(removeRegencies());
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

export const findRegencies = (data) => disbatch => {
    disbatch(loadingAdress());
    axios
        .post('/api/address/find/regencies', data)
        .then(res => {
            disbatch({type: FIND_CITY_FROM_PROVINCE, payload: res.data})
            disbatch(removeDistricts());
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

export const findDistricts = (data) => disbatch => {
    disbatch(loadingAdress());
    axios
        .post('/api/address/find/districts', data)
        .then(res => {
            disbatch({type: FIND_DISTRICT_FROM_REGENCY, payload: res.data});

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
export const findVillages = (data) => disbatch => {
    disbatch(loadingAdress());
    axios
        .post('/api/address/find/villages', data)
        .then(res => {
            disbatch({ type: FIND_VILLAGE_FROM_DISTRICT, payload: res.data });

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


export const loadingAdress = () => {
    return {type: LOADING_ADDRESS}
}

export const removeRegencies = () => {
    return {type: REMOVE_REGENCIES}
}

export const removeDistricts = () => {
    return {type: REMOVE_DISTRICTS}
}