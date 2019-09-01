import axios from 'axios';
import { LOADING_PRODUCT, 
    STOP_LOADING_PRODUCT, 
    GET_PRODUCT_HIGHLIGHT, 
    GET_PRODUCT,
    GET_PRODUCT_DETAIL} from './types';
import {setNotification} from './notifActions';
import { getDetailCollection} from './collectionActions';
export const getProductWithParamCategory = data => disbatch =>{
    disbatch(loadingProduct());
    data = data.toLowerCase().replace(/[\s(-.+)]/g,'');
    axios.get('/api/product/highlight/'+data)
        .then(res=>{
            disbatch({
                type: GET_PRODUCT_HIGHLIGHT,
                payload:res.data
            })
        })
        .catch(err=>{
            disbatch(stopLoadingProduct());
            let notification = {
                error: true,
                message: "There is an error !",
                notification: true
            }
            disbatch(setNotification(notification));
        })
};


export const getProductWithQuery = (tag,category,type,collection,query) =>disbatch=>{
   
    let url;
    if (typeof tag !== "undefined" && typeof category == "undefined" && typeof type == "undefined"){
        url = '/api/product/'+tag;
    }
    if (typeof category !== "undefined" && typeof tag !== "undefined" && typeof type == "undefined"){
        url =`/api/product/${tag}/${category}`;
    }
    if (typeof category !== "undefined" && typeof tag !== "undefined" && typeof type !=="undefined"){
        url = `/api/product/${tag}/${category}/${type}`;
    }
    if (typeof tag == "undefined" && typeof category == "undefined" && typeof type == "undefined" && typeof collection !== "undefined") {
        url = `/api/collection/get/${collection}`;
    }
    if (typeof tag == "undefined" && typeof category == "undefined" && typeof type == "undefined" && typeof collection == "undefined"){
        url = '/api/product';
    }
  
    disbatch(loadingProduct());
    axios.get(url, {
        params: {
            filter: query
        }
    }).then(res => {
        if (typeof res.data.collection === "undefined" || !res.data.collection) {
            let empty= {
                collection: [], collection_mobile: []
            }
            disbatch(getDetailCollection(empty))
        }
        if (res.data.collection) {
            disbatch(getDetailCollection(res.data))
        }
       
        if(res.data.product){
            disbatch({
                type: GET_PRODUCT,
                payload: res.data
            })
        }
     
       
    }).catch(err => {
        let notification = {
            error: true,
            message: "There is an error !",
            notification: true
        }
        disbatch(setNotification(notification));
    })
}

export const getProductDetail = (category,id,slug) => disbatch=>{
  
    disbatch(loadingProduct());
    axios.get(`/api/product/detail/${category}/${id}/${slug}`)
        .then(res=>{
            disbatch({
                type:GET_PRODUCT_DETAIL,
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

export const loadingProduct = () =>{
    return{
        type: LOADING_PRODUCT
    }
}

export const stopLoadingProduct = () =>{
    return{
        type:STOP_LOADING_PRODUCT
    }
}