import { GET_PRODUCT_HIGHLIGHT, LOADING_PRODUCT, GET_PRODUCT_WITH_QUERY, GET_PRODUCT, GET_PRODUCT_DETAIL} 
    from '../app/actions/types';
const initialState = {
    loading: false,
    product: [],
    productDetail:{},
    todayHighlight:[],
    pagination:[],
    banner_desktop:[],
    banner_mobile:[],
    banner_promo_desktop:[],
    banner_promo_mobile:[],
    status:null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case LOADING_PRODUCT:
            return {
                ...state,
                loading: true
            }
        case GET_PRODUCT_DETAIL:
            return{
                ...state,
                loading:false,
                productDetail:action.payload
            }
        case GET_PRODUCT:
            return{
                ...state,
                loading:false,
                product: action.payload.product,
                pagination:action.payload.pagination,
                banner_desktop: action.payload.banner_desktop,
                banner_mobile: action.payload.banner_mobile,
                banner_promo_desktop: action.payload.banner_promo_desktop,
                banner_promo_mobile: action.payload.banner_promo_mobile
            }
        case GET_PRODUCT_WITH_QUERY:
            return{
                ...state,
                loading:false,
                product:action.payload
            }
      
        case GET_PRODUCT_HIGHLIGHT:
            return{
                ...state,
                loading:false,
                todayHighlight:action.payload
            }
        default:
            return state;
    }
}