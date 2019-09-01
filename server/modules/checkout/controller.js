import db from '../../config/conn';
import async from 'async';
import snap from '../../config/midtrans';
import keys from '../../config/keys';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import moment from 'moment';
import uuidv1  from 'uuid/v1';
import Email from '../../Email';

export const insertPaymentOrderManual =  (req,res)=>{
 
    if (req.params.token_order == null
        || req.params.token_order == '' ||
        typeof req.params.token_order === "undefined" ||
        req.body.value === '' || 
        typeof req.body.value === "undefined" || 
        req.body.bank === '' ||
        typeof req.body.bank === "undefined" ||
        typeof req.user === "undefined") {
   
        let notification = {
            error: true,
            message: "There is an error !",
            notification: true
        }
        return res.status(400).json({ notification: notification });
    }
    let order_id = jwt.verify(req.params.token_order, keys.jwt.secretOrPrivateKey2);
    if (!order_id.uniqueID) {
        let notification = {
            error: true,
            message: "There is an error !",
            notification: true
        }
        return res.status(400).json({ notification: notification });
    }
    let queryOrderPayment = `INSERT into order_payment set ? `;
    let dataOrderPayment = {
        fraud_status:"accept",
        payment_type:req.body.value,
        bank:req.body.bank,
        bill_key:'',
        biller_code:'',
        status_code:'201',
        transaction_id: uuidv1(),
        gross_amount:0,
        order_id: order_id.uniqueID,
        transaction_status:"pending",
        transaction_time:new Date()
    };
    if(req.body.bank === "bca"){
        dataOrderPayment.bill_key = "0083352504";
        dataOrderPayment.biller_code = "CHAERUL ARI NUGARA";
    }
    if (req.body.bank === "bri"){
        dataOrderPayment.bill_key = "210401000139308";
        dataOrderPayment.biller_code = "CHAERUL ARI NUGARA";
    }


    const queryFindOrderPayment = `SELECT * from order_payment where order_id = '${order_id.uniqueID}'`;
    const queryUpdateOrderPayment = `UPDATE order_payment set ? where order_id='${order_id.uniqueID}'`;
    const querySelectOrder = `SELECT
        ord.id,
        ord.order_status_id,
        ord.created_at,
        ors.status,
        orb.fullname,
        orb.phone_number,
        orp.payment_type,
        orp.gross_amount,
        orp.bank,
        orp.bill_key,
        orp.biller_code,
        orp.va_number,
        orp.store,
        orp.payment_code
        from orders as ord
        left join order_billing as orb on ord.id = orb.order_id
        left join order_payment as orp on ord.id = orp.order_id
        left join order_status as ors on ord.order_status_id =  ors.id
        where ord.id ='${order_id.uniqueID}'
    `;
    let queryOrderItems = `SELECT 
    p.name as product_name,
    p.slug as product_slug,
    p.description,
    oi.price,
    oi.order_id,
    c.name as category_name,
    c.slug,
    ct.name as category_type,
    ct.slug as category_type_slug,
    p.id as product_id,
    pa.id as product_attribute_id,
    pv.id as product_variant_id,
    i.link,
    i.public_id,
    pa.size,
    oi.quantity 
    from order_item as oi 
    left join orders as ord on oi.order_id = ord.id
    left join products as p on oi.product_id = p.id
    left join product_category as pc on p.id = pc.product_id 
    left join categories as c on pc.category_id = c.id 
    left join product_attribute as pa on oi.product_attribute_id = pa.id
    left join product_variant as pv on oi.product_variant_id = pv.id
    left join category_type as ct on pv.category_type_id = ct.id
    left join product_image as pi on pi.id = (SELECT pi1.id from product_image as pi1 where pi1.product_id = p.id order by pi1.product_id asc limit 1)
    left join images as i on pi.image_id = i.id
    where ord.user_id = ${req.user.id} && ord.id = '${order_id.uniqueID}'
    && ord.order_status_id != 2 `;

    let queryOrderShipment = `SELECT 
    os.courier,
    os.description,
    os.service,
    os.cost,
    os.etd,
    ord.id as order_id 
    from order_shipment as os
    left join orders as ord on os.order_id = ord.id
    where ord.user_id = ${req.user.id} && ord.id = '${order_id.uniqueID}' 
    && ord.order_status_id != 2 `;

    let queryOrderVoucher = `SELECT
    v.id as voucher_id,
    v.name as voucher_name,
    v.voucher_type_id as voucher_type,
    v.value,
    ov.order_id
    from order_voucher as ov
    left join vouchers as v on ov.voucher_id = v.id
    left join orders as ord on ov.order_id = ord.id
    where ord.user_id = ${req.user.id} && ord.id = '${order_id.uniqueID}'
    && ord.order_status_id != 2 
    `;
    let queryOrderBill = `SELECT 
    ob.order_id,
    ob.fullname,
    ob.email,
    ob.phone_number,
    ob.province,
    ob.regency,
    ob.district,
    ob.village,
    ob.postcode,
    ob.address
     from order_billing as ob 
     left join orders as ord on ob.order_id = ord.id 
     where ob.order_id = '${order_id.uniqueID}' && ord.order_status_id != 2
     `;
    let queryOrderPaymentSelect = `select * 
    from order_payment as orp where orp.order_id = '${order_id.uniqueID}'`;
    async.parallel({
        order_item: function (callback) {
            db.query(queryOrderItems, (err, result) => {
                callback(err, result);
            })
        },
        order_shipment: function (callback) {
            db.query(queryOrderShipment, (err, result) => {
                callback(err, result);
            })
        },
        order_voucher:function(callback){
            db.query(queryOrderVoucher,(err,result)=>{
                callback(err,result);
            })
        },
        order_billing:function(callback){
            db.query(queryOrderBill,(err,result)=>{
                callback(err, result);
            })
        },
        order_payment:function(callback){
            db.query(queryOrderPaymentSelect, (err, result) => {
                callback(err, result);
            })
        }
    },function(err,result){
       if (err) {
            let notification = {
                error: true,
                message: "There is an error !",
                notification: true
            }
            return res.status(400).json({ notification: notification });
        }
        if(result){
           let total = 0;
           let subTotal = 0;
           let shipmentFee = 0;
           subTotal = result.order_item.map(oi => oi.price).reduce((a, b) => {
               return a + b
           }, 0);
           shipmentFee = result.order_shipment.map(os => os.cost);
           total = parseInt(subTotal) + parseInt(shipmentFee);
           if (result.order_voucher instanceof Array && result.order_voucher.length > 0 && typeof result.order_voucher !== "undefined") {
               if (result.order_voucher[0].voucher_type == 1) {
                   let discount = total * (result.order_voucher[0].value / 100);
                   total = Math.max(1, total - discount);
               }
               if (result.order_voucher[0].voucher_type == 2) {
                   total = Math.max(1, total - result.order_voucher[0].value);
               }
           }
       
           let customer_details = {
               first_name: result.order_billing[0].fullname,
               email: result.order_billing[0].email,
               phone: result.order_billing[0].phone_number
           }
           if(total){
               dataOrderPayment.gross_amount = total;
           }
           
            let emailContext = [
                {
                    email: req.user.email
                },
            ];
            if (result.order_payment.length === 0 && Object.keys(dataOrderPayment.length > 0)) {
                db.query(queryOrderPayment, [dataOrderPayment], (err, result2) => {
                    if (err) {
                        let notification = {
                            error: true,
                            message: "There is an error !",
                            notification: true
                        }
                        return res.status(400).json(err);
                    }
                    if (result2) {
                        db.query(querySelectOrder, (err, res1) => {
                            if (err) {
                                let notification = {
                                    error: true,
                                    message: "There is an error !",
                                    notification: true
                                }
                                return res.status(400).json(err);
                            }
                            if (res1.length > 0) {
                                let message = '';
                                let name = res1[0].fullname;
                                const total = res1[0].gross_amount;
                                const order_id = res1[0].id;
                                const phone_number = res1[0].phone_number;
                                if (name.length > 25) {
                                    name = name.slice(0, 20) + '..';
                                }
                                    let bank = res1[0].bank;
                                    let no_rek = res1[0].bill_key;
                                    let an = res1[0].biller_code;
                                message = `Halo,${name} \nOrder ${order_id} sudah kami terima. Mohon untuk segera transfer sebesar IDR ${total} ke bank ${bank.toUpperCase()}  ${no_rek} A.n ${an}  \nkonfirmasi pembayaran ${keys.origin.confirmPay}`;
                                
                           
                                let urlSms = `http://45.32.107.195/sms/smsreguler.php?username=${keys.rajasms.username}&key=${keys.rajasms.key}&number=${phone_number}&message=${message}`;

                                axios.post(urlSms);
                                let token_order = {
                                    uniqueID: order_id
                                }
                                const order ={
                                    id:order_id,
                                    created_at:moment(res1[0].created_at).format('L'),
                                    link:keys.origin.url + '/my-account/orders/detail/' + jwt.sign(token_order, keys.jwt.secretOrPrivateKey2, { expiresIn: keys.jwt.expiresIn })
                                    
                                }
                                let dateNow = new Date();
                                dataOrderPayment.expired_date = moment(dateNow.setDate(dateNow.getDate() + 1)).format('LLL');
                                dataOrderPayment.sub_total = subTotal;
                                emailContext[0].order = order;
                                emailContext[0].order_payment = dataOrderPayment;
                                if (result.order_billing.length > 0)emailContext[0].order_billing = result.order_billing[0];
                                if (result.order_shipment.length > 0) emailContext[0].order_shipment = result.order_shipment[0];
                                if (result.order_voucher.length > 0) emailContext[0].order_voucher = result.order_voucher[0];
                                if (result.order_item.length > 0) emailContext[0].order_items = result.order_item;
                          
                                
                               

                                emailContext[0].subject = `[HAMMERSTOUTDENIM] ORDER INFORMATION - ${order_id}`;



                                Email.loadTemplate('order-pending', emailContext).then(info=>{
                                     Email.sendEmail({
                                         to: info[0].context.email,
                                         from: '"HAMMERSTOUTDENIM" <order@hammerstoutdenim.com>',
                                         subject: info[0].context.subject,
                                         html: info[0].email.html
                                     }).catch(err=>{
                                         let notification = {
                                             error: true,
                                             message: "There is an error !",
                                             notification: true
                                         }
                                         return res.status(400).json(notification); 
                                     });
                                 }).catch(err1=>{
                                     let notification = {
                                         error: true,
                                         message: "There is an error !",
                                         notification: true
                                     }
                                     return res.status(400).json(notification);
                                 });

                                
                            }
                            if (res1 === 0) {
                                let notification = {
                                    error: true,
                                    message: "There is an error !",
                                    notification: true
                                }
                                return res.status(400).json(notification);
                            }
                        })


                        let notification = {
                            error: false,
                            message: "Payment has been processed !",
                            notification: true
                        }
                        let pdf_url;
                        if (typeof dataOrderPayment.pdf_url !== "undefined" && dataOrderPayment.pdf_url.length > 0) {
                            pdf_url = dataOrderPayment.pdf_url;
                        }
                        return res.status(200).json({ notification: notification, token: req.params.token_order, pdf_url: pdf_url });
                    }
                })
            }
            if (result.order_payment.length > 0 || Object.keys(dataOrderPayment).length == 0) {
                let notification = {
                    error: true,
                    message: "There is an error !",
                    notification: true
                }
                return res.status(400).json({ notification: notification });
            }
        }
        
    })
 


  

    
}
export const insertPaymentOrder = (req,res)=>{

    if (req.params.token_order == null 
        || req.params.token_order == '' || 
        typeof req.params.token_order === "undefined") {
        let notification = {
            error: true,
            message: "There is an error !",
            notification: true
        }
        return res.status(400).json({ notification: notification });
    }
    let order_id = jwt.verify(req.params.token_order, keys.jwt.secretOrPrivateKey2);
    if(order_id.uniqueID !== req.body.order_id){
        let notification = {
            error: true,
            message: "There is an error !",
            notification: true
        }
        return res.status(400).json({ notification: notification });
    }
    if (req.body.fraud_status == "deny"){
        let notification = {
            error: true,
            message: "There is an error !",
            notification: true
        }
        return res.status(400).json({ notification: notification });
    }
    // TODO::VALIDATION REQ.BODY
    let queryOrderPayment = `INSERT into order_payment set ? `;
    let dataOrderPayment = {};
    const queryFindOrderPayment = `SELECT * from order_payment where order_id = '${req.body.order_id}'`;
    const queryUpdateOrderPayment = `UPDATE order_payment set ? where order_id='${req.body.order_id}'`;
    const querySelectOrder = `SELECT
        ord.id,
        ord.order_status_id,
        ors.status,
        orb.fullname,
        orb.phone_number,
        orp.payment_type,
        orp.gross_amount,
        orp.bank,
        orp.va_number,
        orp.bill_key,
        orp.biller_code,
        orp.store,
        orp.payment_code
        from orders as ord
        left join order_billing as orb on ord.id = orb.order_id
        left join order_payment as orp on ord.id = orp.order_id
        left join order_status as ors on ord.order_status_id =  ors.id
        where ord.id ='${req.body.order_id}'
    `;

    Object.keys(req.body).forEach(rb => {
        if (
            rb === "fraud_status" ||
            rb === "payment_type" ||
            rb === "status_code" ||
            rb === "transaction_id" ||
            rb === "transaction_status" ||
            rb === "transaction_time" ||
            rb === "pdf_url" ||
            rb === "order_id" ||
            rb === "masked_card" || 
            rb === "bank" || 
            rb === "card_type" || 
            rb === "payment_code" ||
            rb === "bill_key" || 
            rb === "biller_code" 
            ) {

            dataOrderPayment[rb] = req.body[rb];
        }
        if (rb === "payment_type" && req.body[rb] === "cstore") {
            dataOrderPayment["store"] = "indomaret";
        }
        if (rb === "payment_type" && req.body[rb] === "mandiri_clickpay"){
            dataOrderPayment["bank"] = "mandiri";
        }
        if (rb === "payment_type" && req.body[rb] === "danamon_online") {
            dataOrderPayment["bank"] = "danamon";
        }
        if (rb === "payment_type" && req.body[rb] === "cimb_clicks") {
            dataOrderPayment["bank"] = "cimb";
        }
        if (rb === "payment_type" && req.body[rb] === "cimb_clicks") {
            dataOrderPayment["bank"] = "cimb";
        }
        if (rb === "payment_type" && req.body[rb] === "echannel") {
            dataOrderPayment["bank"] = "mandiri";
            if (rb === "bill_key" && rb === "biller_code"){
                dataOrderPayment[rb] = req.body[rb]; 
            }
        }
     

        if (rb === "permata_va_number") {
            dataOrderPayment["bank"] = "permata";
            dataOrderPayment["va_number"] = req.body[rb];
        }
        if (rb === "va_numbers") {
            dataOrderPayment["bank"] = req.body[rb][0].bank;
            dataOrderPayment["va_number"] = req.body[rb][0].va_number;
        }
        if (rb === "gross_amount") {
            dataOrderPayment[rb] = parseInt(req.body[rb]);
        }
    });
    db.query(queryFindOrderPayment,(err,result)=>{
        if(err){
            let notification = {
                error: true,
                message: "There is an error !",
                notification: true
            }
            return res.status(400).json({ notification: notification });
        }
        if(result.length > 0){
        
          
            if (Object.keys(dataOrderPayment.length > 0)) {
                db.query(queryUpdateOrderPayment, [dataOrderPayment], (err, result) => {
                    if (err) {
                        let notification = {
                            error: true,
                            message: "There is an error !",
                            notification: true
                        }
                        return res.status(400).json(err);
                    }
                    if (result) {
                        db.query(querySelectOrder, (err, res1) => {
                            if (err) {
                                let notification = {
                                    error: true,
                                    message: "There is an error !",
                                    notification: true
                                }
                                return res.status(400).json(err);
                            }
                            if (res1.length > 0) {
                                let message = '';
                                let name = res1[0].fullname;
                                const total = res1[0].gross_amount;
                                const order_id = res1[0].id;
                                const phone_number = res1[0].phone_number;
                                if (name.length > 25) {
                                    name = name.slice(0,20) + '..';
                                }
                                if (res1[0].payment_type === "bank_transfer"){
                                    let bank = res1[0].bank;
                                    let va_number = res1[0].va_number;
                                    message = `Halo,${name} \nOrder ${order_id} sudah kami terima. Mohon untuk segera transfer sebesar IDR ${total} ke virtual account ${bank.toUpperCase()} : ${va_number}  sebelum 24 jam.`;
                                }
                                if (res1[0].payment_type === "echannel"){
                                    let bank = res1[0].bank;
                                    let va_number = res1[0].bill_key; 
                                    let bill_code = res1[0].biller_code;   
                                    message = `Halo,${name} \nOrder ${order_id} sudah kami terima. Mohon untuk segera transfer sebesar IDR ${total} ke virtual account ${bank.toUpperCase()} : ${va_number} ${bill_code ? `- Code ${bill_code}`: ''} sebelum 24 jam.`;
                                }
                                if(res1[0].payment_type === "cstore"){
                                    let store = res1[0].store;
                                    let code = res1[0].payment_code;
                                    message = `Halo,${name} \nOrder ${order_id} sudah kami terima. Mohon untuk segera transfer sebesar IDR ${total} melalui ${store.toUpperCase()} CODE : ${code} sebelum 24 jam.`;
                                }
                                if(res1[0].order_status_id === 4 ){
                              
                                    message = `Halo, ${name} \nPembayaran untuk ${order_id} sudah kami terima. Order anda sedang kami proses. Terimakasih. `;
                                }
                                
                                if(message.length > 0 ){
                                    let urlSms = `http://45.32.107.195/sms/smsreguler.php?username=${keys.rajasms.username}&key=${keys.rajasms.key}&number=${phone_number}&message=${message}`;
                                    axios.post(urlSms);
                                }
                    
                           
                            }
                            if (res1 === 0) {
                                let notification = {
                                    error: true,
                                    message: "There is an error !",
                                    notification: true
                                }
                                return res.status(400).json(err);
                            }
                        })

                        let notification = {
                            error: false,
                            message: "Your payment has been process !",
                            notification: true
                        }
                        let pdf_url;
                        if (typeof dataOrderPayment.pdf_url !== "undefined" && dataOrderPayment.pdf_url.length > 0) {
                            pdf_url = dataOrderPayment.pdf_url;
                        }
                        return res.status(200).json({ notification: notification, token: req.params.token_order, pdf_url: pdf_url });
                    }
                })
            }
            if (Object.keys(dataOrderPayment).length == 0) {
                let notification = {
                    error: true,
                    message: "There is an error !",
                    notification: true
                }
                return res.status(400).json({ notification: notification });
            }
        }
        if(result.length === 0){
          

            if (Object.keys(dataOrderPayment.length > 0)) {
                db.query(queryOrderPayment, [dataOrderPayment], (err, result) => {
                    if (err) {
                        let notification = {
                            error: true,
                            message: "There is an error !",
                            notification: true
                        }
                        return res.status(400).json(err);
                    }
                    if (result) {
                        db.query(querySelectOrder,(err,res1)=>{
                            if(err){
                                let notification = {
                                    error: true,
                                    message: "There is an error !",
                                    notification: true
                                }
                                return res.status(400).json(err);
                            }
                            if (res1.length > 0){
                                let message = '';
                                let name = res1[0].fullname;
                                const total = res1[0].gross_amount;
                                const order_id = res1[0].id;
                                const phone_number = res1[0].phone_number;
                                if(name.length > 25 ){
                                    name = name.slice(0,20)+'..';
                                }
                          
                        if (res1[0].payment_type === "bank_transfer"){
                            let bank = res1[0].bank;
                            let va_number = res1[0].va_number;
                            message = `Halo,${name} \nOrder ${order_id} sudah kami terima. Mohon untuk segera transfer sebesar IDR ${total} ke virtual account ${bank.toUpperCase()} : ${va_number}  sebelum 24 jam.`;
                        }
                        if (res1[0].payment_type === "echannel"){
                                    let bank = res1[0].bank;
                                    let va_number = res1[0].bill_key;    
                                    message = `Halo,${name} \nOrder ${order_id} sudah kami terima. Mohon untuk segera transfer sebesar IDR ${total} ke virtual account ${bank.toUpperCase()} : ${va_number}  sebelum 24 jam.`;
                        }
                        if (res1[0].payment_type === "cstore") {
                            let store = res1[0].store;
                            let code = res1[0].payment_code;
                            message = `Halo,${name} \nOrder ${order_id} sudah kami terima. Mohon untuk segera transfer sebesar IDR ${total} melalui ${store.toUpperCase()} CODE : ${code} sebelum 24 jam.`;
                        }
                        if (res1[0].order_status_id === 4) {
                           
                     
                            message = `Halo, ${name} \nPembayaran untuk ${order_id} sudah kami terima. Order anda sedang kami proses. Terimakasih. `;
                        }
                        if(message.length > 0 ){
                            let urlSms = `http://45.32.107.195/sms/smsreguler.php?username=${keys.rajasms.username}&key=${keys.rajasms.key}&number=${phone_number}&message=${message}`;

                            axios.post(urlSms);
                        }
                
                            }
                            if (res1 === 0){
                                let notification = {
                                    error: true,
                                    message: "There is an error !",
                                    notification: true
                                }
                                return res.status(400).json(err);
                            }
                        })
              

                        let notification = {
                            error: false,
                            message: "Payment has been processed !",
                            notification: true
                        }
                        let pdf_url;
                        if (typeof dataOrderPayment.pdf_url !== "undefined" && dataOrderPayment.pdf_url.length > 0) {
                            pdf_url = dataOrderPayment.pdf_url;
                        }
                        return res.status(200).json({ notification: notification, token: req.params.token_order, pdf_url: pdf_url });
                    }
                })
            }
            if (Object.keys(dataOrderPayment).length == 0) {
                let notification = {
                    error: true,
                    message: "There is an error !",
                    notification: true
                }
                return res.status(400).json({ notification: notification });
            }
        }
    })


    

    

}

