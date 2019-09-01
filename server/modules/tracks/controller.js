import db from '../../config/conn';
import UAparser from 'ua-parser-js'
import async from 'async';
import jwt from 'jsonwebtoken';
import keys from '../../config/keys';
import qs from 'query-string';
import axios from 'axios';

function querySelectOrderStatusById(id){
    const query = `select ord.id,ors.status,ors.id as order_status_id,orr.kodeResi,orr.courier
    from orders as ord 
    left join order_status as ors on ord.order_status_id = ors.id 
    left join order_resi as orr on ord.id = orr.order_id
    where ord.id = ? limit 1 `;
    return new Promise((res,rej)=>{
        db.query(query,[id],(err,result)=>{
            if(err) return rej(err);
            if(result) return res(result);
        })
    })
}




export const trackShipment = async (req,res)=>{
        let errors = {};
        if(!req.body.id){
            errors.message = 'ORDER CODE IS REQUIRED';
            return res.status(400).json(errors)
        }
        try{
            const order_status = await querySelectOrderStatusById(req.body.id);
            if (order_status.length === 0){
                errors.message = 'ORDER CODE NOT FOUND';
                return res.status(400).json(errors);
            }
            if (order_status.length > 0 && order_status[0].order_status_id !== 5){
                errors.message = `YOUR ORDER STATUS IS ${order_status[0].status.toUpperCase()}. ONLY ORDER STATUS COMPLETED CAN ACCESS THIS `;
                return res.status(400).json(errors);
            }

            let data = {
                waybill: order_status[0].kodeResi,
                courier: order_status[0].courier
            };
           const info = await axios({
                method: "POST",
                url: "https://pro.rajaongkir.com/api/waybill",
                headers: {
                    "key": keys.rajaongkir.key,
                    "content-type": "application/x-www-form-urlencoded"
                },
                data: qs.stringify(data)
            });
            if(info){
                return res.status(200).json(info.data);
            }else{
                return res.status(400).json('ERROR!');
            }
            
            
            // .then(result => {
            //     return res.status(200).json(result.data);
            // }).catch(err => {
            //     if (err.response && err.response.data) {
            //         const errors = err.response.data;
            //         return res.status(400).json(errors);
            //     } else {
            //         return res.status(400).json('ERROR!');
            //     }

            // })
        }
        catch(err){
            if(err){
                errors.message = 'ORDER CODE NOT FOUND';
                return res.status(400).json(errors);
            }
        }
       
    
}


export const cartTrack = (req,res)=>{
    let queryFindCartList = `select 
    ci.id as cart_items_id,
    p.name as product_name,
    p.slug as product_slug,
    p.description,
    p.regular_price,
    c.name as category_name,
    c.slug,
    ct.name as category_type,
    ct.slug as category_type_slug,
    p.id as product_id,
    pa.id as product_attribute_id,
    pv.id as product_variant_id,
    pd.discount_percentage,
    pd.discount_value,
    i.link,
    i.public_id,
    pa.size,
    pa.stock,
    crt.active as cart_status,
    ci.quantity from products as p 
left join product_category as pc on p.id = pc.product_id 
left join categories as c on pc.category_id = c.id 
left join product_variant as pv on p.id = pv.product_id
left join category_type as ct on pv.category_type_id = ct.id
left join product_discount as pd on pd.id = 
(SELECT pd1.id from product_discount as pd1 where p.id = pd1.product_id and now() between pd1.valid_from and pd1.valid_until)
left join product_image as pi on pi.id = (SELECT pi1.id from product_image as pi1 where pi1.product_id = p.id order by pi1.product_id asc limit 1)
left join images as i on pi.image_id = i.id 
left join product_attribute as pa on p.id = pa.product_id and pv.id = pa.product_variant_id
left join cart_items as ci on pv.id = ci.product_variant_id and p.id = ci.product_id and pa.id = ci.product_attribute_id
left join carts as crt on ci.cart_id = (SELECT crt1.id from carts as crt1 where crt1.session_id = ?
) where crt.session_id = ? and ci.quantity <= pa.stock

`;
 
    if(req.sessionID && req.session.carts){
        let session_id = req.sessionID;
    
        db.query(queryFindCartList, [session_id, session_id], (error, result) => {
            if (result) {
                let token_cart = {
                    result
                }
                if(result.length === 0){
                    delete req.session.carts;
                }

                let token_c = jwt.sign(token_cart, keys.jwt.secretOrPrivateKey, { expiresIn: keys.jwt.expiresIn });
                return res.status(200).json({ cart_list: result, error: false, message: "OK", token_c });
            } 
            if (error) {
                return res.status(400).json(error);
            }

        })
    }
    // if (!req.session.carts && req.cookies.hammerstout_ss){
    //     let session_id = req.sessionID;
    //     let oldSession = jwt.verify(req.cookies.hammerstout_ss, keys.jwt.secretOrPrivateKey);
    //     let queryUpdated = `UPDATE carts set session_id ='${req.sessionID}' 
    // where  id = ${oldSession.cart_id} `;

    //     db.query(queryUpdated, (error, result) => {
    //         if (error) return res.status(400).json(error);
    //         if (result.affectedRows > 0) {
    //             const oldSession = jwt.verify(req.cookies.hammerstout_ss, keys.jwt.secretOrPrivateKey);
    //             const payload = {
    //                 cart_id: oldSession.cart_id
    //             }
    //             const dataToken = jwt.sign(payload, keys.jwt.secretOrPrivateKey, { expiresIn: keys.jwt.expiresIn });
                
    //             // res.cookie("hammerstout_ss", dataToken, { sameSite: true });
    //             req.session.carts = dataToken;



    //             db.query(queryFindCartList, [session_id, session_id], (error, result) => {

    //                 if (result) {
    //                     let token_cart = {
    //                         result
    //                     }
    //                     if (result.length === 0) {
    //                         delete req.session.carts;
    //                     }

    //                     let token_c = jwt.sign(token_cart, keys.jwt.secretOrPrivateKey, { expiresIn: keys.jwt.expiresIn });
    //                     return res.status(200).json({ cart_list: result, error: false, message: "OK", token_c });
    //                 }
    //                 if (error) {
    //                     return res.status(400).json(error);
    //                 }

    //             })
    //         } else {
    //             let result = [];
    //             let token_cart = {
    //                 result
    //             }
    //             let token_c = jwt.sign(token_cart, keys.jwt.secretOrPrivateKey, { expiresIn: keys.jwt.expiresIn });
    //             return res.status(200).json({ cart_list: [], error: false, message: "OK", token_c });
    //         }
    //     })
    
    
    // }
    if (req.sessionID && !req.session.carts ){
        let result = [];
        let token_cart = {
            result
        }

        let token_c = jwt.sign(token_cart, keys.jwt.secretOrPrivateKey, { expiresIn: keys.jwt.expiresIn });
        return res.status(200).json({ cart_list: result, error: false, message: "OK", token_c });
    }


  
 
}

// export const loginGoogleRedirect = (req, res) => {
//     return res.status(200).json(req.user);
// }

