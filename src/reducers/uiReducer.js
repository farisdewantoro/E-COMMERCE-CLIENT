import { GET_CONTENT_HOME, LOADING_UI } from '../app/actions/types';
const initialState = {
    slider:[],
    category:[],
    category_tag:[],
    category_type:[],
    collection:[],
    product_color:[],
    slider_mobile:[],
    newarrivals:[],
    product_recommendation:[]
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOADING_UI:
            return{
                ...state,
                loading:true
            }
        case GET_CONTENT_HOME:
            return{
                ...state,
                loading:false,
                slider:action.payload.slider,
                slider_mobile:action.payload.slider_mobile,
                category:action.payload.category,
                category_tag:action.payload.category_tag,
                category_type:action.payload.category_type,
                collection:action.payload.collection,
                product_color:action.payload.product_color,
                newarrivals:action.payload.newarrivals,
                product_recommendation: action.payload.product_recommendation,
            }
        default:
            return state;
    }
}