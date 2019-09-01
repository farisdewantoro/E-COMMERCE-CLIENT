import { GET_CONTENT_HOME, LOADING_UI} from './types';
import axios from 'axios';

export const getContentHome = ()=>disbatch=>{
    disbatch(loadingUI());
    axios.get('/api/content/home')
        .then(res=>{
            disbatch({
                type: GET_CONTENT_HOME,
                payload:res.data
            })
        })
        .catch(err=>{
            console.log(err.response.data);
        })
}

export const loadingUI = ()=>{
    return{
        type:LOADING_UI
    }
}