export const submitPayment =(req,res)=>{
    // TODO :: VALIDATION REQ.BODY
    if (req.params.token_order == null || req.params.token_order == '' || typeof req.params.token_order === "undefined") {
        let notification = {
            error: true,
            message: "There is an error !",
            notification: true
        }
        return res.status(400).json({ notification: notification });
    }
    let order_id = jwt.verify(req.params.token_order, keys.jwt.secretOrPrivateKey2);


    let queryOrder = `SELECT 
    ord.id,
    ord.user_id,
    ors.status,
    ors.id as order_status_id
    ,ord.created_at 
    from orders as ord 
    left join order_status as ors on ord.order_status_id = ors.id
    where ord.user_id = ${req.user.id} && ord.id = '${order_id.uniqueID}' 
    && ord.order_status_id != 2 `;

    let queryOrderItems = `SELECT 
    p.name as product_name,
    p.slug as product_slug,
    p.description,
    oi.price,
    oi.order_id,
    c.name as category_name,
    c.slug,
    ct.name as category_type,
    ct.slug as category_type_slug,
    p.id as product_id,
    pa.id as product_attribute_id,
    pv.id as product_variant_id,
    i.link,
    i.public_id,
    pa.size,
    oi.quantity 
    from order_item as oi 
    left join orders as ord on oi.order_id = ord.id
    left join products as p on oi.product_id = p.id
    left join product_category as pc on p.id = pc.product_id 
    left join categories as c on pc.category_id = c.id 
    left join product_attribute as pa on oi.product_attribute_id = pa.id
    left join product_variant as pv on oi.product_variant_id = pv.id
    left join category_type as ct on pv.category_type_id = ct.id
    left join product_image as pi on pi.id = (SELECT pi1.id from product_image as pi1 where pi1.product_id = p.id order by pi1.product_id asc limit 1)
    left join images as i on pi.image_id = i.id
    where ord.user_id = ${req.user.id} && ord.id = '${order_id.uniqueID}'
    && ord.order_status_id != 2 `;

    let queryOrderShipment = `SELECT 
    os.courier,
    os.description,
    os.service,
    os.cost,
    os.etd,
    ord.id as order_id 
    from order_shipment as os
    left join orders as ord on os.order_id = ord.id
    where ord.user_id = ${req.user.id} && ord.id = '${order_id.uniqueID}' 
    && ord.order_status_id != 2 `;

    let queryOrderVoucher = `SELECT
    v.id as voucher_id,
    v.name as voucher_name,
    v.voucher_type_id as voucher_type,
    v.value,
    ov.order_id
    from order_voucher as ov
    left join vouchers as v on ov.voucher_id = v.id
    left join orders as ord on ov.order_id = ord.id
    where ord.user_id = ${req.user.id} && ord.id = '${order_id.uniqueID}'
    && ord.order_status_id != 2 
    `;

    let queryOrderBill = `SELECT 
    ob.order_id,
    ob.fullname,
    ob.email,
    ob.phone_number,
    ob.province,
    ob.regency,
    ob.district,
    ob.village,
    ob.postcode,
    ob.address
     from order_billing as ob 
     left join orders as ord on ob.order_id = ord.id 
     where ob.order_id = '${order_id.uniqueID}' && ord.order_status_id != 2
     `;



    async.parallel({
        orders: function (callback) {
            db.query(queryOrder, (err, result) => {
                callback(err, result);
            })
        },
        order_item: function (callback) {
            db.query(queryOrderItems, (err, result) => {
                callback(err, result);
            })
        },
        order_shipment: function (callback) {
            db.query(queryOrderShipment, (err, result) => {
                callback(err, result);
            })
        },
        order_voucher: function (callback) {
            db.query(queryOrderVoucher, (err, result) => {
                callback(err, result);
            })
        },
        order_billing: function (callback) {
            db.query(queryOrderBill, (err, result) => {
                callback(err, result);
            })
        },
      
    }, function (err, result) {
        if (err) {
            let notification = {
                error: true,
                message: "There is an error !",
                notification: true
            }
            return res.status(400).json(err);
        }
        if (result) {
        
            let total = 0;
            let subTotal = 0;
            let shipmentFee = 0;
            subTotal = result.order_item.map(oi=>oi.price).reduce((a,b)=>{
                return a + b
            },0);
            shipmentFee = result.order_shipment.map(os=>os.cost);
            total = parseInt(subTotal) + parseInt(shipmentFee);
            if (result.order_voucher instanceof Array && result.order_voucher.length > 0 && typeof result.order_voucher !== "undefined") {
            if (result.order_voucher[0].voucher_type == 1) {
                let discount = total * (result.order_voucher[0].value / 100);
                 total = Math.max(1, total - discount);
                }
            if (result.order_voucher[0].voucher_type == 2) {
               total = Math.max(1, total - result.order_voucher[0].value);
            }
            }
            let shipping_address= {}
            result.order_billing.forEach(os=>{
                shipping_address.firstname = os.fullname,
                shipping_address.email=os.email,
                shipping_address.phone=os.phone_number,
                shipping_address.address = os.address,
                shipping_address.city = os.regency,
                shipping_address.postal_code = os.postcode
            });
            let customer_details = {
                first_name: result.order_billing[0].fullname,
                email:result.order_billing[0].email,
                phone:result.order_billing[0].phone_number,
                shipping_address: shipping_address
            }
            let payment_method = [];
            if (req.body.payment_method && req.body.payment_method !== "bank_transfer") {
                payment_method.push(req.body.payment_method);
            };
            if (req.body.payment_method === "bank_transfer"){
                payment_method.push("permata_va");
                payment_method.push("bca_va");
                payment_method.push("bni_va");
            };
            

             let date = new Date();
            let parameter={
                "transaction_details": {
                    "order_id":result.orders[0].id,
                    "gross_amount": total,
                }, 
                "enabled_payments": payment_method,
                "customer_details": customer_details,
                "credit_card": {
                    "secure": true,
                    "save_card": true
                },
                "expiry": {
                    "start_time": moment(date).format('YYYY-MM-DD HH:mm:ss Z'),
                    "unit": "day",
                    "duration": 1
                },
            }
            if(req.body.payment_method == "gopay"){
                parameter.gopay = {
                 "enable_callback": true,
                 "callback_url": `${keys.origin.url}/my-account/orders/detail/${req.params.token_order}`
                }
        
            }

       

            // let parameter = {
            //     "transaction_details": {
            //         "order_id": "test-transaction-52562141",
            //         "gross_amount": 200000
            //     },
            //     // "credit_card": {
            //     //     "secure": true
            //     // },
            //     "enabled_payments": [req.body.payment_method],
            //     // "gopay": {
            //     //     "enable_callback": true,
            //     //     "callback_url": "http://gopay.com"
            //     // }
            // };
            snap.createTransaction(parameter)
                .then((transaction) => {
                 
                    // transaction token
                    let transactionToken = transaction.token;
                    return res.status(200).json(transactionToken)
                    // transaction redirect url
                    let transactionRedirectUrl = transaction.redirect_url;
                    // console.log('transactionRedirectUrl:', transactionRedirectUrl);
                })
                .catch((e) => {
                    let notification = {
                        error: true,
                        message: "There is an error !",
                        notification: true
                    }
                 
                
                    return res.status(400).json({notification:notification});
                });
        }
    })
    
    

    
}