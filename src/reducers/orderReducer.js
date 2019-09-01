import { LOADING_ORDER, REMOVE_LOADING_ORDER, GET_ORDER_LIST, SET_CURRENT_ORDER, GET_ALL_ORDER, SET_CURRENT_ORDER_PAYMENT} 
    from '../app/actions/types';
const initialState = {
    loading:false,
    order:[],
    order_item:[],
    order_shipment:[],
    order_billing:[],
    order_voucher:[],
    order_payment:[]
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOADING_ORDER:
            return{
                ...state,
                loading:true
            };
        case GET_ORDER_LIST:
            return{
                ...state,
                loading:false,
                order:action.payload
            }
        case SET_CURRENT_ORDER:
            return{
                ...state,
                loading:false,
                order: action.payload.orders,
                order_item: action.payload.order_item,
                order_voucher: action.payload.order_voucher,
                order_shipment: action.payload.order_shipment,
                order_billing:action.payload.order_billing,
                order_payment: action.payload.order_payment,
                order_resi:action.payload.order_resi,
                order_confirm:action.payload.order_confirm
            };
        case SET_CURRENT_ORDER_PAYMENT:
            return{
                ...state,
                loading: false,
                order: action.payload.orders,
                order_item: action.payload.order_item,
                order_voucher: action.payload.order_voucher,
                order_shipment: action.payload.order_shipment,
                order_billing: action.payload.order_billing 
            };
        case REMOVE_LOADING_ORDER:
            return{
                ...state,
                loading:false
            }
        case GET_ALL_ORDER:
            return{
                ...state,
                loading:false,
                order:action.payload.orders,
                order_item:action.payload.order_item,
                order_voucher:action.payload.order_voucher,
                order_shipment:action.payload.order_shipment,
                order_payment: action.payload.order_payment
            }
    
        default:
            return state;
    }
}