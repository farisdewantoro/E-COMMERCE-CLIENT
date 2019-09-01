import db from '../../config/conn';
import { validationSubmitOrder,validationConfirmPayment} from './validation';
import async from 'async';
import jwt from 'jsonwebtoken';
import keys from '../../config/keys';
import axios from 'axios';
import snap from '../../config/midtrans';
import Email from '../../Email';
import moment from 'moment';
function uuidv4() {
  
    return 'xxyx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return  v.toString(16).toUpperCase();
    });
}
function getLengthOrder() {
    let selectLengthOrder = `select count(id) as total from orders`;
    return new Promise((resolve,reject)=>{
        db.query(selectLengthOrder, (err, result) => {
            if (err) {
                reject('ERROR');
            }
            if (result) {
                resolve(result[0].total);
            }
        })
    })


}

function getOrderById(query,id){

    return new Promise((resv,rej)=>{
        db.query(query,[id],(err,result)=>{
            if(err){
                rej(err)
            }
            if(result){
                resv(result);
            }
        })
    })
}

function insertOrderConfirm(data){
    const queryInsertOrderConfirm = `INSERT INTO order_confirm set ? `;
    return new Promise((resv,rej)=>{
        db.query(queryInsertOrderConfirm,[data],(err,result)=>{
            if (err) {
                rej(err)
            }
            if (result) {
                resv(result);
            }
        })
    })
}


