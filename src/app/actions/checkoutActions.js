import axios from 'axios';
import {GET_ERRORS} from './types';
import {loadingOrder,removeLoadingOrder} from './orderActions';
import {setNotification} from './notifActions';
import { clearCartList} from './cartActions';
import { clearCurrentVoucher} from './voucherActions';
import ReactPixel from 'react-facebook-pixel';
export const submitCheckoutManual = (data,token_order,history)=>disbatch=>{
    disbatch(loadingOrder());
    axios.post('/api/checkout/manual/submit/' + token_order, data)
        .then(res => {
            ReactPixel.trackCustom('AddPaymentInfo');
            if (res.data.notification) {
                disbatch(setNotification(res.data.notification));
            }
            if (res.data.token) {
                history.push('/my-account/orders/detail/' + res.data.token)
            }
            if (res.data.pdf_url) {
                window.open(res.data.pdf_url, '_blank');
            }
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
export const submitCheckout = (data,token_order,history)=>disbatch=>{
    window.snap.show();
    axios.post('/api/checkout/pay/'+token_order,data)
        .then(res=>{
           window.snap.pay(res.data, {
                onSuccess: function (result) { 
             
                   axios.post('/api/checkout/pay/submit/'+token_order,result)
                    .then(res=>{
                        ReactPixel.trackCustom('AddPaymentInfo');
                        if(res.data.notification){
                            disbatch(setNotification(res.data.notification));
                        }
                        if(res.data.token){
                            history.push('/my-account/orders/detail/'+res.data.token)
                        }
                        if (res.data.pdf_url) {
                            window.open(res.data.pdf_url, '_blank');
                        }
                    })
                    .catch(err=>{
                        let notification = {
                            error: true,
                            message: "There is an error !",
                            notification: true
                        }
                        disbatch(setNotification(notification));
                    })
                 },
               onPending: function (result) {
             
                   axios.post('/api/checkout/pay/submit/' + token_order, result)
                   .then(res => {
                       ReactPixel.trackCustom('AddPaymentInfo');
                       if (res.data.notification) {
                           disbatch(setNotification(res.data.notification));
                       }
                       if (res.data.token) {
                           history.push('/my-account/orders/detail/' + res.data.token)
                       }
                       if(res.data.pdf_url){
                           window.open(res.data.pdf_url,'_blank');
                       }
                   })
                   .catch(err => {
                       let notification = {
                           error: true,
                           message: "There is an error !",
                           notification: true
                       }
                       disbatch(setNotification(notification));
                   })},
                onError: function (result) { console.log('error'); console.log(result); },
                onClose: function () { console.log('customer closed the popup without finishing the payment'); }
            });
        })
        .catch(err=>{
          
            let notification = {
                error: true,
                message: "There is an error !",
                notification: true
            }
            history.push('/my-account/orders');
            window.snap.hide();
            disbatch(setNotification(notification));
        })
}



export const submitProceedToCheckout = (data,history)=>disbatch=>{
    disbatch(loadingOrder());
    axios.post('/api/order/submit',data)
        .then(res=>{
            history.push(`/checkout/${res.data.token_o}`);
            if(res.data.notification){
                disbatch(setNotification(res.data.notification));
            }
            
            disbatch(clearCartList());
            disbatch(clearCurrentVoucher());
            disbatch(removeLoadingOrder());
         
        })
        .catch(err=>{

            if (err.response.data){
                disbatch({
                    type: GET_ERRORS,
                    payload: err.response.data.errors
                });
                if (err.response.data.redirect && err.response.data.notification){
                    disbatch(setNotification(err.response.data.notification));
                    window.location.href="/carts";
                }else{
                    let notification = {
                        error: true,
                        message: "There is an error !",
                        notification: true
                    }
                    disbatch(setNotification(notification));
                }
            }else{
                let notification = {
                    error: true,
                    message: "There is an error !",
                    notification: true
                }
                disbatch(setNotification(notification));
            }
            
            
   
          
            disbatch(removeLoadingOrder());
        })
}

export const loadingCheckout = () =>{

}