export const confirmPayment = async (req,res)=>{
  
    try{
     
       const {errors,isValid} =  validationConfirmPayment(req.body);
       if(!isValid && errors){
         
           return res.status(400).json(errors);
       }
    const queryOrder = `SELECT 
    ord.id,
    ord.user_id,
    ors.status,
    ors.id as order_status_id
    ,ord.created_at 
    from orders as ord 
    left join order_status as ors on ord.order_status_id = ors.id
    where ord.user_id = ${req.user.id} && ord.id = ? `;
    const queryOrderItems = `SELECT 
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
    where ord.user_id = ${req.user.id} && ord.id = ?`;
    const queryOrderShipment = `SELECT 
    os.courier,
    os.description,
    os.service,
    os.cost,
    os.etd,
    ord.id as order_id 
    from order_shipment as os
    left join orders as ord on os.order_id = ord.id
    where ord.user_id = ${req.user.id} && ord.id = ? `;
    const queryOrderVoucher = `SELECT
    v.id as voucher_id,
    v.name as voucher_name,
    v.voucher_type_id as voucher_type,
    v.value,
    ov.order_id
    from order_voucher as ov
    left join vouchers as v on ov.voucher_id = v.id
    left join orders as ord on ov.order_id = ord.id
    where ord.user_id = ${req.user.id} && ord.id = ? 
    `;
    const queryOrderBill = `SELECT * from order_billing where order_id = ?`;
    const queryOrderPayment = `SELECT
    op.payment_type,
    op.order_id,
    op.status_code,
    op.transaction_id,
    op.transaction_status,
    op.transaction_time,
    op.pdf_url,
    op.bank,
    op.store,
    op.va_number,
    op.gross_amount,
    op.bill_key,
    op.biller_code,
    op.card_type,
    op.masked_card,
    op.payment_code,
    os.status as order_status_code,
    op.transaction_time + interval 1 day as expired_date
    from order_payment as op
    left join orders as ord on op.order_id = ord.id
    left join order_status as os on ord.order_status_id = os.id 
    where ord.user_id = ${req.user.id} && ord.id = ?
    `;

       const order_id = req.body.order_id.value;
       let order = await getOrderById(queryOrder,order_id);
       const order_billing = await getOrderById(queryOrderBill,order_id);
       const order_items = await getOrderById(queryOrderItems,order_id);
       const order_shipment = await getOrderById(queryOrderShipment,order_id);
       const order_voucher = await getOrderById(queryOrderVoucher,order_id);
       const order_payment = await getOrderById(queryOrderPayment, order_id);
      
       
       if (order.length === 0 ){
           let notification = {
               error: true,
               message: "ORDER ID NOT FOUND",
               notification: true
           }
           return res.status(400).json({ notification: notification });
       }
        order[0].created_at = moment(order[0].created_at).format('L');
        let token_order = {
            uniqueID:order_id
        }
        order[0].link = keys.origin.url+'/my-account/orders/detail/' +jwt.sign(token_order, keys.jwt.secretOrPrivateKey2, { expiresIn: keys.jwt.expiresIn });
        
       let data ={
           order_id:order_id,
           name:req.body.name,
           nominal_transfer:req.body.nominal_transfer,
           bank:req.body.bank,
           user_id:req.user.id
       }
       if(req.body.note) data.note = req.body.note;
        await insertOrderConfirm(data);
        let phone_number = req.user.phone_number;
        let name = req.user.fullname;
        if (name.length > 25) {
            name = name.slice(0, 20) + '..';
        }
        let message = `Halo,${name}\nOrder ${order_id} telah berganti status menjadi Confirm Payment. Terimakasih, HAMMERSTOUTDENIM`
        let urlSms = `http://45.32.107.195/sms/smsreguler.php?username=${keys.rajasms.username}&key=${keys.rajasms.key}&number=${phone_number}&message=${message}`;
           axios.post(urlSms);
        
        let users = [
            {
                email: req.user.email,
                subject: `[HAMMERSTOUTDENIM] CONFIRM PAYMENT - ${order_id}`
            },
        ];
        if (order.length > 0) users[0].order = order[0];
        if (order_billing.length > 0) users[0].order_billing = order_billing[0];
        if (order_shipment.length > 0) users[0].order_shipment = order_shipment[0];
        if (order_items.length > 0 && order_payment.length > 0) {
            const sub_total = order_items.map(oi => {
                return oi.price
            }).reduce((a, b) => {
                return a + b
            }, 0);

            order_payment[0].sub_total = sub_total;
            order_payment[0].expired_date = moment(order_payment[0].expired_date).format('LLL');
            users[0].order_payment = order_payment[0];
            users[0].order_items = order_items;
        }
        if (order_voucher.length > 0) users[0].order_voucher = order_voucher[0];
        let info = await Email.loadTemplate('order-confirm', users);
        if (info) {
            let sending = await Email.sendEmail({
                to: info[0].context.email,
                from: '"HAMMERSTOUTDENIM" <order@hammerstoutdenim.com>',
                subject: info[0].context.subject,
                html: info[0].email.html
            });
        }

        let notification = {
            error: true,
            message: "Your order has been confirm!",
            notification: true
        }
        return res.status(200).json({ notification: notification }); 
    //    db.query(queryInsertOrderConfirm,[data],(err,result)=>{
    //        if(err){
    //            let notification = {
    //                error: true,
    //                message: "There is an error !",
    //                notification: true
    //            }
    //            return res.status(400).json({ notification: notification }); 
    //        }
    //        if(result){
             
    //        }
    //    })
       


    }
    catch(err){
        let notification = {
            error: true,
            message: "There is an error !",
            notification: true
        }
        console.log(err)
        return res.status(400).json({ notification: notification });
    }

}
export const getOrderList = (req,res)=>{

    if(req.body.id !== req.user.id){
        let notification = {
            error: true,
            message: "There is an error !",
            notification: true
        }
        return res.status(400).json({ notification: notification});
    }


    const querySelectOrder = `
select ord.id from orders as ord 
left join order_payment as orp on ord.id = orp.order_id
left join user as u on ord.user_id = u.id
where ord.order_status_id = 3 and orp.payment_type = 'bank_transfer_manual' and u.id = ${req.user.id}`;
    db.query(querySelectOrder,(err,result)=>{
        if (err) {
            let notification = {
                error: true,
                message: "There is an error !",
                notification: true
            }
            return res.status(400).json({ notification: notification });
        }
        if (result) {
            return res.status(200).json(result);
        }
    })



}
export const getAllOrder = (req,res)=>{

    // let queryUpdateOrder=`
    // UPDATE orders set orders.order_status_id = 2 
    //     where orders.order_status_id = 1 and  now() > orders.created_at+interval 4 HOUR
    // `;

    let queryOrder = `SELECT 
    ord.id,
    ord.user_id,
    ors.status,
    ors.id as order_status_id
    ,ord.created_at 
    from orders as ord 
    left join order_status as ors on ord.order_status_id = ors.id
    where ord.user_id = ${req.user.id} 
    order by ord.created_at desc`;

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
    where ord.user_id = ${req.user.id}`;

    let queryOrderShipment = `SELECT 
    os.courier,
    os.description,
    os.service,
    os.cost,
    os.etd,
    ord.id as order_id 
    from order_shipment as os
    left join orders as ord on os.order_id = ord.id
    where ord.user_id = ${req.user.id} `;

    let queryOrderVoucher = `SELECT
    v.id as voucher_id,
    v.name as voucher_name,
    v.voucher_type_id as voucher_type,
    v.value,
    ov.order_id
    from order_voucher as ov
    left join vouchers as v on ov.voucher_id = v.id
    left join orders as ord on ov.order_id = ord.id
    where ord.user_id = ${req.user.id} `;

    let queryOrderPayment = `SELECT
    op.payment_type,
    op.order_id,
    op.status_code,
    op.transaction_id,
    op.transaction_status,
    op.transaction_time,
    op.pdf_url
    from order_payment as op
    left join orders as ord on op.order_id = ord.id 
    where ord.user_id = ${req.user.id} `;



    async.parallel({
        // updateOrder:function(callback){
        //     db.query(queryUpdateOrder,(err,result)=>{
        //         callback(err,"OK");
        //     })
        // },
        orders:function(callback){
            db.query(queryOrder,(err,result)=>{
                callback(err,result);
            })
        },
        order_item:function(callback){
            db.query(queryOrderItems,(err,result)=>{
                callback(err,result);
            })
        },
        order_shipment:function(callback){
            db.query(queryOrderShipment,(err,result)=>{
                callback(err,result);
            })
        },
        order_voucher:function(callback){
            db.query(queryOrderVoucher,(err,result)=>{
                callback(err,result);
            })
        },
        order_payment:function(callback){
            db.query(queryOrderPayment,(err,result)=>{
                callback(err,result);
            })
        }
    },function(err,result){
        if(err){
            let notification = {
                error: true,
                message: "There is an error !",
                notification: true
            }
            return res.status(400).json(err);
        }
        if(result){
            return res.status(200).json( result );
        }
    })
}

export const getCurrentOrder =(req,res)=>{
    if(req.params.token_order == null || req.params.token_order == '' || typeof req.params.token_order === "undefined"){
        let notification = {
            error: true,
            message: "There is an error !",
            notification: true
        }
        return res.status(400).json({notification:notification});
    }
    let order_id = jwt.verify(req.params.token_order,keys.jwt.secretOrPrivateKey2);
  
    let queryUpdateOrder=`
    UPDATE orders set orders.order_status_id = 2 
    where orders.order_status_id = 1 and  now() > orders.created_at+interval 4 HOUR
    and orders.id = '${order_id.uniqueID}';
    UPDATE orders
    join order_payment on orders.id = order_payment.order_id
    set orders.order_status_id = 2 
    where orders.order_status_id = 3  and now() > order_payment.transaction_time + interval 1 DAY
    and orders.id = '${order_id.uniqueID}';
    `;

    let queryOrder = `SELECT 
    ord.id,
    ord.user_id,
    ors.status,
    ors.id as order_status_id
    ,ord.created_at 
    from orders as ord 
    left join order_status as ors on ord.order_status_id = ors.id
    where ord.user_id = ${req.user.id} && ord.id = '${order_id.uniqueID}' `;

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
    where ord.user_id = ${req.user.id} && ord.id = '${order_id.uniqueID}'`;

    let queryOrderShipment = `SELECT 
    os.courier,
    os.description,
    os.service,
    os.cost,
    os.etd,
    ord.id as order_id 
    from order_shipment as os
    left join orders as ord on os.order_id = ord.id
    where ord.user_id = ${req.user.id} && ord.id = '${order_id.uniqueID}' `;

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
    `;

    let queryOrderBill = `SELECT * from order_billing where order_id = '${order_id.uniqueID}'`;
    let queryOrderResi = `SELECT * from order_resi where order_id = '${order_id.uniqueID}' limit 1`;
    let queryOrderPayment = `SELECT
    op.payment_type,
    op.order_id,
    op.status_code,
    op.transaction_id,
    op.transaction_status,
    op.transaction_time,
    op.pdf_url,
    op.bank,
    op.store,
    op.va_number,
    op.gross_amount,
    op.bill_key,
    op.biller_code,
    op.card_type,
    op.masked_card,
    op.payment_code,
    os.status as order_status_code
    from order_payment as op
    left join orders as ord on op.order_id = ord.id
    left join order_status as os on ord.order_status_id = os.id 
    where ord.user_id = ${req.user.id} && ord.id = '${order_id.uniqueID}'
    `;
    let queryOrderConfirm = `SELECT 
    orc.order_id,
    orc.note,
    orc.bank,
    orc.nominal_transfer,
    orc.name
    from order_confirm as orc
    left join orders as ord on orc.order_id = ord.id
    where ord.user_id = ${req.user.id} && ord.id = '${order_id.uniqueID}'`;

    let token = `Username:${keys.midtrans.serverKey}:`;

    let queryUpdateStatusOrder = `
    UPDATE orders set orders.order_status_id = (SELECT id from order_status where code = ? limit 1)
    where orders.id = '${order_id.uniqueID}' && orders.user_id = ${req.user.id};
    UPDATE order_payment set status_code = ? , transaction_status = ? 
    where  order_id = '${order_id.uniqueID}' and transaction_id = ?
    `;
    let queryUpdateOnlyStatus = `UPDATE orders set orders.order_status_id = (SELECT id from order_status where code = ? limit 1)
    where orders.id = ?`;

    let queryUpdatePaymentOrder = ` UPDATE order_payment set status_code = ? , transaction_status = ? 
    where  order_id = '${order_id.uniqueID}' and transaction_id = ?`;
    let queryOrderPaymentInsert = `INSERT into order_payment set ? `;
   
    // token =  Buffer.from(token).toString('base64');
  
    async.parallel({
        // UPDATE ORDER IF > 4 HOURS OR PENDING PAYMENT > 1 DAY
        updateOrder: function (callback) {
            db.query(queryUpdateOrder, (err, result) => {
                callback(err, "OK");
            })
        },
        order_status: function (callback) {
        //  FIND ORDER PAYMENT
            db.query(queryOrderPayment,(err,result)=>{
                if (err) {
                    callback(err, null);
                }
                if (result.length === 0 || 
                    (
                        result.length > 0 
                        &&
                        (typeof result[0].payment_status_code === "undefined" || result[0].payment_status_code === '' || result[0].payment_status_code === null)
                        &&
                        (typeof result[0].payment_type === "undefined" || result[0].payment_type === '' || result[0].payment_type === null)
                        &&
                        (typeof result[0].transaction_id === "undefined" || result[0].transaction_id === '' || result[0].transaction_id === null)
                        &&
                        (typeof result[0].transaction_status === "undefined" || result[0].transaction_status === '' || result[0].transaction_status === null)
                    )
                    ) {
                    
                        // UPDATE OR INSERT PAYMENT
                    snap.transaction.status(order_id.uniqueID)
                    .then(ress=>{
                  
                        if(ress.status_code !== '404'){  
                        let dataOrderPayment = {};
                        Object.keys(ress).forEach(rb => {
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
                                rb === "card_type"||
                                rb === "payment_code" ||
                                rb === "bill_key" ||
                                rb === "biller_code" 
                            ) {

                                dataOrderPayment[rb] = ress[rb];
                            }
                            if (rb === "payment_type" && ress[rb] === "cstore") {
                                dataOrderPayment["store"] = "indomaret";
                            }
                            if (rb === "payment_type" && ress[rb] === "mandiri_clickpay") {
                                dataOrderPayment["bank"] = "mandiri";
                            }
                            if (rb === "payment_type" && ress[rb] === "danamon_online") {
                                dataOrderPayment["bank"] = "danamon";
                            }
                            if (rb === "payment_type" && ress[rb] === "cimb_clicks") {
                                dataOrderPayment["bank"] = "cimb";
                            }
                            if (rb === "payment_type" && ress[rb] === "bri_epay") {
                                dataOrderPayment["bank"] = "bri";
                            }
                            if (rb === "payment_type" && req.body[rb] === "echannel") {
                                dataOrderPayment["bank"] = "mandiri";
                                if (rb === "bill_key" && rb === "biller_code") {
                                    dataOrderPayment[rb] = req.body[rb];
                                }
                            }
                            if (rb === "permata_va_number") {
                                dataOrderPayment["bank"] = "permata";
                                dataOrderPayment["va_number"] = ress[rb];
                            }
                            
                            if (rb === "va_numbers") {
                                dataOrderPayment["bank"] = ress[rb][0].bank;
                                dataOrderPayment["va_number"] = ress[rb][0].va_number;
                            }
                            if (rb === "gross_amount") {
                                dataOrderPayment[rb] = parseInt(ress[rb]);
                            }
                  
                        });
                        if (Object.keys(dataOrderPayment.length > 0)) {
                         
                            db.query(queryOrderPaymentInsert, [dataOrderPayment], (err, result) => {
                                if (err) {
                                    callback(err,null);
                                }
                                if (result) {
                                    if ( ress.status_code.match(/^[4]/g) || ress.status_code.match(/^[5]/g) ){
                                        db.query(queryUpdateOnlyStatus,['202',dataOrderPayment.order_id],(err,result)=>{
                                            callback(err, 'ok');
                                        })
                                    }else{
                                        callback(null, 'ok');
                                    }
                                 
                                }
                            });
                        
                        } else {
                            callback(null,null);
                        }
                        }else{
                            callback(null,null);
                        }
                    }).catch(error=>{
                
                        if (error.ApiResponse) {
                            if (error.ApiResponse.status_code === '404'){
                                callback(null, null);
                            }else{
                                callback(error, null);
                            }
                          
                        }
                    })
                }

                if(result.length > 0){
                    // UPDATE PAYMENT
                    snap.transaction.status(order_id.uniqueID).then(ress => {
                       
                    //  UPDATE STATUS AND ORDER PAYMENT IF NOT CANCEL
                        if (ress.status_code !== result[0].status_code 
                            && ress.transaction_status !== "cancel"
                            && (!ress.status_code.match(/^[4]/g) || !ress.status_code.match(/^[5]/g))
                            && (ress.status_code.match(/^[2]/g) && ress.status_code !== '202')
                            && result[0].order_status_code !== "ok"){
                            db.query(queryUpdateStatusOrder, [
                                ress.status_code,
                                ress.status_code,
                                ress.transaction_status,
                                ress.transaction_id],(err,result)=>{
                                callback(err,'ok');
                            })
                        }

                        // CANCELED BY MIDTRANS
                        if (ress.status_code !== result[0].status_code 
                            && result[0].order_status_code !== "ok" 
                            && (ress.transaction_status == "cancel" || ress.status_code === '202' || ress.status_code.match(/^[4]/g) || ress.status_code.match(/^[5]/g))
                            ){
                            db.query(queryUpdateStatusOrder, [
                                "202", 
                                ress.status_code, 
                                ress.transaction_status,
                                ress.transaction_id], (err, result) => {
                                callback(err, 'ok');
                            })
                        }
                 
               
                         //EDIT BY ADMIN AND UPDATE STATUS PAYMENT AND ORDER
                        if (ress.status_code !== result[0].status_code        
                            && (!ress.status_code.match(/^[4]/g) || !ress.status_code.match(/^[5]/g))
                            && (ress.status_code.match(/^[2]/g) && ress.status_code !== '202' && ress.transaction_status !== "cancel")
                            && result[0].order_status_code === "ok") {
                            db.query(queryUpdatePaymentOrder, [
                                ress.status_code,
                                ress.status_code,
                                ress.transaction_status,
                                ress.transaction_id], (err, result) => {
                                    callback(err, 'ok');
                                })
                        }
                        // EDIT BY ADMIN AND UPDATE STATUS PAYMENT AND ORDER = CANCEL 
                        if (ress.status_code !== result[0].status_code
                            && result[0].order_status_code === "ok"
                            && (ress.transaction_status === "cancel" || ress.status_code === '202' || ress.status_code.match(/^[4]/g) || ress.status_code.match(/^[5]/g))
                        ) {
                            db.query(queryUpdatePaymentOrder, [
                                "202",
                                ress.status_code,
                                ress.transaction_status,
                                ress.transaction_id], (err, result) => {
                                    callback(err, 'ok');
                                })
                        }
                        if (ress.status_code == result[0].status_code){
                            callback(null, null);
                        }
                     
                          
                    }).catch(error => {
                        if (error.ApiResponse) {
                            if (error.ApiResponse.status_code === '404') {
                                callback(null, null);
                            } else {
                                callback(error, null);
                            }

                        }
                       
                    });
                }
             
            })
       
        },
   
        order_item: function (callback) {
            db.query(queryOrderItems, (err, result) => {
                callback(err, result);
            })
        },
        orders: function (callback) {
            db.query(queryOrder, (err, result) => {
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
        order_billing:function(callback){
            db.query(queryOrderBill,(err,result)=>{
                callback(err,result);
            })
        },
        order_payment:function(callback){
            db.query(queryOrderPayment,(err,result)=>{
                callback(err,result);
            })
        },
        order_resi:function(callback){
            db.query(queryOrderResi,(err,result)=>{
                callback(err,result);
            })
        },
        order_confirm:function(callback){
            db.query(queryOrderConfirm,(err,result)=>{
                callback(err,result);
            })
        }
  
    },function(err,result){
        if(err){
       
            let notification = {
                error: true,
                message: "There is an error !",
                notification: true
            }
            console.log(err);
            return res.status(400).json(notification);
        }
  
            if (result && result.order_status !== 'ok'){
            return res.status(200).json({ data: result });
        }
            if (result.order_status === 'ok') {
                return res.status(200).json({ data: result, redirect: true });
            }
    })
}


export const getCurrentOrderPayment = (req, res) => {
    if (req.params.token_order == null || req.params.token_order == '' || typeof req.params.token_order === "undefined") {
        let notification = {
            error: true,
            message: "There is an error !",
            notification: true
        }
        return res.status(400).json({ notification: notification });
    }
    let order_id = jwt.verify(req.params.token_order, keys.jwt.secretOrPrivateKey2);
    let queryUpdateOrder = `
    UPDATE orders set orders.order_status_id = 2 
    where orders.order_status_id = 1 and  now() > orders.created_at+interval 4 HOUR
    and orders.id = '${order_id.uniqueID}';
    UPDATE orders
    join order_payment on orders.id = order_payment.order_id
    set orders.order_status_id = 2 
    where orders.order_status_id = 3  and now() > order_payment.transaction_time + interval 1 DAY
    and orders.id = '${order_id.uniqueID}';
    `;

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
        updateOrder: function (callback) {
            db.query(queryUpdateOrder, (err, result) => {
                callback(err, "OK");
            })
        },
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
        }
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
            if(result.orders.length === 0 || result.order_item.length === 0 || result.order_shipment.length === 0  ){
                let notification = {
                    error: true,
                    message: "There is an error !",
                    notification: true
                }
                return res.status(400).json({ notification: notification });
            }else{
                return res.status(200).json({ data: result });
            }
           
        }
    })
}

function getOrderStockById(carts){
    let queryCheck =`
    select pa.stock from products as p
    left join product_attribute as pa on p.id = pa.product_id
    left join product_variant as pv on p.id = pv.product_id
    where pv.id in ? and pa.id in ? and  p.id in ? `;

    const product_variant = carts.map(c=>{
        return c.product_variant_id
    });
    const product_attribute = carts.map(c => {
        return c.product_attribute_id
    });
    const product_id = carts.map(c => {
        return c.product_id
    });

    return new Promise((res,rej)=>{
        db.query(queryCheck, [[product_variant], [product_attribute], [product_id]],(err,result)=>{
    
            if (err) return res(true);
            if(result.length > 0){
                let status = result.filter(r=>r.stock <= 0 );
            
                if(status.length > 0){
                    return res(true);
                }else{
                    res(false);
                }

            };
            if(result.length === 0) return res(true);
        })
    });
}

export const orderSubmit = async (req,res)=>{
       try{
           
        const { errors, isValid } = validationSubmitOrder(req.body);
   
        if (!isValid) {
            let notification = {
                error: true,
                message: "There is an error !",
                notification: true
            }
            return res.status(400).json({ notification: notification,errors:errors });
        }

    const checkStockEmpty = await getOrderStockById(req.body.carts);
    if (checkStockEmpty){
        let notification = {
            error: true,
            message: "IS OUT OF STOCK !",
            notification: true
        }
        return res.status(400).json({ notification: notification, errors: errors,redirect:true });
    }
    const generateID = uuidv4();
    const date = new Date();
    const totalOrder = await getLengthOrder();
   
        // const uniqueID = `${generateID}${date.getHours()}${date.getMinutes()}${date.getSeconds()}`;
    const uniqueID = totalOrder+'O'+generateID;
        let queryInsertOrder = `INSERT INTO orders set ? `;
    let dataOrderItem = [];
    let dataOrderBill ={
        order_id: uniqueID,
        address: req.body.user.address,
        district: req.body.user.district_id.label,
        email:req.body.user.email,
        fullname: req.body.user.fullname,
        phone_number:req.body.user.phone_number,
        postcode:req.body.user.postcode,
        province:req.body.user.province_id.label,
        regency: req.body.user.regency_id.label,
        village: req.body.user.village_id.label
    };

    let dataOrderShipment = {
        order_id:uniqueID,
        courier: req.body.shippingSelected.name,
        service:req.body.shippingSelected.service,
        description:req.body.shippingSelected.description,
        cost:req.body.shippingSelected.cost[0].value,
        etd:req.body.shippingSelected.cost[0].etd,
    }

    let dataVoucher={};
    if(typeof req.body.vouchers == "object" && Object.keys(req.body.vouchers).length > 0 ){
        dataVoucher.voucher_id = req.body.vouchers.id;
        dataVoucher.order_id = uniqueID;

    }

    req.body.carts.forEach(rb => {
        let data = [`'${uniqueID}'`,
            rb.product_id,
            rb.product_attribute_id,
            rb.product_variant_id,
            rb.quantity,
            `(select IF(pd.discount_value, ${rb.quantity} * pd.discount_value, ${rb.quantity} * p.regular_price) as price from products as p left join product_discount as pd on pd.id = (SELECT pd1.id from product_discount as pd1 where p.id = pd1.product_id and now() between pd1.valid_from and pd1.valid_until) where p.id = ${rb.product_id})`];
    dataOrderItem.push(
        [
            `(${data})`
        ])
});
    let queryInsertOrderItem = `INSERT INTO order_item (order_id,product_id,product_attribute_id,product_variant_id,quantity,price) values ${dataOrderItem.toString()} `;
    let queryInsertOrderBilling = `INSERT INTO order_billing set ?`;
    let queryInsertOrderShipment = `INSERT INTO order_shipment set ?`;
    let queryInsertOrderVoucher = `INSERT INTO order_voucher set ?`;
    let queryDeleteCart = `DELETE from carts where session_id = '${req.sessionID}'`;
    const queryCheckVoucher = `SELECT name,id,description,voucher_type_id,value from vouchers where 
    id = ? and max_uses > 0 and NOW() between valid_from and valid_until `;
    async.parallel({
        order_insert:function(callback){
            db.query(queryInsertOrder, [{ id: uniqueID, user_id: req.user.id }], (err, result) =>{
                callback(err,"OK");
            })
        },
        order_item_insert:function(callback){
            db.query(queryInsertOrderItem, (err, result) => {
                callback(err,"OK");
            })
        },
        carts_delete:function(callback){
            db.query(queryDeleteCart,(err,result)=>{
                callback(err,"OK");
            })
        },
        order_billing_insert:function(callback){
            db.query(queryInsertOrderBilling, [dataOrderBill],(err,result)=>{
                callback(err,"OK")
            })
        },
        order_shipment_insert:function(callback){
            db.query(queryInsertOrderShipment, [dataOrderShipment], (err, result) => {
                callback(err, "OK")
            })
        },
        order_voucher_insert:function(callback){
            if (typeof req.body.vouchers == "object" && Object.keys(req.body.vouchers).length > 0 ) {
                db.query(queryCheckVoucher, [dataVoucher.voucher_id],(err,result)=>{
                    if(err) return callback(err,null);
                    if(result.length > 0){
                        db.query(queryInsertOrderVoucher, [dataVoucher], (err, result) => {
                            callback(err, "OK");
                        })
                    }
                    if(result.length == 0){
                        callback(null,null);
                    }
                })
              
            }else{
                callback(null,null);
            }
        }

     
    },function(err,result){
            if (err) {
                let notification = {
                    error: true,
                    message: "ERROR FROM CHECKOUT",
                    notification: true
                }
                return res.status(400).json(notification);
            }
                if(result){
                let notification = {
                        error: false,
                        message: "PROCEED TO CHECKOUT",
                         notification: true
                        }
                    // res.clearCookie("hammerstout_ss");
                    let token_order = {
                        uniqueID
                    };
                    let token_o = jwt.sign(token_order, keys.jwt.secretOrPrivateKey2, { expiresIn: keys.jwt.expiresIn });

                    return res.status(200).json({ notification: notification, token_o });
                    }
                    
                
    })
   

       }catch(err){
           let notification = {
               error: true,
               message: "ERROR FROM CHECKOUT",
               notification: true
           }
           return res.status(400).json(notification);
       }

  
       
    
  
}